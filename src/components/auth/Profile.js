import React from 'react';
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from "../../context/AuthContext"
import { Link } from 'react-router-dom';

export const Profile = () => {
    const { currentUser } = useAuth()
    return (
        <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
            <div className="w-100" style={{maxWidth: "600px"}}>
                <Card>
                    <Card.Body >
                        <h2 className="text-center mb-4">Profile</h2>
                        <div className="text-center">
                            <strong>Email: </strong> {currentUser.email}
                        </div>
                        <Link to="/update-profile" className="btn btn-warning w-100 mt-3">Update profile</Link>
                        
                    </Card.Body>
                </Card>
            </div>
        </Container>
        </>
    );
};
