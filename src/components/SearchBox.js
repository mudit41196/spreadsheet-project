import React, {useState} from "react";
import "../styles/SearchBox.css";

function SearchBox({handleSearch}) {
  const [text, setText] = useState("");
  const handleTextChange = (e) => {
    setText(e.target.value);
  }
  return (
    <div className="SearchBox">
      <input type="search" value={text} onChange={handleTextChange} />
      <button onClick={() => handleSearch(text)}>Search</button>
    </div>
  );
}

export default SearchBox;