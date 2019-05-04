import React, { Component } from "react";
import Navbar from "./NavBar";
import {Container, Row, Col} from 'reactstrap';

const pic = require("../img/logo.svg");

function Profile(props){
    return (
        <div>
            <Navbar />
            <Container fluid className="Profile">
                <Row>
                    <Col xs="6" sm="2">
                        <Row style={{marginBottom: 10}}>
                            <img className="border border-primary rounded-circle" src={pic} alt="User Profile Pic" width="90%" siz></img>
                        </Row>
                        <Row>
                            <h4>Jonathan </h4>
                        </Row>
                        <Row>
                            <p>Age: 22</p>
                        </Row>
                        <Row>
                            <p>Email: test@gmail.com</p>
                        </Row>
                        <Row>
                            <p>Programs: 10</p>
                        </Row>
                    </Col>
                    <Col xs="6" sm="7" className="border border-primary">
                        <h1>Testing</h1>   
                    </Col>
                    <Col xs="6" sm="3">
                        <h1>Testing</h1>      
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile