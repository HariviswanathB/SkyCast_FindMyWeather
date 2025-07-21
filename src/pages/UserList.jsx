import { useState, useEffect } from 'react'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((err) => {
        console.error('Error fetching users:', err)
        setError('Failed to fetch users')
      })
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>User List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
