import React from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback,
  Spinner,
  Row,
} from "reactstrap";
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userInformation.loginSuccess,
    userData: state.userInformation.userData
  };
};

function Upload(props){

 const handleUploadImage = ev => {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: data
    }).then(response => {
      console.log(response);
    });
  };

  const {userData, loggedIn} = props
  console.log(userData)

  return (
    <div>
      <Container fluid className="App">
        <h2 style={{display: "flex", justifyContent: "center"}}>Upload Your Program</h2>
        <Form className="form" onSubmit={() => {console.log("Testing")}}>
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input 
                type="text"
                name="Name"
                disabled={true}
                value={userData.name}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Description</Label>
              <Input 
                type="text"
                name="Description"
                placeholder={"Please Type A Description"}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Price ($)</Label>
              <Input 
                type="number"
                name="Price"
                placeholder={"Please Include Price Over $0"}
                min="1"
                required={true}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>File</Label>
              <Input 
                type="file"
                name="programFile"
                placeholder={"Please Upload PDF File"}
                min="1"
                required={true}
                accept="application/pdf"
              />
            </FormGroup>
          </Col>
          <Col style={{display: "flex", justifyContent: "space-between"}}>
              <Button>Submit</Button>
          </Col>
        </Form>
      </Container>
    </div>
  )
}

export default connect(
mapStateToProps,
null
)(Upload);
