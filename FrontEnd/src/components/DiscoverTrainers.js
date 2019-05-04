import React, { useState, useEffect } from "react";
import {Container, Row, Col, Button} from "reactstrap"
import Navbar from "./NavBar";
import TrainerCard from "./TrainerCard"
import {connect} from "react-redux";

const fakeData = require('../API/Instructor.json') //fakedata used to just populate for now

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess
    };
};

function DiscoverTrainer(props){

    const [trainerName, setTrainerName] = useState("Name")  //setTrainerName acts as a this.setState, use 'useMergeState' if you want to combine muliple states
    const [trainerData, setTrainerData] = useState(fakeData)

    console.log(props.loggedIn)                             //redux still stays outside even though its a react hoook

    useEffect(() => {                                       //replaces 'componentDidMount'
        if(props.loggedIn){
            console.log('Component Mounted!')               //will set trainer data if logged in
        }                                      
    })

    return (
        <div>
            <Navbar />
            <Container fluid className="Trainers">
                <Row>
                {trainerData.map((item, index) => {
                    return (
                        <Col key={item.id} xs="6" sm="3">
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
    null
)(DiscoverTrainer);