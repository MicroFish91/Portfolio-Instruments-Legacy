import React, { Component } from "react";

class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Map Rows
    const row = this.props.accountInfo.map((columnData) => {
      return <td>{columnData}</td>;
    });

    return (
      <tr>
        {row}
        <td>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a class="icon"></a>
          <a href="javascript:void(0)" class="btn btn-danger btn-sm">
            <i class="fas fa-trash"></i> Delete{" "}
          </a>
        </td>
      </tr>
    );
  }
}

export default TableRow;
