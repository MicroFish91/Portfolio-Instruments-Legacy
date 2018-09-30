import React, { Component } from 'react';



class TableInputOption extends Component {

    render() {

        return (
            
            <div class="row">
                <div class="col-lg-12">
                    <form  method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Miscellaneous Assets</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">

                                {/* Left Column */}
                                <div class="col-md-6 col-lg-6">

                                    <div class="form-group">
                                        <label class="form-label">Holding Location</label>
                                        <input type="text" class="form-control" name="example-text-input" placeholder="Ex. Vanguard"></input>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label">Amount ($)</label>
                                        <input type="text" class="form-control" name="example-text-input" placeholder="Ex. Vanguard"></input>
                                    </div>

                                <button type="submit" class="btn btn-primary ml-auto">Add Misc Asset</button>

                                

                                </div>

                                {/* Right Column */}
                                <div class="col-md-6 col-lg-6">

                                <div class="form-group">
                                    <label class="form-label">Holding Type</label>
                                    <select name="type" class="form-control custom-select">
                                        <option value="taxable">Taxable</option>
                                        <option value="taxable">Traditional</option>
                                        <option value="taxable">Roth</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Asset Type</label>
                                    <select name="assets" class="form-control custom-select">
                                        <option value="mm">Cash/Money Market</option>
                                        <option value="bills">Fixed Income: Bills (1 YR or Less)</option>
                                        <option value="STB">Fixed Income: Short Term Bonds (1 - 3 YRS)</option>
                                        <option value="ITB">Fixed Income: Intermediate Term Bonds (3 - 15 YRS)</option>
                                        <option value="LTB">Fixed Income: Long Term Bonds (15 - 30 YRS)</option>
                                        <option value="commodoties">Real Assets: Commodoties</option>
                                        <option value="gold">Real Assets: Gold</option>
                                        <option value="reits">Real Assets: Real Estate (REITS) </option>
                                        <option value="tsm">Equities: Total Stock Market (TSM)</option>
                                        <option value="dlcb">Equities: Domestic Large Cap Blend (DLCB) </option>
                                        <option value="dlcg">Equities: Domestic Large Cap Growth (DLCG) </option>
                                        <option value="dlcv">Equities: Domestic Large Cap Value (DLCV) </option>
                                        <option value="dmcb">Equities: Domestic Medium Cap Blend (DMCB) </option>
                                        <option value="dmcg">Equities: Domestic Medium Cap Growth (DMCG) </option>
                                        <option value="dmcv">Equities: Domestic Medium Cap Value (DMCV) </option>
                                        <option value="dscb">Equities: Domestic Small Cap Blend (DSCB) </option>
                                        <option value="dscg">Equities: Domestic Small Cap Growth (DSCG) </option>
                                        <option value="dscv">Equities: Domestic Small Cap Value (DSCV) </option>
                                        <option value="ilcb">Equities: International Large Cap Blend (ILCB) </option>
                                        <option value="ilcg">Equities: International Large Cap Growth (ILCG) </option>
                                        <option value="ilcv">Equities: International Large Cap Value (ILCV) </option>
                                        <option value="imcb">Equities: International Medium Cap Blend (IMCB) </option>
                                        <option value="imcg">Equities: International Medium Cap Growth (IMCG) </option>
                                        <option value="imcv">Equities: International Medium Cap Value (IMCV) </option>
                                        <option value="iscb">Equities: International Small Cap Blend (ISCB) </option>
                                        <option value="iscg">Equities: International Small Cap Growth (ISCG) </option>
                                        <option value="iscv">Equities: International Small Cap Value (ISCV) </option>
                                                    
                                    </select>
                                </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default TableInputOption;