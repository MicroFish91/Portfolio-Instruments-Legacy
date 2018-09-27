import React, { Component } from 'react';

import Institutions from './Institutions';
// import TaxShelter from './TaxShelter';

class RowThree extends Component {

    render() {

        return (

                <div class="row">

                    <Institutions institutionTitle={"Financial Institutions"}/>

                    <Institutions institutionTitle={"Tax Shelter"} />

                </div>
        )
    }
}

export default RowThree;