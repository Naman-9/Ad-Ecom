import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [gender, setGender] = useState<string>('');
  const [date, setDate] = useState<string>('');

  return (
    <div className='login'>
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender:</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date Of Birth</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div>
            <p>Already Signed In Once?</p>
            <button>
                <FaGoogle />
                <span>Sign In With Google. </span>
            </button>
        </div>
      </main>
    </div>
  );
};

export default Login;