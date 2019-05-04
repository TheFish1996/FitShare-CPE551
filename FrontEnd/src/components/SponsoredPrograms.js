import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import Navbar from "./NavBar";
import ProgramCard from "./ProgramCard"

const fakeData = require('../API/test.json') //fakedata used to just populate for now

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess
    };
  };

class SponsoredPrograms extends Component {
    constructor(props){
        super(props)
        this.state = {
            sponsoredProgramData: fakeData
        }
    }


    componentDidMount(){        //whenever mounted it should fetch the new data if we are logged in
        if(this.props.loggedIn){
            console.log(this.state.sponsoredProgramData)
        }
    }

    render() {
        const {loggedIn} = this.props
        return (
            <div>
                {!loggedIn && 
                    <Redirect to="/" />
                }
                <Navbar />
                <Container fluid className="Programs">
                    <Row>
                    {this.state.sponsoredProgramData.map((item, index) => {
                        return (
                            <Col key={item.id} xs="6" sm="3">
                                <ProgramCard item={item} />
                            </Col>
                        )
                    })}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    null
  )(SponsoredPrograms);