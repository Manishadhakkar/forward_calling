import React, { useEffect, useState } from "react";
import { Table, Button } from "rsuite";
import "./styles.css";

import { convertIvrArray } from "../../../../utility/utilty";
import { FormModal as Modal } from "../../../../components/modal/FormModal";
import AssignIvrForm from "../../../../components/form/campaignForm/AssignIvr";

const fakeData = [
  { id: 1, destination: "Targets", value: 10, parentValue: null },
  { id: 2, destination: "Targets", value: 11, parentValue: null },
  { id: 3, destination: "IVR", value: 12, parentValue: null },
  { id: 4, destination: "Targets", value: 13, parentValue: 3 },
  { id: 5, destination: "Targets", value: 14, parentValue: 3 },
  { id: 6, destination: "Targets", value: 15, parentValue: null },
  { id: 7, destination: "IVR", value: 16, parentValue: 6 },
  { id: 8, destination: "IVR", value: 17, parentValue: 7 },
  { id: 9, destination: "IVR", value: 18, parentValue: 8 },
  { id: 10, destination: "IVR", value: 19, parentValue: null },
  { id: 11, destination: "IVR", value: 20, parentValue: null },
];

const { Column, HeaderCell, Cell } = Table;

const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData.id);
        }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
    </Cell>
  );
};

const LiveCalls = () => {
  const [rows, setRows] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState();

  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleSelectBtn = (btn) => {
    setClickedBtn(btn);
  };

  useEffect(() => {
    const query = ["id", "destination", "value", "parentValue"];
    setRows(convertIvrArray(fakeData, query));
  }, [fakeData]);

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], rows);
    nextData.find((item) => item.id === id)[key] = value;
    setRows(nextData);
  };
  const handleEditState = (id) => {
    setClickedBtn("edit");
    setCurrentType(id);
    setIsOpen(true);
    // const nextData = Object.assign([], rows);
    // const activeItem = nextData.find((item) => item.id === id);
    // activeItem.status = activeItem.status ? null : "EDIT";
    // setRows(nextData);
  };

  const selectModal = () => {
    return <AssignIvrForm />;
  };

  return (
    <>
      <Modal modal_width={"50%"} isOpen={isOpen}>
        {selectModal()}
      </Modal>

      <Table
        isTree
        defaultExpandAllRows
        bordered
        cellBordered
        rowKey="value"
        height={400}
        data={rows}
        shouldUpdateScroll={false}
        renderTreeToggle={(icon, rowData) => {
          if (rowData.children && rowData.children.length === 0) {
            return;
          }
          return icon;
        }}
      >
        {rows.length > 0 ? (
          <>
            <Column width={150}>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="destination" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>...</HeaderCell>
              <ActionCell dataKey="id" onClick={handleEditState} />
            </Column>
          </>
        ) : null}
      </Table>
    </>
  );
};

export default LiveCalls;
