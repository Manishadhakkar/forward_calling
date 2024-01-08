import React, { useCallback, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import "./styles.css";
import { debounce } from "lodash";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { tokens } from "../../assets/color/theme";

const CustomTable = (props) => {
  const {
    data,
    column,
    handleEditAction,
    handleDeleteAction,
    handleStatusAction,
    handleSearchAction,
    isSearchable,
    isEditable,
    isDeletable,
    isStatusChangable,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const StatusSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.switchColor[100],
      "&:hover": {
        backgroundColor: alpha(
          colors.switchColor[100],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: colors.switchColor[100],
    },
  }));

  const handleChangeSearch = useCallback(
    (ele) => {
      if (isSearchable) {
        handleSearchAction(ele);
      }
    },
    [isSearchable, handleSearchAction]
  );

  const debouncedResults = useMemo(() => {
    return debounce(handleChangeSearch, 3000);
  }, [handleChangeSearch]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const handleChangeStatus = (ele) => {
    handleStatusAction(ele);
  };
  const handleChangeEdit = (ele) => {
    handleEditAction(ele);
  };
  const handleChangeDelete = (ele) => {
    handleDeleteAction(ele);
  };

  return (
    <MaterialReactTable
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
      onGlobalFilterChange={debouncedResults}
      enableDensityToggle={false}
      enableToolbarInternalActions={false}
      enableFilterMatchHighlighting={false}
      enableColumnFilterModes={false}
      columns={column}
      data={data}
      enableColumnOrdering
      positionActionsColumn="last"
      renderRowActions={({ row }) => (
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isStatusChangable && (
            <Tooltip arrow placement="left" title="Status">
              <IconButton
                disableRipple
                disableFocusRipple
                disableTouchRipple
                size="small"
              >
                <StatusSwitch
                  checked={row.original.status === 1 ? true : false}
                  size="small"
                  onChange={() => handleChangeStatus(row.original)}
                />
              </IconButton>
            </Tooltip>
          )}

          {isEditable && (
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => handleChangeEdit(row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
          )}
          {isDeletable && (
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleChangeDelete(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    />
  );
};

export default CustomTable;
