import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API}/users`);
    console.log(result.data);
    setUsers(result.data);
  }

  const deleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API}/users/${id}`);
    loadUsers();
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/view-user/${user.id}`} className="btn btn-sm btn-primary mx-2">View</Link>
                      <Link to={`/edit-user/${user.id}`} className="btn btn-sm btn-outline-primary mx-2">Edit</Link>
                      <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
