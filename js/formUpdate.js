const form = document.querySelector('#my-form');
const id = document.querySelector('#id-studen').value;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.querySelector('#id-studen').value;
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const userName = document.querySelector('#user-name').value;
    const password = document.querySelector('#password').value;

    const data = {
        'firstname': firstName,
        'lastname': lastName,
        'username': userName,
        'password': password
    };

    const updateButton = document.querySelector('#update-button');
    if (updateButton === event.submitter) {
        fetch(`http://localhost:8899/apirest-v1.0/studens/${id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                alert('Estudiante actualizado correctamente');
                window.location.href = 'index.html';
            })
            .catch(error => console.error(error));
    }
});

const cancelButton = document.querySelector('#cancel-button');
cancelButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});
