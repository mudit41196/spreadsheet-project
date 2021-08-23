import React, {useState, useEffect} from "react";

function useChangeText(cellData) {
  const [text, changeText] = useState(cellData);
  useEffect(() => {
    changeText(cellData);
  }, [cellData]);
  return [text, changeText];
}


