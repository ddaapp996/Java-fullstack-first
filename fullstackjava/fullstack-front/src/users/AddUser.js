import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddUser() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
  })

  const { name, username, email } = user;

  const onInputChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    await axios.post(`${process.env.REACT_APP_API}/users`, user);
    navigate('/');
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Register User</h2>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>Name:</label>
              <input value={name} onChange={(event) => onInputChange(event)} type={'text'} className='form-control' id='name' name='name' placeholder='Enter your name' />
            </div>

            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>Username:</label>
              <input value={username} onChange={(event) => onInputChange(event)} type={'text'} className='form-control' id='username' name='username' placeholder='Enter your username' />
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>E-mail:</label>
              <input value={email} onChange={(event) => onInputChange(event)} type={'text'} className='form-control' id='email' name='email' placeholder='Enter your email' />
            </div>

            <button onClick={() => navigate('/')} className='btn btn-outline-danger me-2'>Cancel</button>
            <button type='submit' className='btn btn-outline-primary'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
