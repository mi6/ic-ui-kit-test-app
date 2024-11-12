import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";

import "@ukic/web-components/dist/core/ag-theme-icds.css";

// Create new GridExample component
const Home = () => {
  // Row Data: The data to be displayed.
  const rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ];

  // Column Definitions: Defines & controls grid columns.
  const colDefs = [{ field: "make" },
  { field: "model", headerTooltip: "Tooltip for Model column header" },
  { field: "price" },
  { field: "electric" },
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    editable: true,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={
        "ag-theme-icds"
      }
      style={{ width: "100%", height: "600px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
      />
    </div>
  );
};

export default Home;
