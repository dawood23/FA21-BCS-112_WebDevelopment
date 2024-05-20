import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
  
    console.log('Signup submitted:', { email, password });
  }; 

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
