const API_URL = '/clients';
let clients = [];
let editing = false;

 

async function getClients() {
    try {
        const res = await fetch(API_URL);
        clients = await res.json();

        const table = document.getElementById('clientTable');
        table.innerHTML = '';

        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.id_client}</td>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.address}</td>
                <td>${client.phone || ''}</td>
                <td>
                    <button onclick="editClient(${client.id_client})">Editar</button>
                    <button onclick="deleteClient(${client.id_client})">Eliminar</button>
                </td>
            `;
            table.appendChild(row);
        });
    } catch (err) {
        console.error('error getting user:', err);
    }
}


async function addClient(e) {
    e.preventDefault();

    const id_client = document.getElementById('id_client').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/${id_client}` : API_URL;

    const bodyData = editing
        ? { name, email, address, phone }
        : { id_client: Number(id_client), name, email, address, phone };

    try {
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        editing = false;
        document.getElementById('clientForm').reset();
        getClients();
    } catch (err) {
        console.error('error saving user:', err);
    }
}


async function editClient(id_client) {
    try {
        const res = await fetch(`${API_URL}/${id_client}`);
        const client = await res.json();

        document.getElementById('id_client').value = client.id_client;
        document.getElementById('name').value = client.name;
        document.getElementById('email').value = client.email;
        document.getElementById('address').value = client.address;
        document.getElementById('phone').value = client.phone || '';

        editing = true;
    } catch (err) {
        console.error('error loading user', err);
    }
}

async function deleteClient(id_client) {
    try {
        await fetch(`${API_URL}/${id_client}`, { method: 'DELETE' });
        getClients();
    } catch (err) {
        console.error('error deleting user:', err);
    }
}


document.getElementById('clientForm').addEventListener('submit', addClient);


getClients();
