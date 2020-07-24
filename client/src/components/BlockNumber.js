import React from "react";
import Button from "@material-ui/core/Button";

class BlockNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockNumber: 0,
    };
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary">
          {this.state.blockNumber}
        </Button>
      </div>
    );
  }
}

export default BlockNumber;
