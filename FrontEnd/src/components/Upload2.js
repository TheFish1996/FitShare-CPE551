import React from "react";
import NavbarComponent from "./NavBar";

class Upload extends React.Component {
  constructor(props) {
    super(props);

    // this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage = ev => {
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

  render() {
    return (
      <div>
        <form
          action="/api/upload"
          method="post"
          encType="multipart/form-data"
          onSubmit={this.handleUploadImage}
        >
          <div>
            <input
              ref={ref => {
                this.uploadInput = ref;
              }}
              type="file"
              name="file"
            />
          </div>

          <br />
          <div>
            <button>Upload</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;
