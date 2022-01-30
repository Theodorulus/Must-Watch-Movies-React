import React,  { useRef, useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
      e.preventDefault()

      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords don't match")
      }

      const promises = []
      setLoading(true)
      setError("")

      if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
      }

      if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value))
      }

      Promise.all(promises).then(() => {
        navigate("/profile")
      }).catch(() => {
          setError('Failed to update account')
      }).finally(() => {
          setLoading(false)
      })
  }
  return (
  <>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
          <Card.Body>
              <h2 className="text-center mb-4"> Update profile </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                  </Form.Group>
                  <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} placeholder="Leave empty to keep the same"/>
                  </Form.Group>
                  <Form.Group id="password-confirm">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave empty to keep the same"/>
                  </Form.Group>
                  <Button disabled={loading} className="w-100 mt-3" type="submit"> Update </Button>
              </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
              <Link to="/profile" className="text-decoration-none"> Cancel </Link>
        </div>
      </div>
    </Container>
  </>
  );
};
