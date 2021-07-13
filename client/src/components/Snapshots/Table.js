import React, { Component } from "react";
import { connect } from "react-redux";
import saveSnapshot from "../../actions/saveSnapshot";
import { mapCoreAssets } from "../../utils/tableFormatUtils";
import TableRow from "./TableRow";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshotTitle: "",
      date: "",
      notes: "",
    };
    this.createSnapshot = this.createSnapshot.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  createSnapshot(e) {
    e.preventDefault();

    fetch("/saveSnapshot", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user: this.props.user,
        benchmarkName: this.props.benchmarkName,
        snapshotName: this.state.snapshotTitle,
        coreAssets: this.props.coreAssets,
        benchmarkTitles: this.props.benchmarkTitles,
        date: this.state.date,
        notes: this.state.notes,
      }),
    });

    this.setState({ snapshotTitle: "", date: "", notes: "" });
    this.props.onSaveSnapshot();
  }

  updateDate(e) {
    this.setState({ date: e.target.value });
  }

  updateNotes(e) {
    this.setState({ notes: e.target.value });
  }

  updateTitle(e) {
    this.setState({ snapshotTitle: e.target.value });
  }

  render() {
    const { coreAssets, benchmarkTitles } = this.props;
    const headers = this.props.benchmarkTitles.map((title) => {
      return <th class="wd-10p">{title} ($)</th>;
    });
    const rows = mapCoreAssets(coreAssets, benchmarkTitles).map((assets) => {
      return <TableRow accountInfo={assets} />;
    });

    return (
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <form onSubmit={this.createSnapshot}>
            <div class="card">
              <div class="card-status bg-yellow br-tr-3 br-tl-3"></div>
              <div class="row">
                {/* Title */}
                <div class="col-md-7 col-lg-7">
                  <div class="card-header">
                    <input
                      type="text"
                      class="form-control"
                      name="example-text-input"
                      placeholder="Snapshot Title Goes Here"
                      value={this.state.snapshotTitle}
                      onChange={this.updateTitle}
                      required
                    ></input>
                  </div>
                </div>

                {/* Date */}
                <div class="col-md-5 col-lg-5">
                  <div class="card-header">
                    <input
                      type="date"
                      class="form-control fc-datepicker"
                      value={this.state.date}
                      onChange={this.updateDate}
                      placeholder="Date"
                      required
                    ></input>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div class="table-responsive">
                  <table
                    id="example"
                    class="table table-striped table-bordered"
                    style={{ width: "100%", "border-top": "1px solid grey" }}
                  >
                    <thead>
                      <tr>
                        <th class="wd-10p">Location</th>
                        <th class="wd-10p">Type</th>
                        {headers}
                        <th class="wd-10p">Other ($)</th>
                        <th class="wd-10p">Total ($)</th>
                        <th class="wd-10p"></th>
                      </tr>
                    </thead>

                    <tbody>{rows}</tbody>
                  </table>

                  <br></br>

                  <div class="form-group">
                    <label class="form-label">Notes</label>
                    <textarea
                      class="form-control"
                      name="example-textarea-input"
                      rows="2"
                      placeholder="Enter notes here"
                      value={this.state.notes}
                      onChange={this.updateNotes}
                    ></textarea>
                  </div>

                  <br></br>

                  <button type="submit" class="btn btn-primary ml-auto">
                    Save Snapshot
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// Map to Global State
function mapStateToProps(state) {
  return {
    user: state.portfolioReducer.user,
    coreAssets: state.portfolioReducer.coreAssets,
    benchmarkTitles: state.portfolioReducer.benchmarkTitles,
    benchmarkName: state.portfolioReducer.benchmarkName,
  };
}

// Map Actions
function mapDispatchToProps(dispatch) {
  return {
    onSaveSnapshot: () => dispatch(saveSnapshot()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
