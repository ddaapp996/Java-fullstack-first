import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '', 
  })

  const { id } = useParams();

  const {name, username, email} = user;

  const getUser = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API}/users/${id}`);
    setUser(result.data);
  }

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>User Detail</h2>

          {/* User details will be displayed here */}
          <div className="card text-dark bg-body-secondary shadow rounded">
            <div className="card-body">
              <h4 className="card-title">Detail of user with ID: { id }</h4>
              <p className="card-text text-start ms-5">Name: <span className='ms-5'>{ name }</span></p>
              <p className="card-text text-start ms-5">Username: <span className='ms-5'>{ username }</span></p>
              <p className="card-text text-start ms-5">E-mail: <span className='ms-5'>{ email }</span></p>
            </div>
          </div>

          <Link to={`/`} className='btn btn-outline-primary mt-4'>Back to home</Link>
        
        </div>
      </div>
    </div>
  )
}
