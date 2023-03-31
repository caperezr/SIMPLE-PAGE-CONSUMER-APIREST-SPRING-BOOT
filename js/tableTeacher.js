$(document).ready(function () {
    fetch('http://localhost:8899/apirest-v1.0/teachers/all')
        .then(response => response.json())
        .then(data => {
            const table = $('#teachers-table').DataTable({
                data: data,
                columns: [
                    { "data": "id" },
                    { "data": "firstNameTeacher" },
                    { "data": "lastNameTeacher" },
                    { "data": "dniTeacher" },
                    { "data": "ageTeacher" },
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
            //Evento de click en boton de editar
            $('#teachers-table tbody').on('click', '.edit-btn', function () {
                const id = $(this).data('id');
                //Ejecuta la cción de editar aqui
                console.log(`Editar profesores con Id ${id}`);
                fetch(`http://localhost:8899/apirest-v1.0/teachers/findbyid/${id}`)
                    .then(response => response.json)
                    .then(data => {
                        //Vamos a guardar los datos en el storage local
                        //Esto para pasar los datos al otro formulario
                        localStorage.setItem('teacherData', JSON.stringify(data));
                        //Redirigir al formulario de edición
                        window.location.href = 'editTeacher.html';
                    })
                    .catch(error => console.error(error))
            });
            //Evento de click en el botón eliminar
            $('#teachers-table tbody').on('click', '.delete-btn', function () {
                const id = $(this).data('id');
                console.log(`Eliminar estudiante con ID ${id}`);
                //Ejecutamos la acción de eliminar aqui
                //En primer lugar tenemos que esperar una confirmación para que el usuario elimine al profesor 
                //ya que se elminara de manera permanente en la base de datos 
                if (confirm('¿Estas seguro de que deseas elminar a este estudiante?')) {
                    //Enviamos la promesa
                    fetch(`http://localhost:8899/apirest-v1.0/teachers/delete/${id}`, {
                        //Le tenemos que indicar el método
                        method: 'DELETE'

                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data === true) {
                                alert('El estudiante ha sido eliminado exitosamente.');
                                table.row($(this).parents('tr')).remove().draw();
                                location.reload();
                            } else {
                                location.reload();
                                alert('El estudiante ya ha sido eliminado.');
                            }
                        })
                        .catch(error => console.error(error));
                }
            })
        })
        .catch(error => console.error(error));
})