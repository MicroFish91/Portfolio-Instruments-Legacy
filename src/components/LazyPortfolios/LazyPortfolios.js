import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import DashTitle from '../DashTitle';
import General from './General';
import PortfolioCard from './PortfolioCard';

class LazyPortfolios extends Component {

    static defaultProps = {

        assetInfo: {
            assetTitles: [
                ["Total Stock Market (TSM)"],
                ["Total Stock Market (TSM)", "Intermediate Term Bonds (ITB)"],
                ["Domestic Large Cap Blend (DLCB)", "International Large Cap Blend (ILCB)", "Intermediate Term Bonds (ITB)"],
                ["Domestic Large Cap Blend (DLCB)", "Domestic Small Cap Blend (DSCB)", "International Large Cap Blend (ILCB)", "Short Term Bonds (STB)"],
                ["Domestic Large Cap Blend (DLCB)", "International Large Cap Blend (ILCB)", "Intermediate Term Bonds (ITB)", "Real Estate Investment Trusts (REITs)"],
                ["Domestic Large Cap Blend (DLCB)", "International Large Cap Blend (ILCB)", "Intermediate Term Bonds (ITB)", "Commodities", "Real Estate Investment Trusts (REITs)"],
                ["Domestic Large Cap Blend (DLCB)", "Long Term Bond (LTB)", "Gold", "Cash"],
                ["Domestic Large Cap Blend (DLCB)", "Domestic Small Cap Value (DSCV)", "Long Term Bonds (LTB)", "Short Term Bonds (STB)", "Gold"]
            ],
            assetRatios: [
                [100], [60, 40], [40, 20, 40], [25, 25, 25, 25], [48, 24, 20, 8], [20, 20, 20, 20, 20], [25, 25, 25, 25], [20, 20, 20, 20, 20]
            ],
            assetNames: [
                "Total Stock Market",
                "Classic 60/40",
                "Three-Fund Portfolio",
                "No-Brainer Portfolio",
                "Rick Ferri Core Four",
                "Ivy Portfolio",
                "Permanent Portfolio",
                "Golden Butterfly"
            ],
            assetSubtitles: [
                "100% Stock Market Index Fund",
                "Standard Bogleheads Portfolio",
                "Three-Part Bogleheads Portfolio",
                "A Simple Four-Fund Portfolio",
                "Four-Asset Style Bogleheads Portfolio",
                "Harvard & Yale Endowment Strategy",
                "A Simple, Unconventional All-Weather Portfolio",
                "A Stable & High-Return Portfolio."
            ],
            assetDescriptions: [
                "An extremely simple passive investing portfolio.",
                "A standard Bogleheads classic popularized by Jack Bogle, founder of Vanguard Corp.",
                "Another classically simple but popular Bogleheads portfolio.",
                "A simple but effective portfolio popularized by William Bernstein.",
                "A Bogleheads style portfolio popularized by Rick Ferri.",
                "A portfolio popularized by Mebane Faber detailing the investing strategies of Harvard & Yale Endowments.",
                "An all-weather portfolio popularized by Harry Browne.",
                "An unconventional, stable, & high return portfolio popularized by Portfolio Charts."
            ],
            assetCAGR: [
                "6.4%", "5.9%", "5.9%", "6.6%", "6.9%", "6.6%", "5.0%", "6.5%"
            ],
            assetSTD: [
                "17.0%", "10.8%", "10.6", "13.0%", "13.1%", "10.6%", "6.9%", "7.8%"
            ],
            assetWorstDraw: [
                "49%", "34%", "32%", "39%", "39%", "33%", "14%", "11%"
            ],
            assetLongestDraw: [
                "13 years", "12 years", "10 years", "9 years", "10 years", "5 years", "5 years", "2 years"
            ],
            colors: [
                ['#f66d9b'], ['#f66d9b', '#8ecf4d'], ['#f66d9b', '#8ecf4d', '#4ecc48'], ['#f66d9b', '#8ecf4d', '#4ecc48', '#f999b9'], ['#f66d9b', '#8ecf4d', '#4ecc48', '#f999b9'], ['#f66d9b', '#8ecf4d', '#4ecc48', '#f999b9', '#5797fc'], ['#f66d9b', '#8ecf4d', '#4ecc48', '#f999b9'], ['#f66d9b', '#8ecf4d', '#4ecc48', '#f999b9', '#5797fc']
            ],
            linkTo: [
                "/lazyPortfolios/tsm", "/sixtyForty", "/threeFund", "/noBrainer", "/rickFerri", "/ivy", "/permanent", "/goldenButterfly"
            ]
        }
    }

    render() {

        // Map Portfolio Components to portfolios
        var portfolios = this.props.assetInfo.assetTitles.map((data, index) => {
            return <PortfolioCard assetInfo={this.props.assetInfo} index={index} />;
        });

        return (
            <div class="app-content my-3 my-md-5">
				<div class="side-app">

                <DashTitle title={"Lazy Portfolios"} titleTwo={"General"} />

                <General />

                {portfolios}

                </div>
            </div>
        )
    }
}

export default LazyPortfolios;