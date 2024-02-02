import React, { useEffect, useState } from "react";
import "./styles.css";

import { Drawer, ButtonToolbar, Button, Placeholder } from "rsuite";
import { totalAccDataReq } from "../layout/navBar/logout.request";

const TopDrawer = ({ isOpen, setIsOpen }) => {

const [isLoader, setIsLoader] = useState(false);

    useEffect(()=>{
        setIsLoader(true);
        totalAccDataReq()
        .then((res)=>{
            setIsLoader(false);
            console.log("Res", res)
        })
        .catch((err)=>{
            setIsLoader(false);
            console.log(err)
        })
    },[]);

  return (
    <>

      <Drawer
        size={"xs"}
        placement={"top"}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        
      >
        <Drawer.Header>
          <Drawer.Title>Switch Account</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsOpen(false)} appearance="primary">
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          {/* <Placeholder.Paragraph rows={8} /> */}
          <div>hiii</div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default TopDrawer;
