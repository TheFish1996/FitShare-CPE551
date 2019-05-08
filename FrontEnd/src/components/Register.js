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

import "../styles/App.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
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
   

    let data = {};
    data["name"] = this.state.name;
    data["email"] = this.state.email;
    data["password"] = this.state.password;
    fetch("http://localhost:5000/api/registerUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log(response);
      alert("done")
   
    });
  }

  render() {
    const { email, password, name } = this.state;

    return (
      <div>
        <Container fluid className="App">
          <h2 style={{display: "flex", justifyContent: "center"}}>Register</h2>
          <Form className="form" onSubmit={e => this.submitForm(e)}>
            <Col>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  placeholder="John Appleseed"
                  type="name"
                  name="name"
                  autoFocus={true}
                  value={name}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
                <FormFeedback valid />
                <FormFeedback>
                  Enter a properly formatted email address
                </FormFeedback>
              </FormGroup>
            </Col>
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
                <FormFeedback valid />
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
            <Col>
              <Button>Submit</Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
