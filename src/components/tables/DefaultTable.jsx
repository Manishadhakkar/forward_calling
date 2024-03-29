import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { FaPersonCirclePlus } from "react-icons/fa6";
import {
  Box,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { alpha, styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { tokens } from "../../assets/color/theme";
import "./styles.css";
import {
  MdAssignmentInd,
  MdDeleteForever,
  MdDownload,
  MdOutlineSettingsBackupRestore,
  MdPhoneCallback,
  MdPhonePaused,
  MdRemoveRedEye,
} from "react-icons/md";

const DefaultTable = (props) => {
  const {
    data,
    column,
    handleEditAction,
    handleDeleteAction,
    handleStatusAction,
    handlePlayPause,
    handleAssignChangable,
    handleAssignBuyer,
    handleViewChange,
    handleDownloadClick,
    isEditable = false,
    isDeletable = false,
    isStatusChangable = false,
    isPlayPause = false,
    isAssignable = false,
    isView = false,
    isDownload = false,
    isEditing = true,
    isAssignBuyer = false,

  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const tableTheme = useMemo(
    () =>
      createTheme({
        components: {
          MuiTableCell: {
            styleOverrides: {
              body: {
                backgroundColor: "yellow"
              }
            }
          }
        },
        palette: {

          background: {
            default: colors.primary[300],
          },
          
          text: {
            primary: colors.grey[100],
            secondary: colors.grey[100]
          },
        },
      }),
    [theme]
  );

  const StatusSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.greenAccent[600],
      "&:hover": {
        backgroundColor: alpha(
          colors.greenAccent[600],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: colors.greenAccent[600],
    },
  }));

  const handleChangeStatus = (ele) => {
    handleStatusAction(ele);
  };
  const handleChangeEdit = (ele) => {
    handleEditAction(ele);
  };
  const handleChangeDelete = (ele) => {
    handleDeleteAction(ele);
  };

  const handleChangePlayPause = (ele) => {
    handlePlayPause(ele);
  };

  const handleChangeAssign = (ele) => {
    handleAssignChangable(ele);
  };

  const handleChangeAssignBuyer = (ele) =>{
    handleAssignBuyer(ele)
  }

  const handleChangeView = (ele) => {
    handleViewChange(ele);
  };

  const handleDownload = (ele) => {
    handleDownloadClick(ele);
  };

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        layoutMode="grid"
        enableBottomToolbar={false}
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
          sx: {
            minWidth: "50px",
          },
          variant: "standard",
        }}
        muiTableBodyProps={{
          sx: {
            background: `linear-gradient(to bottom, ${colors.primary[100]}, ${colors.primary[200]} )`,
          },
        }}
        enableEditing={isEditing}
        enableColumnFilters={false}
        enableColumnActions={false}
        enableFullScreenToggle={false}
        enableStickyHeader={true}
        enableGlobalFilterModes
        enableDensityToggle={false}
        enableToolbarInternalActions={false}
        enableFilterMatchHighlighting={true}
        enableColumnFilterModes={false}
        columns={column}
        data={data}
        enableColumnOrdering
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "0.2rem",
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
            {isPlayPause && (
              <Tooltip
                arrow
                placement="right"
                title={row.original.status === 1 ? "Pause" : "Play"}
              >
                <IconButton onClick={() => handleChangePlayPause(row.original)}>
                  {row.original.status === 1 ? (
                    <MdPhonePaused color={colors.grey[200]} />
                  ) : (
                    <MdPhoneCallback color={colors.grey[200]} />
                  )}
                </IconButton>
              </Tooltip>
            )}
            {isEditable && (
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => handleChangeEdit(row.original)}>
                  <Edit sx={{ color: colors.grey[100] }} />
                </IconButton>
              </Tooltip>
            )}
            {isDeletable && (
              <Tooltip
                arrow
                placement="top"
                title={row.original.deleted_at === null ? "Delete" : "Restore"}
              >
                <IconButton onClick={() => handleChangeDelete(row.original)}>
                  {row.original.deleted_at === null ? (
                    <MdDeleteForever color={colors.redAccent[500]} />
                  ) : (
                    <MdOutlineSettingsBackupRestore color={colors.blue[100]} />
                  )}
                </IconButton>
              </Tooltip>
            )}
            {isAssignable && (
              <Tooltip arrow placement="top" title={"Assign to"}>
                <IconButton onClick={() => handleChangeAssign(row.original)}>
                  <MdAssignmentInd />
                </IconButton>
              </Tooltip>
            )}
            {isAssignBuyer && (
              <Tooltip arrow placement="top" title={"Assign buyer"}>
                <IconButton onClick={() => handleChangeAssignBuyer(row.original)}>
                  <FaPersonCirclePlus color={colors.green[400]} />
                </IconButton>
              </Tooltip>
            )}
            {isView && (
              <Tooltip arrow placement="top" title="Vies">
                <IconButton onClick={() => handleChangeView(row.original)}>
                  <MdRemoveRedEye />
                </IconButton>
              </Tooltip>
            )}
            {isDownload && (
              <Tooltip arrow placement="top" title="Download">
                <IconButton onClick={() => handleDownload(row.original)}>
                  <MdDownload />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      />
    </ThemeProvider>
  );
};

export default DefaultTable;
