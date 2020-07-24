import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

const accessKeyId = "201373a4713f5d6f6dd0409035dbf89e7a89ddb1";
const secretAccessKey = "253c8ecb52c79a8fd895beada9e471df7be8d429";

const option = {
  headers: [
    {
      name: "Authorization",
      value:
        "Basic " +
        Buffer.from(accessKeyId + ":" + secretAccessKey).toString("base64"),
    },
    { name: "origin", value: "localhost" },
    { name: "x-krn", value: "krn:1001:node" },
  ],
};

const Caver = require("caver-js");
const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.beta.klaytn.io/v1/klaytn",
    option
  )
);

class PrivateKeyImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      open: false,
      fileName: "",
      privateKey: localStorage.PrivateKey,
    };
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    console.log("handleClose");
    this.setState({
      file: null,
      fileName: "",
      open: false,
    });
  };

  handleFormSubmit = (e) => {
    console.log("handleFormSubmit");
    e.preventDefault();

    if (caver.utils.isValidPrivateKey(this.state.privateKey)) {
      localStorage.PrivateKey = this.state.privateKey;
      this.handleClose();
    } else {
      console.log("err");
      this.handleClose();
    }
  };

  handleFileChange = (e) => {
    console.log("filName");
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
      privateKey: "",
    });
  };

  handleValueChange = (e) => {
    console.log(e.target.name + " has been updated to " + e.target.value);
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          PrivateKey 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <TextField
              label="PrivateKey"
              type="text"
              name="privateKey"
              value={
                this.state.privateKey
                  ? this.state.privateKey
                  : localStorage.PrivateKey
              }
              onChange={this.handleValueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PrivateKeyImport);
