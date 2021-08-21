import React, {Component} from "react";
import Cell from "./Cell";
import ColumnTitle from "./ColumnTitle";
import "../styles/Column.css";

class Column extends Component {
  render() {
    const {colIndex, rows, columnData, handleDataChange, selection, handleAlterSelection} = this.props;
    const cells = [];
    const {row, column, x, y} = selection
    for(let i=0; i<rows; i++) {
      cells.push(
      <Cell
        key={`${colIndex}-${i}`}
        cellData={columnData[i] || ""}
        colIndex={colIndex}
        rowIndex={i}
        handleDataChange={handleDataChange}
        isSelected={(i>=row && i<=row +y) && (colIndex >= column && colIndex <= column + x)}
        handleAlterSelection={handleAlterSelection}
      />)
    }
    return (
      <div className="columnContainer">
        <div className="column"> 
          <ColumnTitle colIndex={colIndex} />
          {cells}
        </div>
      </div>
    );
  }
}

export default Column;