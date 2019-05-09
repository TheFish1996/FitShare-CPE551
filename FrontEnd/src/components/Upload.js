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

  function handleImage(e) {
    let files = e.target.files
    setFormData(state => ({
      ...state,
      FileList: files
    }))
  }

  function submitForm(e) {
    e.preventDefault();
    const {Name, Description, Price, FileList} = formData
    const fileData = new FormData();
    fileData.append("file", FileList[0])

    props.uploadProgram(fileData)

    // fetch("http://localhost:5000/api/upload", {
    //    method: "POST",
    //    body: fileData
    //  }).then(response => {
    //    console.log(response);
    //  });

  }

//  const handleUploadImage = ev => {
   
//     ev.preventDefault();

//     const data = new FormData();
//     data.append("file", this.uploadInput.files[0]);

//     fetch("http://localhost:5000/api/upload", {
//       method: "POST",
//       body: data
//     }).then(response => {
//       console.log(response);
//     });
//   };


 // console.log(formData)
  return (
    <div>
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
                name="programFile"
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
