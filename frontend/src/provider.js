import React, { useState } from 'react';

import PackageContext from "./Contexts/context";

const Provider = props =>
{
    const [ data, setData ] = useState({
        cart: 0,
        location: null,
        facalities: [],
    });

    const update = (param) => {
        for (let [key, value] of Object.entries(param)) {
            const tempData = data;
            tempData[key] = value;
            setData(tempData);
        }
    }

    return (
        <PackageContext.Provider
            value={ {
                data,
                update
            } }>
            { props.children }
        </PackageContext.Provider>
    );
};

export default Provider;
