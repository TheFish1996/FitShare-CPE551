import React, { Component, useState } from "react";
import {Container} from "reactstrap"

function DiscoverTrainer(props){

    const [trainerName, setTrainerName] = useState("Name")  //setTrainerName acts as a this.setState

    return (
        <Container fluid className="">
            <h1>{trainerName}</h1>
            <button onClick={() => {
                setTrainerName("Test")
            }}></button>
        </Container>
    );
}

export default DiscoverTrainer;