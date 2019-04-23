import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Navbar from "./NavBar";
import ProgramCard from "./ProgramCard"

const fakeData = require('../API/test.json') //fakedata used to just populate for now

class AllPrograms extends Component {
    constructor(props){
        super(props)
        this.state = {
            AllProgramData: fakeData
        }
    }


    componentDidMount(){        //whenever mounted it should fetch the new data
        console.log(this.state.AllProgramData)
    }

    render() {
        return (
            <div>
                <Navbar />
                <Container fluid>
                    <Row>
                    {this.state.AllProgramData.map((item, index) => {
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


export default AllPrograms