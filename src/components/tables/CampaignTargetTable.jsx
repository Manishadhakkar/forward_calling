import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import "./styles.css";

const CustomTargetTbl = (props) => {
  const { targetColumn, data } = props;

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
    const rowData = row.original;
    for (const key in values) {
      if (rowData.hasOwnProperty(key)) {
        rowData[key] = values[key];
      }
    }
    tableData[row.index] = rowData;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <>
      <MaterialReactTable
        enableBottomToolbar={true}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
          },
        }}
        initialState={{ density: "compact", showGlobalFilter: true }}
        positionGlobalFilter="left"
        muiSearchTextFieldProps={{
          placeholder: `Search...`,
          sx: { minWidth: "50px" },
          variant: "standard",
        }}
        enableEditing
        enableColumnFilters={false}
        enableColumnActions={false}
        enableFullScreenToggle={false}
        enableStickyHeader={true}
        enableGlobalFilterModes
        enableDensityToggle={false}
        enableToolbarInternalActions={false}
        enableFilterMatchHighlighting={true}
        enableColumnFilterModes={false}
        columns={targetColumn}
        data={tableData}
        editingMode="row"
        enableRowActions
        enableTopToolbar={true}
        enableSorting={false}
        enableColumnOrdering={false}
        muiEditTextFieldProps={{ variant: "outlined" }}
        positionActionsColumn="last"
        onEditingRowSave={handleSaveRow}
      />
    </>
  );
};

export default CustomTargetTbl;
