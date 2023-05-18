import React, { useEffect, useState } from 'react';
import './register.css';
import logo from '../Homepage/img/logoCA.png';
import firebase from './firebase';
import { getDatabase, ref, set, get } from 'firebase/database';
import { Link } from 'react-router-dom';

function Register() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebase);
    const usersRef = ref(database, '/users');
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersList = Object.values(usersData);
          setUsers(usersList);
        }
      })
      .catch((error) => {
        console.error('Error retrieving users data:', error.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const cpassword = e.target.cpassword.value;

    if (!username) {
      alert('Username is required!');
    } else if (!password) {
      alert('Password is required!');
    } else if (!cpassword) {
      alert('Please confirm password!');
    } else if (password !== cpassword) {
      alert('Passwords do not match!');
    } else {
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        alert('Username already exists. Please choose a different username.');
      } else {
        const newUser = {
          username: username,
          password: password,
        };
        const updatedUsers = [...users, newUser];

        const database = getDatabase(firebase);
        const usersRef = ref(database, '/users');
        set(usersRef, updatedUsers)
          .then(() => {
            alert('User registration successful!');
          })
          .catch((error) => {
            console.error('Error adding new user:', error);
          });
      }
    }
  };

  return (
    <div className="megaregister">
      <div className="registerpage-container">
        <div className="registercard">
          <Link to={"/"}><img src={logo} className="logo" alt="Logo" height={100} /></Link>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="username" placeholder="Enter Username" />
            </div>
            <div className="input-group">
              <input type="password" name="password" placeholder="Enter Password" />
            </div>
            <div className="input-group">
              <input type="password" name="cpassword" placeholder="Confirm Password" />
            </div>
            <button className="primary" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
