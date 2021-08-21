import React from "react";
import "../../styles/common/ContextMenu.css";

function ContextMenu ({x, y, contextMenu, onAction}) {
  return (
    <div className="menu" style={{top: y, left: x}}>
      {contextMenu.map(ele => {
        return (
          <div className="menuElement" key={ele} onClick={() => onAction(ele)}>
            {ele}
          </div>
        );
      })}
    </div>
  );
}
export default ContextMenu;