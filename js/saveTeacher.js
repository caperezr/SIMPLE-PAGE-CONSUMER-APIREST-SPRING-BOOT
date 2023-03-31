document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("save-button").addEventListener("click", function (event) {
        event.preventDefault();
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const dniTeacher = document.getElementById("dni-teacher").value;
        const ageTeacher = document.getElementById("age-teacher").value;
        const data = {
            "fname": firstName,
            "lname": lastName,
            "dni": dniTeacher,
            "age": ageTeacher
        }
        fetch("http://localhost:8899/apirest-v1.0/teachers/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    alert("Profesor guardado satisfactoriamente");
                    document.getElementById("my-form").reset();
                } else {
                    throw new Error("Ha ocurrido un error al guardar el profesor")
                }
            })
            .catch(error => {
                console.error(error);
                alert("Error al guardar el estudiante");
            })

    })
    document.getElementById("cancel-button").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("my-form").reset();
    })
})