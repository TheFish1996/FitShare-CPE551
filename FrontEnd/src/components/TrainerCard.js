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
                    <h5 class="card-title">{props.item.name}</h5>
                    <p>This is where a description of the trainer would go</p>
                    <h6>Email: {props.item.email}</h6>
                    <Button outline color="info" size="md" onClick={toggle}>Courses They Teach</Button>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader style={{borderColor: "#17a2b8"}} toggle={toggle}>Courses Taught by {props.item.name}</ModalHeader>
                <ModalBody>
                    {props.item.courses.map((item, index) => {
                        return (
                            <a href={item.file} target="_blank">
                                <h6>{index + 1}. {item.name}</h6>
                            </a>
                        )
                    })}
                </ModalBody>
                <ModalFooter style={{borderColor: "#17a2b8"}}>
                    <Button color="primary" onClick={toggle}>Click To Exit</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}


export default TrainerCard