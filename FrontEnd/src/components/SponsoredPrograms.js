import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import Navbar from "./NavBar";
import ProgramCard from "./ProgramCard"
import {getSponsoredPrograms} from "../actions/programActions"

const fakeData = require('../API/test.json') //fakedata used to just populate for now

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess,
      sponsoredPrograms: state.programInformation.sponsoredPrograms,
      userData: state.userInformation.userData
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        getSponsoredPrograms: () => dispatch(getSponsoredPrograms())
    }
  }

class SponsoredPrograms extends Component {
    constructor(props){
        super(props)
        this.state = {
            sponsoredProgramData: fakeData,
            updatedSponsoredProgams: false
        }
    }


    componentDidMount(){        //whenever mounted it should fetch the new data if we are logged in
        if(this.props.loggedIn && !this.state.updatedSponsoredProgams){
            this.props.getSponsoredPrograms();
            this.setState({
                updatedAllProgams: true
            })
        }
    }

    render() {
        const {loggedIn, sponsoredPrograms, userData} = this.props
        return (
            <div>
                {!loggedIn && 
                    <Redirect to="/" />
                }
                <Navbar />
                <Container fluid className="Programs">
                    <Row>
                    {sponsoredPrograms.map((item, index) => {
                        return (
                            <Col key={item._id.$oid} xs="6" sm="3">
                                <ProgramCard user={userData._id} item={item} />
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
    mapDispatchToProps
  )(SponsoredPrograms);