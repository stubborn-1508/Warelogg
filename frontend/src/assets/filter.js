import React from "react";
import { FcSearch } from "react-icons/fc";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { FaMap } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
// import Context from "../Contexts/context";
import { BiSearchAlt, BiRightArrow } from "react-icons/bi"
import { GiLockedChest, GiCargoShip, GiGears } from "react-icons/gi"
import { FaTruckMoving, FaMapMarkerAlt, FaBoxes, FaWarehouse } from "react-icons/fa";
import { BsCloudSunFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi"
import { TbSunOff } from "react-icons/tb"
import { IoSnow } from "react-icons/io"
import {
    GiTruck,
    GiHandTruck,
    GiCctvCamera,
    GiElevator,
    GiMovementSensor,
    GiCube,
} from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
import { Ri24HoursFill, RiVideoDownloadLine } from "react-icons/ri";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FaFireExtinguisher, FaTruckLoading, FaUpload } from "react-icons/fa";
import { CiVault } from "react-icons/ci";
import { BiRectangle } from "react-icons/bi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"
import Icon from '@mdi/react';
import { mdiForklift, mdiHours24, mdiShieldCheck, mdiAirport, mdiStarCheckOutline, mdiAccountHardHat, mdiSnowflakeThermometer, mdiFireExtinguisher, mdiDolly } from '@mdi/js';
import { IconContext } from "react-icons/lib";

const width = window.screen.width

const filterData = [
    {
        code: 0,
        name: "CCTV Monitoring",
        icon: <GiCctvCamera />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <GiCctvCamera />
        </IconContext.Provider>,
        partner_icon: <GiCctvCamera
        style={{
          color: "rgb(255 5 5 / 93%)",
          height: "1.25rem",
          width: "1.25rem",
        }}
      />,
    },
    {
        code: 1,
        name: "Climate Control",
        icon: <BsCloudSunFill />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <BsCloudSunFill />
        </IconContext.Provider>,
        partner_icon: <BsFillCloudSunFill
        style={{
          color: "#0dcefdb0",
          height: "1.25rem",
          width: "1.25rem",
        }}
      />,
    },
    {
        code: 2,
        name: "Outdoor Storage",
        icon: <FaBoxes />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <FaBoxes />
        </IconContext.Provider>,
        partner_icon: <GiTruck
        style={{
          color: "rgb(255 93 5 / 80%)",
          height: "1.25rem",
          width: "1.25rem",
        }}
      />,
    },
    {
        code: 3,
        name: "Indoor Storage",
        icon: <FaWarehouse />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <FaWarehouse />
        </IconContext.Provider>,
        partner_icon: <GiHandTruck
        style={{
          color: "#ffb905",
          height: "1.25rem",
          width: "1.25rem",
        }}
      />,
    },
    {
        code: 4,
        name: "Cold Storage",
        icon: <Icon path={mdiSnowflakeThermometer} size={1.3} />,
        on_icon: <Icon path={mdiSnowflakeThermometer} size={1.35} color="#ff6600" />,
        partner_icon: <Icon path={mdiSnowflakeThermometer} style={{
            color: "#8BF5FA",
            height: "1.25rem",
            width: "1.25rem",
          }}  />,
    },
    {
        code: 5,
        name: "Free Loading",
        icon: <Icon path={mdiDolly} size={1.3} />,
        on_icon: <Icon path={mdiDolly} size={1.35} color="#ff6600" />,
        partner_icon: <Icon path={mdiDolly} style={{
            color: "#F0A04B",
            height: "1.25rem",
            width: "1.25rem",
          }} />,
    },
    {
        code: 6,
        name: "Fire Safety",
        icon: <Icon path={mdiFireExtinguisher} size={1.3} />,
        on_icon: <Icon path={mdiFireExtinguisher} size={1.35} color="#ff6600" />,
        partner_icon: <FaFireExtinguisher
        style={{
          color: "red",
          height: "1.25rem",
          width: "1.25rem",
        }}
      />,
    },
    {
        code: 7,
        name: "24-Hours",
        icon: <Icon path={mdiHours24} size={1.3} />,
        on_icon: <Icon path={mdiHours24} size={1.35} color="#ff6600" />,
        partner_icon: <Ri24HoursFill
        style={{
          color: "black",
          height: "1.25rem",
          width: "1.25rem",
        }}
      />,
    },
    {
        code: 8,
        name: "Insurance",
        icon: <Icon path={mdiShieldCheck} size={1.3} />,
        on_icon: <Icon path={mdiShieldCheck} size={1.35} color="#ff6600" />,
        partner_icon: <Icon path={mdiShieldCheck} style={{
            color: "#CDE990",
            height: "1.25rem",
            width: "1.25rem",
        }} />,
    },
    {
        code: 9,
        name: "Near Airport",
        icon: <Icon path={mdiAirport} size={1.3} />,
        on_icon: <Icon path={mdiAirport} size={1.35} color="#ff6600" />,
        partner_icon: <Icon path={mdiAirport} style={{
            color: "#E3DFFD",
            height: "1.25rem",
            width: "1.25rem",
        }} />,
    },
    {
        code: 10,
        name: "Near Seaport",
        icon: <GiCargoShip />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <GiCargoShip />
        </IconContext.Provider>,
        partner_icon: <GiCargoShip style={{
            color: "#3F979B",
            height: "1.25rem",
            width: "1.25rem",
        }} />,
    },
    {
        code: 11,
        name: "Quality Control",
        icon: <Icon path={mdiStarCheckOutline} size={1.3} />,
        on_icon: <Icon path={mdiStarCheckOutline} size={1.3} color="#ff6600" />,
        partner_icon: <Icon path={mdiStarCheckOutline} style={{
            color: "#F9F54B",
            height: "1.25rem",
            width: "1.25rem",
          }} />,
    },
    {
        code: 12,
        name: "UV Protection",
        icon: <TbSunOff />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <TbSunOff />
        </IconContext.Provider>,
        partner_icon: <TbSunOff style={{
            color: "voilet",
            height: "1.25rem",
            width: "1.25rem",
          }}/>,
    },
    {
        code: 13,
        name: "Truck Drive-In",
        icon: <FaTruckMoving />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <FaTruckMoving />
        </IconContext.Provider>,
        partner_icon: <FaTruckLoading
        style={{
          color: "rgb(255 93 5 / 80%)",
          height: "1.25rem",
          width: "1.25rem",
        }}
      />,
    },
    {
        code: 14,
        name: "Free Labour",
        icon: <Icon path={mdiAccountHardHat} size={1.3} />,
        on_icon: <Icon path={mdiAccountHardHat} size={1.35} color="#ff6600" />,
        partner_icon: <Icon path={mdiAccountHardHat} style={{
            color: "grey",
            height: "1.25rem",
            width: "1.25rem",
        }} />,
    },
    {
        code: 15,
        name: "Automated",
        icon: <GiGears />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <GiGears />
        </IconContext.Provider>,
        partner_icon: <GiGears style={{
            color: "black",
            height: "1.25rem",
            width: "1.25rem",
        }} />,
    }
];

export default filterData;