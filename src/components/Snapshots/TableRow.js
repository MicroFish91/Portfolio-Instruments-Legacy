import React, { Component } from 'react'

class TableRow extends Component {

    render() {

        return (

            <tr>
                <td>Vanguard</td>
                <td>Taxable</td>
                <td>$350.23</td>
                <td>$350.23</td>
                <td>$654,765</td>
                <td>$350.23</td>
                <td>$350.23</td>
                <td>$350.23</td>
                <td>$2000.23</td>
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
