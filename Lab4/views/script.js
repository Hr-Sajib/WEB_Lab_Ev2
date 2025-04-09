document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(); // Load all users on page load
});

// Fetch users with optional search params
function fetchUsers(name = '', email = '') {
    const queryParams = new URLSearchParams();

    if (name) queryParams.append('name', name);
    if (email) queryParams.append('email', email);

    fetch('http://127.0.0.1:5100/api/users?' + queryParams.toString())
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(users => {
            const tableBody = document.getElementById('userTableBody');
            tableBody.innerHTML = ''; // Clear previous data

            if (users.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No data found in the database.</td></tr>';
                return;
            }

            users.forEach(user => {
                const row = document.createElement('tr');
                const escapedName = escapeHTML(user.name);
                const escapedEmail = escapeHTML(user.email);
                const escapedAddress = escapeHTML(user.address);

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${escapedName}</td>
                    <td>${user.age}</td>
                    <td>${escapedEmail}</td>
                    <td>${escapedAddress}</td>
                    <td>
                        <button onclick="showEditForm(${user.id}, '${escapedName}', ${user.age}, '${escapedEmail}', '${escapedAddress}')" class="edit-btn">Edit</button>
                        <a href="/delete/${user.id}" class="delete-btn" onclick="return confirm('Are you sure you want to delete this record?')">Delete</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            document.getElementById('userTableBody').innerHTML = '<tr><td colspan="6">Error loading data.</td></tr>';
        });
}

// Sanitize strings to prevent HTML injection
function escapeHTML(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Search handler
function searchUsers() {
    const name = document.getElementById('searchName').value.trim();
    const email = document.getElementById('searchEmail').value.trim();
    fetchUsers(name, email);
}

// Show Add Form
function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
}

// Hide Add Form
function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('addUserForm').reset();
}

// Show Edit Form
function showEditForm(id, name, age, email, address) {
    document.getElementById('editForm').style.display = 'block';
    document.getElementById('addForm').style.display = 'none';

    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editAge').value = age;
    document.getElementById('editEmail').value = email;
    document.getElementById('editAddress').value = address;

    document.getElementById('editUserForm').action = `/update/${id}`;
}

// Hide Edit Form
function hideEditForm() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('editUserForm').reset();
}

// Handle Add Form Submit
document.getElementById('addUserForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('addName').value.trim();
    const age = parseInt(document.getElementById('addAge').value);
    const email = document.getElementById('addEmail').value.trim();
    const address = document.getElementById('addAddress').value.trim();

    if (!name || isNaN(age) || !email.includes('@') || !address) {
        alert('Please fill all fields correctly.');
        return;
    }

    fetch(e.target.action, {
        method: e.target.method,
        body: new FormData(e.target)
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to add user');
            fetchUsers();
            hideAddForm();
            e.target.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding user.');
        });
});

// Handle Edit Form Submit
document.getElementById('editUserForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('editName').value.trim();
    const age = parseInt(document.getElementById('editAge').value);
    const email = document.getElementById('editEmail').value.trim();
    const address = document.getElementById('editAddress').value.trim();

    if (!name || isNaN(age) || !email.includes('@') || !address) {
        alert('Please fill all fields correctly.');
        return;
    }

    fetch(e.target.action, {
        method: e.target.method,
        body: new FormData(e.target)
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update user');
            fetchUsers();
            hideEditForm();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error updating user.');
        });
});
