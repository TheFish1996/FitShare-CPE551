import React, {useState} from "react";
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
import {uploadProgram} from '../actions/programActions'
import Navbar from "./NavBar";
import { Redirect } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userInformation.loginSuccess,
    userData: state.userInformation.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      uploadProgram: (formData) => dispatch(uploadProgram(formData))
  }
}

function Upload(props){

  const {userData, loggedIn} = props
  const [formData, setFormData] = useState({
    Name: userData.name,
    programName: "",
    Description: "",
    Price: 0,
    FileList: {}
  })

 function handleDescription(e) {
    let Description = e.target.value
    setFormData(state => ({
        ...state,
        Description: Description
    }))
  }

  function handlePrice(e) {
    let Price = e.target.value
    setFormData(state => ({
        ...state,
        Price: Price
    }))
  }

  function handleProgramName(e){
    let programName = e.target.value
    setFormData(state => ({
      ...state,
      programName: programName
    }))
  }

  function handleImage(e) {
    let files = e.target.files
    setFormData(state => ({
      ...state,
      FileList: files
    }))
  }

  function submitForm(e) {
    e.preventDefault();
    const {Name, Description, Price, FileList, programName} = formData
    const {userData} = props
    const fileData = new FormData();
    fileData.append("userID", userData._id)
    fileData.append("file", FileList[0])
    fileData.append("Name", Name)
    fileData.append("programName", programName)
    fileData.append("Description", Description)
    fileData.append("Price", Price)

    props.uploadProgram(fileData)

  }
  return (
    <div>
      {!loggedIn && 
      <Redirect to="/" />
      } 
      <Navbar />
      <Container fluid className="App">
        <h2 style={{display: "flex", justifyContent: "center"}}>Upload Your Program</h2>
        <Form className="form" onSubmit={(e) => submitForm(e)}>
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
              <Label>Program Name</Label>
              <Input 
                type="text"
                name="programName"
                placeholder="Program Name"
                required = {true}
                onChange={(e) => {
                  handleProgramName(e)
                }}
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
                onChange={(e) => {
                  handleDescription(e)
                }}
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
                onChange={(e) => {
                  handlePrice(e)
                }}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>File</Label>
              <Input 
                type="file"
                name="file"
                placeholder={"Please Upload PDF File"}
                min="1"
                required={true}
                accept="application/pdf"
                onChange={(e) => {
                  handleImage(e)
                }}
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
mapDispatchToProps
)(Upload);
