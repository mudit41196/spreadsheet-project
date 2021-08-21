import React, {useEffect, useState} from "react";
import "../styles/Column.css";

function Cell ({cellData, rowIndex, colIndex, handleDataChange, isSelected, handleAlterSelection}) {
  const [text, changeText] = useState(cellData);
  useEffect(() => {
    changeText(cellData);
  }, [cellData]);

  const handleInputChange = (e) => {
    const {value} = e.target;
    changeText(value);
  }

  const handleBlur = () => {
    if(text !== cellData) {
      handleDataChange(colIndex, rowIndex, text);
    }
  }

  const handleOnClick = () => {
    handleAlterSelection({row: rowIndex, column: colIndex, x: 0, y: 0});
  }

  return (
    <div className="columnBox">
      <input type="text"
        className={`inputCell ${isSelected ? "highlightCell" : ""}`}
        value={text}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onClick={handleOnClick}
      />
    </div>
  );
}

export default Cell;