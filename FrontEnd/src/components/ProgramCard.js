import React, { Component } from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {connect} from 'react-redux'
import {purchaseProgram} from '../actions/userActions'

const pic = require("../img/logo.svg");

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseProgram: (userID, programName) => dispatch(purchaseProgram(userID, programName))
    }
  }

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
                <Card outline color="secondary" className="ProgramsCard">
                    <CardImg top width="100%" src={pic} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.item.name}</CardTitle>
                        <h5>${this.props.item.price}</h5>
                        <Button outline color="info" size="md" onClick={this.toggle}>Click Here for More Details</Button>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Details for {this.props.item.name}</ModalHeader>
                    <ModalBody>
                        This course is just a test and a place holder and the instructor for this course is: {this.props.item.trainer}
                    </ModalBody>
                    <ModalFooter>
                        <a href={this.props.item.file} target="_blank">
                            <Button color="primary" onClick={() => {
                                this.props.purchaseProgram(this.props.item.user, this.props.item.name)
                            }}>Buy Program</Button>
                        </a>
                        <Button color="secondary" onClick={this.toggle}>Click To Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default connect(
null,
mapDispatchToProps
)(ProgramCard)