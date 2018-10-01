import React, { Component } from 'react'

class TableRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        // Map Rows
        var row = this.props.accountInfo.map((columnData, index) => {

            if ((columnData !== "") ||(index === (this.props.accountInfo.length - 2))) {
                return <td>{columnData}</td>;
            } 
        });

        return (

            <tr>
                {row}
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a class="icon"></a>
                    <a href="javascript:void(0)" class="btn btn-primary btn-sm"><i class="fas fa-pencil-alt"></i> Edit  </a>
                    &nbsp;&nbsp;&nbsp;
                    <a class="icon"></a>
                    <a href="javascript:void(0)" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Delete  </a>
                </td>
            </tr>
            
        )
    }
}

export default TableRow;
