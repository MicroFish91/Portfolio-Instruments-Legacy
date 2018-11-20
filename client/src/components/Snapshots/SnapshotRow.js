import React, { Component } from 'react';

class SnapshotRow extends Component {

    constructor(props) {
        super(props);
    }

    deleteRow(e){

        // Delete from Database
        fetch("/deleteSnapshot", {
            headers: {
                'content-type': "application/json"
            },
            method: "POST",
            body: JSON.stringify({id: this.props.snapshots.id})
        })

        this.props.onDelete(this.props.snapshots.id, this.props.index);

    }

    render() {

        var myDate = new Date(this.props.snapshots.date.slice(0, 10));

        return (

            <tr>
                <td>{this.props.snapshots.title}</td>
                <td>{this.props.snapshots.benchmark}</td>
                <td>{this.props.snapshots.notes}</td>
                <td>{myDate.getUTCMonth() + 1}-{myDate.getUTCDate()}-{myDate.getFullYear()}</td>
                <td>${this.props.snapshots.total}</td>
                <td>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a class="icon"></a>
                    <a href="javascript:void(0)" class="btn btn-danger btn-sm" onClick={(e) => {this.deleteRow(e)}}><i class="fas fa-trash"></i> Delete  </a>
                </td>
            </tr>
            
        )
    }
}

export default SnapshotRow;
