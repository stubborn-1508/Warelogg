import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./tabX.css";
import { Link } from "react-router-dom";
import Context from "../../../Contexts/context";
import { AiOutlineSearch } from "react-icons/ai";

const StorageTab = () =>
{
  var x = document.getElementById("demo");
  const ctx = useContext(Context);

  const facVal = [ 'cctv', 'indoor', 'outdoor', 'climate' ];

  const [ fac, setFac ] = useState({
    c1: false,
    c2: false,
    c3: false,
    c4: false
  });

  const handleCheckChange = (e) =>
  {
    const id = e.target.id;
    let val = fac[ id ];
    val = !val;
    setFac({ ...fac, [ id ]: val });
  }

  function getLocation()
  {
    const arr = [];
    for (let i = 1; i <= 4; i++)
    {
      const str = "c" + i.toString();
      if (fac[ str ])
      {
        arr.push(facVal[ i - 1 ]);
      }
    }
    const param1 = {
      "location": locationInput,
      "facalities": arr
    }
    ctx.update(param1);

    function showPosition(position)
    {
      x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    }

    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else
    {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  const [ locationInput, setLocationInput ] = useState("");

  const handleInputChange = (event) =>
  {
    setLocationInput(event.target.value);
  }

  return (
    <div className="nextPageTab">
      {/* <div className="nextPageTabItem1"><div>Search by Location </div></div> */}
      <Form className="nextPageTabItem2">
        <Form.Group controlId="formBasicEmail" className="landmarkForm">
          <Form.Control
            type="text"
            placeholder="Zip, City, State or Landmark"
            name="fLocation"
            onChange={ handleInputChange }
            />
        </Form.Group>
      </Form>
      <Link to="/storage" className="nextPageTabItem3">
        <button className="button-360" onClick={ getLocation } type="submit">
          Find Storage Units
          {/* <i style={{marginLeft:"0.4rem"}}>< AiOutlineSearch/></i> */}
        </button>
      </Link>
      {/* <Form.Group className="mb-3 d-grid gap-2 text-center text-dark" controlId="formBasicCheckbox">
        <Form.Label className="col-md-12"><b>Show Locations That Have :</b></Form.Label>
        <Form.Check
          id="c1"
          className="checkX"
          inline
          label="CCTV surveillance"
          name="checkType"
          type="checkbox"
          onChange={ handleCheckChange }
          />
          <Form.Check
          id="c2"
          className="checkX"
          inline
          label="Indoor Storage"
          name="checkType"
          type="checkbox"
          onChange={ handleCheckChange }
          />
          <Form.Check
          id="c3"
          className="checkX"
          inline
          label="Outdoor/Drive Up"
          name="checkType"
          type="checkbox"
          onChange={ handleCheckChange }
          />
          <Form.Check
          id="c4"
          className="checkX"
          inline
          label="Climate Control"
          name="checkType"
          type="checkbox"
          onChange={ handleCheckChange }
          />
        </Form.Group> */}
    </div>
  );
};

export default StorageTab;
