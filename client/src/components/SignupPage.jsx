import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Save user role to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        role,
      });

      // Redirect based on role
      if (role === 'provider') {
        navigate('/register-provider');
      } else {
        navigate('/request-accommodation');
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <label>
          Email:
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password:
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="consumer">Consumer</option>
            <option value="provider">Provider</option>
          </select>
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
