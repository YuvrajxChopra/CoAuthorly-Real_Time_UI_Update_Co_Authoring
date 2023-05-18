import React from 'react';
import './login.css';
import logo from '../Homepage/img/logoCA.png';
import firebase from './firebase';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

function LogIn() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.username.value) {
      alert("Username is required!");
    }

    else if (!e.target.password.value) {
      alert("Password is required!");
    }
    const username = e.target.username.value;
    const password = e.target.password.value;

    const database = getDatabase(firebase);
    const usersRef = ref(database, '/users');
    get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const user = users.find((user) => user.username === username);

        if (user && user.password === password) {
          console.log('Credentials verified');
          navigate('/Dashboard', { state: { username } });
        } else {
          console.log('Invalid credentials');
        }
      } else {
        console.log('Users data not found');
      }
    })
    .catch((error) => {
      console.error('Error verifying credentials:', error);
    });
  };
  return (
    <div className='megalogin'>
      <div className='loginpage-container'>
        <div className='logincard'>
          <img src={logo} className="logo" alt="Logo" height={100} />
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="username" placeholder="Enter Username"/>
            </div>
            <div className="input-group">
              <input type="password" name="password" placeholder='Enter Password'/>
            </div>
            <button className="primary" type='submit'>Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn;