import { useState } from 'react';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!email.includes('@')) {
      setEmailError('Invalid email format');
      return;
    }

    const passwordRequirements = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (password.length < 8 || !passwordRequirements.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include a number and a special character');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    console.log('Form submitted');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[300px]"> 
        <center><h1>Sign Up</h1></center>
        <form onSubmit={handleSubmit}>
          <div className="mb-6"> 
            <label htmlFor="userName" className="block mb-2">User Name</label>
            <input 
              type="text" 
              id="userName" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
            />
          </div>
          <div className="mb-6"> 
            <label htmlFor="email" className="block mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded bg-gray-800 text-white ${emailError ? 'border-red-500' : ''}`}
            />
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          </div>
          <div className="mb-6"> 
            <label htmlFor="password" className="block mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded bg-gray-800 text-white ${passwordError ? 'border-red-500' : ''}`}
            />
            {passwordError && <p className="text-red-500 mt-1">{passwordError}</p>}
          </div>
          <div className="mb-6"> 
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded bg-gray-800 text-white ${confirmPasswordError ? 'border-red-500' : ''}`}
            />
            {confirmPasswordError && <p className="text-red-500 mt-1">{confirmPasswordError}</p>}
          </div>
          <div className="mb-6"> 
            <label htmlFor="category" className="block mb-2">Category</label>
            <select 
              id="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
            >
              <option value=""></option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="farmer">Farmer</option>
              <option value="worker">Worker</option>
            </select>
          </div>
          <div>
            <center>
              <button
                type="submit"
                style={{
                  display: 'block',
                  width: '80px',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: '#34cc54',
                  color: '#000',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                SignUp
              </button>
            </center>
          </div>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Already have an account? <a href="/login" className="text-green-500">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
