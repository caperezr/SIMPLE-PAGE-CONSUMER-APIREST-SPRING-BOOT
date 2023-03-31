document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("save-button").addEventListener("click", function (event) {
        event.preventDefault();
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const userName = document.getElementById("user-name").value;
        const password = document.getElementById("password").value;

        const data = {
            "firstname": firstName,
            "lastname": lastName,
            "username": userName,
            "password": password
        };

        fetch("http://localhost:8899/apirest-v1.0/students/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    alert("Estudiante guardado exitosamente");
                    document.getElementById("my-form").reset();
                } else {
                    throw new Error("Ha ocurrido un error al guardar el estudiante");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Error al guardar el estudiante");
            });
    });

    document.getElementById("cancel-button").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("my-form").reset();
    });
});
