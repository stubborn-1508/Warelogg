import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StorageUnitTab from "./StorageTab.js";
import ShippingTab from "./ShippingTab.js";
import "./tabX.css";

const TabX = () =>
{
  return (
    <Tabs
      defaultActiveKey="storage"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab className="" eventKey="storage" title="Storage">
        <StorageUnitTab />
      </Tab>
      <Tab eventKey="shipping" title="Shipping">
        <ShippingTab />
      </Tab>
    </Tabs>
  );
};

export default TabX;
