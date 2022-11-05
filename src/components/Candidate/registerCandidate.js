import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Form, Container, Button, Navbar} from 'react-bootstrap';
import { propTypes } from "react-bootstrap/esm/Image";
import "./form.css"

export default function RegisterCandidate(props) {
    const [validated, setValidated] = useState(false);
    const loading = props.loading;

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const name = document.getElementById('form.name').value;
            const imageUrl = document.getElementById('form.imageUrl').value;
            props.register(name, imageUrl);
        }
        setValidated(true);
    };
       
    const Registering = () => {
        return(
            <div className="background">
                <Navbar bg="dark" fixed="top" >
                    <div className="homeBar">
                        <Button className="home" onClick={props.redirect}>Home</Button>                    </div>
                </Navbar>
                { loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                    ) : (
                    <Container className="container">
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className="form">
                            <h4 className="header">Please enter the following information to register as an election candidate</h4>
                            <Form.Group className="mb-3" controlId="form.name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Please enter full name" required/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a name.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="form.imageUrl">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control type="url" placeholder="Please enter image URL" required/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid url.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Container>
                    )
                }
            </div>
    
        )
    }

    return ( 
        <div>
            {    props.isConnected ?
                    <Registering /> :
                    <Navigate to = '/' />
            }
        </div>
    )

}