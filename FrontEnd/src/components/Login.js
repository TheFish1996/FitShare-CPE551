import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback
} from "reactstrap";
import {connect} from "react-redux";
import Navbar from "./NavBar";
import "../styles/App.css";

const mapStateToProps = (state) => {
    return {
      loggedIn: state.userInformation.loginSuccess
    };
  };

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Container fluid className="App">
          <h2>Sign In</h2>
          <Form className="form" onSubmit={e => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="name@example.com"
                  value={email}
                  valid={this.state.validate.emailState === "has-success"}
                  invalid={this.state.validate.emailState === "has-danger"}
                  onChange={e => {
                    this.validateEmail(e);
                    this.handleChange(e);
                  }}
                />
                <FormFeedback valid>
                </FormFeedback>
                <FormFeedback>
                    Enter a properly formatted email address
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={password}
                  onChange={e => this.handleChange(e)}
                />
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default connect(
    mapStateToProps,
    null
)(LogIn);
