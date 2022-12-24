import React, {useState, useContext, useEffect} from "react";
import { Container, Row, Col, Form, Button, InputGroup,Offcanvas,
	Card,
	Badge, } from "react-bootstrap";
import { Context } from "../../../Contexts/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyCardSection from "../../pages/Cards/myCard";



const AllListedSpace = () => {
    const navigate = useNavigate();
    const usertoken = localStorage.getItem("token");
    const [warehouseInfo, setWarehouseInfo] = useState(null);

    const mapping_feature = {
        'cctv' : 'CCTV Survillance',
        'indoor': 'Indoor Storage',
        'outdoor': 'Outdoor Storage',
        'climate': 'Climate Control'
    }

    const fetchData = async (usertoken) => {
        try {
            let res = await axios.get("/getAllUsers", {
                headers: { "x-auth-token": usertoken },
            });
            const user_id = res.data.user_id;
            console.log(user_id);

            res = await axios.post("/getAllMyWareHouses", {data: user_id});
            console.log(res.data);

            res = res.data;
            let finalArr = [];
            res.forEach((ele) => {
                let tempObj = {};
                tempObj['name'] = ele.name;
                tempObj['location'] = ele.businessAddress + ', ' + ele.city;
                let tempStr = '';
                ele.features.forEach(e => {
                    tempStr = tempStr + mapping_feature[e] + ', ';
                });
                tempObj['facility'] = tempStr;
                tempObj['size'] = ele.length+'x'+ele.width+'x'+ele.height;
                tempObj['rating'] = '2.5'
                tempObj['price'] = '1000'
                tempObj['percentage'] = '33'
                tempObj['area'] = '100'
                tempObj['totalArea'] = '1000'
                finalArr.push(tempObj);
            });

            setWarehouseInfo(finalArr);

        } catch (err) {
            console.log("Error in fetching data" + err);
        }
    };


    useEffect(() => {
        const usertoken = localStorage.getItem("token");
        if (!usertoken) {
            navigate("/login");
        }else{
            fetchData(usertoken);
        }
    }, []);

    if(warehouseInfo==null){
        return (
            <>
            <h2>Please Wait.....</h2>
            </>
        );
    }else{
        return (
            <>
                <div style={{textAlign:"center"}}>
                    <h1>My Warehouses</h1>
                </div>
                <Container>
                    <Row>
                    <Col lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
                            <Col md={ 12 } className="my-5">
                                <MyCardSection warehouseInfo={warehouseInfo}></MyCardSection>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </>
    
        );
    }
}


export default AllListedSpace;