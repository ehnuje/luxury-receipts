import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from "./CustomerDelete";

class Product extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img src={this.props.image} />
        </TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.registeredDate}</TableCell>
        <TableCell>
          <CustomerDelete
            id={this.props.id}
            stateRefresh={this.props.stateRefresh}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default Product;
