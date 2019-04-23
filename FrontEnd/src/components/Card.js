import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg
} from "reactstrap";

const pic = require("../img/logo.svg");

function TrainerCard(props) {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={pic} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.caption}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default TrainerCard;
