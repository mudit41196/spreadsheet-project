import React, {Component} from "react";
import "../styles/RowNumbers.css";

class RowNumbers extends Component {
  render() {
    const {size} = this.props;
    const rowNumberArr = [];
    for(let i=0; i<size; i++) {
      rowNumberArr.push(
      <div key={i} className="rowNumberBox button" id={`rowTitle-${i}`}>
          {i+1}
      </div>)
    }
    return (
      <div className="rowNumberContainer">
        <div className="rowNumbercolumn">
          <div className="rowNumberBox">excel</div>
          {rowNumberArr}
        </div>
      </div>
    );
  }
}

export default RowNumbers;