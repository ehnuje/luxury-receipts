import React from "react";
import { post } from "axios";

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    };
  }

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("filename", this.state.fileName);
    formData.append("name", this.state.userName);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log("addCustomer");
    return post(url, formData, config);
  };

  handleFormSubmit = (e) => {
    console.log("handleFormSubmit");
    e.preventDefault();
    this.addCustomer().then((response) => {
      console.log(response.data);
      this.props.stateRefresh();
    });
    // 전송 이후 값 초기화
    this.setState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    });
  };

  handleFileChange = (e) => {
    console.log("filName");
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };

  handleValueChange = (e) => {
    console.log(e.target.name + " has been updated to " + e.target.value);
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
        <h1>고객 추가</h1>
        프로필 이미지:{" "}
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
        />
        <br />
        이름:{" "}
        <input
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.handleValueChange}
        />
        <br />
        생년월일:{" "}
        <input
          type="text"
          name="birthday"
          value={this.state.birthday}
          onChange={this.handleValueChange}
        />
        <br />
        성별:{" "}
        <input
          type="text"
          name="gender"
          value={this.state.gender}
          onChange={this.handleValueChange}
        />
        <br />
        직업:{" "}
        <input
          type="text"
          name="job"
          value={this.state.job}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default CustomerAdd;
