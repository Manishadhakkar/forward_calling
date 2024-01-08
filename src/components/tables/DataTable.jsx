import React from "react";
import { Box, IconButton, Switch, Tooltip } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Delete } from "@mui/icons-material";
import { Edit2, Eye } from "iconsax-react";

const DataTable = (props) => {
  const {
    data,
    handleEditAction,
    handleChangeStatus,
    handleDeleteAction,
    column,
    isStatus,
    isDelete,
    isUpdate,
    handleViewAction,
  } = props;

  const handleChangeEdit = (row) => {
    handleEditAction(row.original);
  };

  const handleStatusChange = (row) => {
    handleChangeStatus(row.original);
  };

  const handleChangeDelete = (row) => {
    handleDeleteAction(row.original);
  };

  const handleViewData = (row) => {
    handleViewAction(row.original);
  };
  return (
    <div>
      <MaterialReactTable
        localization={{
          actions: "Action",
          noResultsFound: "No data found",
          noRecordsToDisplay: "No records found"
        }}

        enableFullScreenToggle={false}
        enableGlobalFilterModes={false}
        enableStickyHeader={true}
        positionActionsColumn={"last"}
        positionToolbarDropZone={"none"}
        columns={column}
        data={data}
        enableColumnOrdering={false}
        enableEditing
        enableHiding={false}
        enableDensityToggle={false}
        enablePagination={false}
        renderRowActions={({ row }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {isUpdate === true ? (
              <Tooltip
                key={row.original.id}
                arrow
                placement="right"
                title="Edit"
              >
                <IconButton onClick={() => handleChangeEdit(row)}>
                  <Edit2 size="22" color="#565e64" variant="Outline" />
                </IconButton>
              </Tooltip>
            ) : null}
            {isDelete === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="Delete"
              >
                <IconButton
                  color="error"
                  onClick={() => handleChangeDelete(row)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            ) : null}
            {isStatus === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="Status"
              >
                <Switch
                  checked={row.original.is_active === 1 ? true : false}
                  onChange={() => handleStatusChange(row)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Tooltip>
            ) : null}
          </Box>
        )}
      />
    </div>
  );
};

export default DataTable;
