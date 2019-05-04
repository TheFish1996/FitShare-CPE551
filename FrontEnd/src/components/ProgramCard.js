import React, { Component } from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const pic = require("../img/logo.svg");

class ProgramCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        return (
            <div>
                <Card className="ProgramsCard">
                    <CardImg top width="100%" src={pic} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.item.name}</CardTitle>
                        <h5>{this.props.item.price}</h5>
                        <Button outline color="info" size="md" onClick={this.toggle}>Click Here for More Details</Button>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Details for {this.props.item.name}</ModalHeader>
                    <ModalBody>
                        This course is just a test and a place holder and the instructor for this course is: {this.props.item.instructor}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Click To Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default ProgramCard