import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    number:'123'
  });

  const handleChange = (e) => {
    setFields({...fields,[e.target.name]:e.target.value})
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(fields);

    try {
        const res = await fetch("http://localhost:4000/user/createuser", {
            method: "POST",
            mode: 'cors', // Set mode to 'cors'
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fields.name,
                email: fields.email,
                location: fields.location,
                password: fields.password,
                number: fields.number
            }),
        });

        const json = await res.json();
        console.log(json.success);

        if (!json.success) {
            alert("Enter valid credentials");
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
}


  return (
    <>
      <div className='container'>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={fields.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={fields.email} onChange={handleChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={fields.password} onChange={handleChange} />
          </div>
          
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="location" value={fields.location} onChange={handleChange} />
          </div>
          <button type="submit" className="mb-3 btn btn-primary btn-success">Submit</button>
          <Link to="/Login" className="mb-3 btn btn-primary btn-danger">Already Have an Account</Link>
        </form>
      </div>
    </>
  )
}
