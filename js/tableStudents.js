$(document).ready(function () {
    fetch('http://localhost:8899/apirest-v1.0/students/all')
        .then(response => response.json())
        .then(data => {
            const table = $('#students-table').DataTable({
                data: data,
                columns: [
                    { "data": "id" },
                    { "data": "fname" },
                    { "data": "lname" },
                    { "data": "username" },
                    {
                        "render": function (data, type, full, meta) {
                            return `
                <button class="edit-btn" data-id="${full.id}">Edit</button>
                <button class="delete-btn" data-id="${full.id}">Delete</button>
              `;
                        }
                    }
                ]
            });

            // Evento de clic en botón de editar
            $('#students-table tbody').on('click', '.edit-btn', function () {
                const id = $(this).data('id');
                // Ejecuta acción de editar aquí
                console.log(`Editar estudiante con ID ${id}`);
                fetch(`http://localhost:8899/apirest-v1.0/students/byid/${id}`)
                    .then(response => response.json())
                    .then(data => {
                        // Guardar los datos del estudiante en el Local Storage
                        localStorage.setItem('studentData', JSON.stringify(data));

                        // Redirigir al formulario de edición
                        window.location.href = 'edit.html';
                    })
                    .catch(error => console.error(error));

            });

            // Evento de clic en botón de eliminar
            $('#students-table tbody').on('click', '.delete-btn', function () {
                const id = $(this).data('id');
                // Ejecuta acción de eliminar aquí
                console.log(`Eliminar estudiante con ID ${id}`);

                // Preguntar al usuario si está seguro de que desea eliminar al estudiante
                if (confirm('¿Estás seguro de que deseas eliminar a este estudiante?')) {
                    // Envía la solicitud DELETE al servidor con el ID del estudiante a eliminar
                    fetch(`http://localhost:8899/apirest-v1.0/students/${id}/delete`, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data === true) {
                                alert('El estudiante ha sido eliminado exitosamente.');
                                table.row($(this).parents('tr')).remove().draw(); // Esto elimina la fila de la tabla
                                location.reload(); // Recarga la página para actualizar la lista de estudiantes
                            } else {
                                location.reload(); // Recarga la página antes de mostrar el alert de que el estudiante ya ha sido eliminado
                                alert('El estudiante ya ha sido eliminado.');
                            }
                        })
                        .catch(error => console.error(error));
                }
            });

        })
        .catch(error => console.error(error));
});







