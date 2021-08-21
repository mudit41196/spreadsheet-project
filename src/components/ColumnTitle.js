import React, {Component} from "react";
import {convertColumnTitle} from "../utils/utils";
import "../styles/Column.css";

class ColumnTitle extends Component {
  constructor(props) {
    super(props);
    this.column_context_menu = [
      {
        title: "Add column left",
        onClick: this.handleAddLeft
      },
      {
        title: "Add column right",
        onClick: this.handleAddRight
      }
    ]
  }
  render() {
    const {colIndex} = this.props;
    return (
      <div className="columnBox button" id={`columnTitle-${colIndex}`}>
        {convertColumnTitle(colIndex+1)}
      </div>
    );
  }
}

export default ColumnTitle;