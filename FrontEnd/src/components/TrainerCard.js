import React, { Component, useState } from "react";
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const pic = require("../img/logo.svg");

function TrainerCard (props) {

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    return (
        <div>
            <Card outline color="info" className="TrainerCard">
                <CardImg top width="100%" src={props.item.profilePic} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.item.name}</CardTitle>
                    <p>This is where a description of the trainer would go</p>
                    <h6>Email: {props.item.email}</h6>
                    <Button outline color="info" size="md" onClick={toggle}>Courses They Teach</Button>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Courses Taught by {props.item.name}</ModalHeader>
                <ModalBody>
                    Place Holder for various courses {props.item.courses}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Click To Exit</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}


export default TrainerCard