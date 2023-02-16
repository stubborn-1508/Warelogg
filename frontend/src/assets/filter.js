import React from "react";
import { FcSearch } from "react-icons/fc";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { FaMap } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
// import Context from "../Contexts/context";
import { BiSearchAlt, BiRightArrow } from "react-icons/bi"
import { GiCctvCamera, GiLockedChest, GiCargoShip, GiGears } from "react-icons/gi"
import { FaTruckMoving, FaMapMarkerAlt, FaBoxes, FaWarehouse } from "react-icons/fa";
import { BsCloudSunFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi"
import { TbSunOff } from "react-icons/tb"
import { IoSnow } from "react-icons/io"
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
        </IconContext.Provider>
    },
    {
        code: 1,
        name: "Climate Control",
        icon: <BsCloudSunFill />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <BsCloudSunFill />
        </IconContext.Provider>
    },
    {
        code: 2,
        name: "Outdoor Storage",
        icon: <FaBoxes />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <FaBoxes />
        </IconContext.Provider>
    },
    {
        code: 3,
        name: "Indoor Storage",
        icon: <FaWarehouse />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <FaWarehouse />
        </IconContext.Provider>
    },
    {
        code: 4,
        name: "Cold Storage",
        icon: <Icon path={mdiSnowflakeThermometer} size={1.3} />,
        on_icon: <Icon path={mdiSnowflakeThermometer} size={1.35} color="#ff6600" />
    },
    {
        code: 5,
        name: "Free Loading",
        icon: <Icon path={mdiDolly} size={1.3} />,
        on_icon: <Icon path={mdiDolly} size={1.35} color="#ff6600" />
    },
    {
        code: 6,
        name: "Fire Safety",
        icon: <Icon path={mdiFireExtinguisher} size={1.3} />,
        on_icon: <Icon path={mdiFireExtinguisher} size={1.35} color="#ff6600" />
    },
    {
        code: 7,
        name: "24-Hours",
        icon: <Icon path={mdiHours24} size={1.3} />,
        on_icon: <Icon path={mdiHours24} size={1.35} color="#ff6600" />
    },
    {
        code: 8,
        name: "Insurance",
        icon: <Icon path={mdiShieldCheck} size={1.3} />,
        on_icon: <Icon path={mdiShieldCheck} size={1.35} color="#ff6600" />
    },
    {
        code: 9,
        name: "Near Airport",
        icon: <Icon path={mdiAirport} size={1.3} />,
        on_icon: <Icon path={mdiAirport} size={1.35} color="#ff6600" />
    },
    {
        code: 10,
        name: "Near Seaport",
        icon: <GiCargoShip />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <GiCargoShip />
        </IconContext.Provider>
    },
    {
        code: 11,
        name: "Quality Control",
        icon: <Icon path={mdiStarCheckOutline} size={1.3} />,
        on_icon: <Icon path={mdiStarCheckOutline} size={1.3} color="#ff6600" />
    },
    {
        code: 12,
        name: "UV Protection",
        icon: <TbSunOff />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <TbSunOff />
        </IconContext.Provider>
    },
    {
        code: 13,
        name: "Truck Drive-In",
        icon: <FaTruckMoving />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <FaTruckMoving />
        </IconContext.Provider>
    },
    {
        code: 14,
        name: "Free Labour",
        icon: <Icon path={mdiAccountHardHat} size={1.3} />,
        on_icon: <Icon path={mdiAccountHardHat} size={1.35} color="#ff6600" />
    },
    {
        code: 15,
        name: "Automated",
        icon: <GiGears />,
        on_icon: <IconContext.Provider
            value={{ color: '#ff6600' }}
        >
            <GiGears />
        </IconContext.Provider>
    }
];

export default filterData;