import React, { useEffect } from "react";
import Navbar from "./NavBar";
import {Container, Row, Col} from 'reactstrap';
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

const pic = require("../img/logo.svg");

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess,
      userData: state.userInformation.userData
    };
};

function Profile(props){

    const {loggedIn, userData} = props
    console.log(userData)

    useEffect(() => {                                       //replaces 'componentDidMount'
        if(loggedIn){
            console.log('Component Mounted!')
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
                    <Col xs="6" sm="3">
                        <Row style={{marginBottom: 10}}>
                            <img className="border border-primary rounded-circle" src={userData.profilePic} alt="User Profile Pic" width="80%" height="50%"></img>
                        </Row>
                        <Row>
                            <h4>{userData.name}</h4>
                        </Row>
                        <Row>
                            <p>Email: {userData.email}</p>
                        </Row>
                        <Row>
                            <p>Programs Purchased: {
                                userData.purchasedPrograms === undefined ? 0 : userData.purchasedPrograms.length
                            }</p>
                        </Row>
                    </Col>
                    <Col xs="6" sm="7" className="border border-primary">
                        <h2>Your Courses Taught</h2>
                        {userData.courses !== undefined ? userData.courses.map((item, index) => {
                            return (
                                <a key={index} href={item.file} target="_blank">
                                    <h3>{index + 1}. {item.name}</h3>
                                </a>
                            )
                        })
                        : <h3>You Teach No Courses</h3>
                        }
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