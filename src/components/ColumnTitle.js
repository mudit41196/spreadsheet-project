import React from "react";
import {convertColumnTitle} from "../utils/utils";
import "../styles/Column.css";

function ColumnTitle({colIndex}) {
  return (
    <div className="columnBox button" id={`columnTitle-${colIndex}`}>
      {convertColumnTitle(colIndex+1)}
    </div>
  );
}

export default ColumnTitle;