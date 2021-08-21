import React, {Component} from "react";
import RowNumbers from "./RowNumbers";
import Column from "./Column";
import ContextMenu from "./common/ContextMenu";
import TotalSum from "./TotalSum";
import {convertColumnTitle, compareObjectEntryAsc, compareObjectEntryDesc} from "../utils/utils";
import "../styles/SpreadSheet.css";

const CONTEXT_MENU_TYPES = {
  rowTitle: ["Add Row Top", "Add Row Bottom"],
  columnTitle: ["Add Column Left", "Add Column Right", "Sort Col Asc", "Sort Col Desc"]
}

class SpreadSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      rows: props.rows,
      columns: props.columns,
      x: 0,
      y: 0,
      contextVisible: false,
      contextMenu: [],
      contextRow: null,
      contextColumn: null,
      selection: {
        row: 0,
        column: 0,
        x: 0,
        y: 0
      }
    }
    this.getColumns = this.getColumns.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleContext = this.handleContext.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleContextActions = this.handleContextActions.bind(this);
    this.handleAlterSelection = this.handleAlterSelection.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("contextmenu", this.handleContext);
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("contextmenu", this.handleContext);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  /* EVENT HANDLER FUNCTIONS START HERE */

  handleKeyDown(e) {
    // e.preventDefault();
    const {selection} = this.state;
    const {shiftKey, key} = e;
    if(shiftKey && key === "ArrowRight") {
      this.setState({selection: {...selection, x: selection.x + 1}});
      return;
    }
    if(shiftKey && key === "ArrowDown") {
      this.setState({selection: {...selection, y: selection.y + 1}});
      return;
    }
    if(shiftKey && key === "ArrowLeft") {
      this.setState({selection: {...selection, x: Math.max(selection.x - 1, 0)}});
      return;
    }
    if(shiftKey && key === "ArrowUp") {
      this.setState({selection: {...selection, y: Math.max(selection.y - 1, 0)}});
      return;
    }
  }

  handleClick() {
    if(this.state.contextVisible) {
      this.setState({
        x:0,
        y: 0,
        contextVisible: false,
        contextMenu: [],
        contextRow: null,
        contextColumn: null
      });
    }
  }

  handleContext(e) {
    e.preventDefault();
    if(this.state.contextVisible) {
      this.setState({x: 0, y: 0, contextVisible: false, contextColumn: null, contextRow: null, contextMenu: []});
      return;
    }
    const {id} = e.target;
    const [titleType, index] = id.split("-");
    if(titleType === "rowTitle" || titleType === "columnTitle") {
      const clickX = e.clientX;
      const clickY = e.clientY;
      this.setState({
        x: clickX,
        y: clickY,
        contextVisible: true,
        contextRow: titleType === "rowTitle" ? Number(index) : null,
        contextColumn: titleType === "columnTitle" ? Number(index) : null,
        contextMenu: CONTEXT_MENU_TYPES[titleType]
      })
    }
  }

  /* EVENT HANDLER FUNCTIONS END HERE */


  /*HANDLING AND DISPLAYING DATA STARTS HERE */

  handleAlterSelection(selectionObj) {
    this.setState({selection: {...selectionObj}});
  }

  handleDataChange(column, row, text) {
    const {data} = this.state;
    const newData = {...data, [column]: {...data[column], [row]: text}};
    this.setState({data: newData});
  }
  

  getColumns() {
    const {columns, rows, data, selection} = this.state;
    const columnData = [];
    for(let i=0; i<columns; i++) {
      columnData.push(
        <Column
          key={`${data[convertColumnTitle(i+1)]}-${i}`}
          colIndex={i}
          rows={rows}
          columnData={data[i] || {}}
          handleDataChange={this.handleDataChange}
          selection={selection}
          handleAlterSelection={this.handleAlterSelection}
        />
      )
    }
    return columnData;
  }

  /*HANDLING AND DISPLAYING DATA ENDS HERE */


  /* CONTEXT MENU FUNCTIONS START HERE*/
  addColumnLeft() {
    const {contextColumn, columns, data} = this.state;
    setTimeout(() => {
      const newData = {...data};
      for(let i=columns; i>contextColumn; i--) {
        newData[i] = {...data[i-1]};
      }
      newData[contextColumn] = {};
      this.setState({columns: columns + 1, data: newData});
    }, 0)
  }

  addColumnRight() {
    const {contextColumn, columns, data} = this.state;
    setTimeout(() => {
      const newData = {...data};
      if(contextColumn === columns-1) {
        // if last column
        newData[contextColumn] = {}
      } else {
        for(let i=columns; i>contextColumn+1; i--) {
          newData[i] = {...data[i-1]};
        }
        newData[Number(contextColumn + 1)] = {};
      }
      this.setState({columns: columns + 1, data: newData});
    }, 0)
  }

  addRowTop() {
    const {contextRow, rows, columns, data} = this.state;
    setTimeout(() => {
      const newData = {...data};
      // change each cell
      for(let j=0; j<columns;j++) {
        newData[j] = {...data[j]} || {} // creating copy to avoid side effects, need empty object if no data added yet
        for(let i=rows;i>=contextRow;i--) {
          if(i === contextRow) {
            newData[j][i] = ""; //now i=contextRow after loop, set data for contextRow = empty
          } else {
            newData[j][i] = newData[j][i-1];
          }
        }
      }
      this.setState({rows: rows + 1, data: newData});
    }, 0);
  }

  addRowBottom() {
    const {contextRow, rows, columns, data} = this.state;
    setTimeout(() => {
      if(contextRow === rows -1) {
        // if last row, then simply update rowCount in state
        this.setState({rows: rows + 1});
        return;
      }
      const newData = {...data};
      for(let j=0;j<columns;j++) {
        newData[j] = {...data[j]} || {};
        for(let i=rows; i>=contextRow+1; i--) {
          if(i===contextRow + 1) {
            newData[j][i] = "";
          } else {
            newData[j][i] = newData[j][i-1];
          }
        }
      }
      this.setState({rows: rows + 1, data: newData});
    }, 0);
  }

  sortCol(sortFn) {
    // do object.entries & remove rows("") from column object
    // create new object from the result
    // store sorted form of object.enteries from step1
    // insert sorted form of object.enteries at step 3 in object at step 2 using Object.keys
    // update state
    const {contextColumn, data} = this.state;
    setTimeout(() => {
      const newData = {...data};
      const inputColumn = {...newData[contextColumn]};
      const updatedEnteries = Object.entries(inputColumn).filter(([key, value]) => {
        return value;
      });
      const updatedInputColumn = Object.fromEntries(updatedEnteries); // has 
      const sortedEnteries = updatedEnteries.sort(sortFn);
      Object.keys(updatedInputColumn).forEach((key, index) => {
        updatedInputColumn[key] = sortedEnteries[index][1];
      });
      newData[contextColumn] = updatedInputColumn;
      this.setState({data: newData});
    }, 0);
  }

  /* CONTEXT MENU FUNCTIONS END HERE */
  

  handleContextActions(action) {
    switch(action) {
      case "Add Column Left":
        this.addColumnLeft();
        break;
      case "Add Column Right":
        this.addColumnRight();
        break;
      case "Add Row Top":
        this.addRowTop();
        break;
      case "Add Row Bottom":
        this.addRowBottom();
        break;
      case "Sort Col Asc":
        this.sortCol(compareObjectEntryAsc); // implemented for String comparision as given in assignment
        break;
      case "Sort Col Desc":
        this.sortCol(compareObjectEntryDesc); // implemented for String comparision as given in assignment
        break;
      default:
        return null;
    }
  }

  render() {
    const {x, y, contextVisible, contextMenu, rows, selection, data} = this.state;
    return (
      <div className="spreadsheetContainer">
        <TotalSum selection={selection} data={data} />
        <RowNumbers size={rows}/>
        {this.getColumns()}
        {contextVisible && 
          <ContextMenu
            x={x}
            y={y}
            contextMenu={contextMenu}
            onAction={this.handleContextActions}
          />
        }
      </div>
    );
  }
}

export default SpreadSheet;