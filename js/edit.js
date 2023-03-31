$(document).ready(function () {
    // Obtener los datos del estudiante del Local Storage
    const studentData = JSON.parse(localStorage.getItem('studentData'));

    // Asignar los valores del estudiante a los campos correspondientes del formulario
    $('#id-studen').val(studentData.id)
    $('#first-name').val(studentData.fname);
    $('#last-name').val(studentData.lname);
    $('#user-name').val(studentData.username);
});