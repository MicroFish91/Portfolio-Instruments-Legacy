import React, { Component } from 'react';

import Institutions from './Institutions';
import TaxShelter from './TaxShelter';

class RowThree extends Component {

    render() {

        return (

            <div>
                <div class="row">

                    <Institutions />

                    <TaxShelter />

                </div>
            </div>
        )
    }
}

export default RowThree;