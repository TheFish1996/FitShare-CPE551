import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import Navbar from "./NavBar";
import ProgramCard from "./ProgramCard"
import {getAllPrograms} from "../actions/programActions"

const fakeData = require('../API/test.json') //fakedata used to just populate for now

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess,
      allPrograms: state.programInformation.allPrograms,
      userData: state.userInformation.userData
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
      getAllPrograms: () => dispatch(getAllPrograms())
    }
  }

class AllPrograms extends Component {
    constructor(props){
        super(props)
        this.state = {
            AllProgramData: fakeData,
            updatedAllProgams: false
        }
    }

    componentDidMount(){        //whenever mounted it should fetch the new data
        if(this.props.loggedIn && !this.state.updatedAllProgams){
            this.props.getAllPrograms();
            this.setState({
                updatedAllProgams: true
            })
        }
    }

    render() {
        const {loggedIn, allPrograms, userData} = this.props
        console.log(userData)
        return (
            <div>
                {!loggedIn && 
                    <Redirect to="/" />
                } 
                <Navbar />
                <Container fluid className="Programs">
                    <Row>
                    {allPrograms.map((item, index) => {
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
  )(AllPrograms);