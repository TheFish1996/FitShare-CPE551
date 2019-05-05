import React, { useEffect } from "react";
import Navbar from "./NavBar";
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

const pic = require("../img/logo.svg");

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess
    };
};

function Profile(props){

    const {loggedIn} = props

    useEffect(() => {                                       //replaces 'componentDidMount'
        if(loggedIn){
            console.log('Component Mounted!')               //will set trainer data if logged in
        }                                      
    })


    return (
        <div>
            {!loggedIn && 
                <Redirect to="/" />
            }
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

export default connect(
    mapStateToProps,
    null
)(Profile)