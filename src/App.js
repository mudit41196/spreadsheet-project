import SpreadSheet from "./components/SpreadSheet";

const DEFAULT_COLUMNS = 25;
const DEFAULT_ROWS = 25;


function App() {
  return (
    <div className="App">
      <SpreadSheet rows={DEFAULT_ROWS} columns={DEFAULT_COLUMNS} />
    </div>
  );
}

export default App;
