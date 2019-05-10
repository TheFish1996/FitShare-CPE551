import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import Navbar from "./NavBar";
import Carousel from "./Carousel";
import Card from "./Card";
import TrainerCard from "./TrainerCard"
import { discoverTrainers } from "../actions/trainerActions"

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

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedTrainers: false,
    };
  }

  componentWillMount(){
    if(this.props.loggedIn && !this.state.updatedTrainers){
      this.props.discoverTrainers()
      this.setState({
        updatedTrainers: true,
      })
  } 
  }

  render() {
    const {loggedIn, trainerDetails} = this.props
    console.log(trainerDetails[0])
    return (
      <>
        {!loggedIn && 
          <Redirect to="/" />
        }
        <Navbar />
        <Container fluid>
          <Row>
            <Col sm="12" md="12">
              <Carousel />
            </Col>
            <br />
          </Row>
          <Row style={{marginTop: 10}}>
            <Col xs="6" sm="4">
            {
              trainerDetails[5] !== undefined &&
              <TrainerCard item={trainerDetails[5]} />
            }
            </Col>
            <Col xs="6" sm="4">
              {
                trainerDetails[1] !== undefined &&
                <TrainerCard item={trainerDetails[1]} />
              }
            </Col>
            <Col xs="6" sm="4">
              {
                trainerDetails[2] !== undefined &&
                <TrainerCard item={trainerDetails[2]} />
              }
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
