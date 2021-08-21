import React, {useMemo} from "react";
import "../styles/TotalSum.css";

function TotalSum({selection, data}) {
  const calcSum = (selection, data) => {
    let x = selection.x;
    const {column, row} = selection;
    let total = 0;
    while(x>=0) {
      const columnData = data[column + x] || {};
      let y = selection.y;
      while(y>=0) {
        const value = Number(columnData[row + y]);
        if(!isNaN(value)) {
          total += value;
        }
        y--;
      }
      x--;
    }
    return total;
  }
  const sumValue = useMemo(() => calcSum(selection, data), [selection, data]); // will calculate only when selection change
  return (
    <div className="totalContainer">
      Sum={sumValue}
    </div>
  );
}

export default TotalSum;
