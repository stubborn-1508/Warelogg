import React from 'react'
import "./Map.css";

const MapX = () =>
{
    return (
        <>
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe
                        title='Map'
                        className="gmap_iframe"
                        src="https://maps.google.com/maps?width=700&amp;height=500&amp;hl=en&amp;q=India &amp;t=&amp;z=5&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    />
                </div>
            </div>
        </>
    );
}
export default MapX;

