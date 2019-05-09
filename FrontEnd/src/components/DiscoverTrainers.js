import React, { useState, useEffect } from "react";
import {Container, Row, Col, Button} from "reactstrap"
import Navbar from "./NavBar";
import TrainerCard from "./TrainerCard"
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import { discoverTrainers } from "../actions/trainerActions"

const fakeData = require('../API/Instructor.json') //fakedata used to just populate for now

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess,
      trainerDetails: state.trainerInformation.trainerDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      discoverTrainers: () => dispatch(discoverTrainers())
    }
  }

function DiscoverTrainer(props){
    const {loggedIn, trainerDetails} = props
    const [trainerName, setTrainerName] = useState("Name")  //setTrainerName acts as a this.setState, use 'useMergeState' if you want to combine muliple states
    const [trainerData, setTrainerData] = useState(fakeData)

    useEffect(() => {                                       //replaces 'componentDidMount'
        if(loggedIn){
            props.discoverTrainers()
        }                                      
    })
    return (
        <div>
            {!loggedIn && 
                <Redirect to="/" />
            }
            <Navbar />
            <Container fluid className="Trainers">
                <Row>
                {trainerDetails.map((item, index) => {
                    return (
                        <Col key={item._id} xs="6" sm="3">
                            <TrainerCard item={item} />
                        </Col>
                    )
                })
                }
                </Row>
            </Container>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DiscoverTrainer);