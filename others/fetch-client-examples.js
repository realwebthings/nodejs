// GET request
const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  console.log('GET:', data);
};

// POST request
const createUser = async () => {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John' })
  });
  const data = await response.text();
  console.log('POST:', data);
};

// Run examples
getUsers();
createUser();