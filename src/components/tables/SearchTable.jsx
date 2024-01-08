import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Edit2, Trash } from "iconsax-react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    borderBottom: "none",
  },
  "&:last-child td, &:last-child th": {
    borderBottom: "none",
  },
}));

const StatusCell = ({ rowData, dataKey, ...props }) => {
  return (
    <TableCell {...props} className="link-group">
      <Chip
        label={rowData[dataKey] === 1 ? "Active" : "Inactive"}
        sx={{
          backgroundColor: rowData[dataKey] === 1 ? "#61F15557" : "#F1555557",
          color: rowData[dataKey] === 1 ? "#61F155" : "#F15555",
        }}
      />
    </TableCell>
  );
};

const ActionCell = ({
  rowData,
  dataKey,
  handleChangeActiveStatus,
  handleChangeEdit,
  handleChangeDelete,
  isUpdate,
  isStatus,
  isDelete,
  ...props
}) => {
  function handleActionEdit() {
    handleChangeEdit(rowData[dataKey]);
  }
  const handleChangeStatus = () => {
    let status = rowData[dataKey];
    handleChangeActiveStatus(status, rowData.is_active);
  };

  const handleActionDelete = () => {
    handleChangeDelete(rowData[dataKey]);
  };

  return (
    <TableCell
      {...props}
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <div>
        {isUpdate && (
          <IconButton onClick={handleActionEdit}>
            <Tooltip title="Edit">
              <Edit2 size="22" color="#565e64" variant="Outline" />
            </Tooltip>
          </IconButton>
        )}
        {isStatus && (
          <Tooltip title="status">
            <FormControlLabel
              control={
                <Switch
                  checked={rowData.is_active === 1 ? true : false}
                  onChange={handleChangeStatus}
                />
              }
              label=""
            />
          </Tooltip>
        )}
        {isDelete && (
          <IconButton onClick={handleActionDelete}>
            <Tooltip title="Delete">
              <Trash size="20" color="rgb(123, 123, 123)" />
            </Tooltip>
          </IconButton>
        )}
      </div>
    </TableCell>
  );
};

const SearchTable = (props) => {
  const {
    mapableData,
    data,
    isUpdate,
    isStatus,
    handleChangeEdit,
    handleChangeActiveStatus,
    handleChangeDelete,
  } = props;

  const [rows, setRows] = React.useState(data);

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: "5px" }}>
        <Divider variant="middle" />
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
            }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <TableHead>
              <TableRow>
                {mapableData.map((item, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: 700,
                      padding: "18px !important",
                      borderBottom: "1px solid #E1E2E9",
                      borderTop: "1px solid #E1E2E9",
                    }}
                  >
                    {item.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows > 0 ? (
                rows.map((row) => {
                  return (
                    <StyledTableRow hover tabIndex={-1} key={row.id}>
                      {mapableData.map((item, index) => {
                        const value = row[item.dataKey];
                        console.log(value);
                        return item.hasOwnProperty("isStatus") ? (
                          <StatusCell
                            sx={{ padding: "10px 18px !important" }}
                            dataKey="is_active"
                            rowData={row}
                            key={index}
                          />
                        ) : item.hasOwnProperty("isAction") ? (
                          <ActionCell
                            key={item.dataKey}
                            isUpdate={isUpdate}
                            isStatus={isStatus}
                            isDelete={item.isDelete}
                            dataKey="id"
                            rowData={row}
                            handleChangeActiveStatus={handleChangeActiveStatus}
                            handleChangeEdit={handleChangeEdit}
                            handleChangeDelete={handleChangeDelete}
                          />
                        ) : (
                          <TableCell
                            sx={{ padding: "10px 18px !important" }}
                            key={item.dataKey}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SearchTable;
