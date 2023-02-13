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
            let res = await axios.get("/getUser", {
                headers: { "x-auth-token": usertoken },
            });
            const user_id = res.data.user_id;
            if(!user_id){
                alert('User not found');
                navigate('/');
            }

            res = await axios.post("/getAllMyWareHouses", {data: user_id});
            if(res.status !== 200){
                alert('Error 404');
                navigate('/');
            }

            res = res.data;
            let finalArr = [];
            res.forEach((ele) => {
                let tempObj = {};
                tempObj['id'] = ele._id;
                console.log(tempObj['id'])
                tempObj['name'] = ele.name;
                tempObj['location'] = ele.businessAddress + ', ' + ele.city;
                let tempStr = '';
                ele.features.forEach(e => {
                    tempStr = tempStr + mapping_feature[e] + ', ';
                });
                tempObj['facility'] = tempStr;
                let tempStrL = 0;
                let tempStrW = 0;
                let tempStrH = 0;
                let tempStrSpaceOcc = 0;
                for(let i=0;i<ele.subUnits.length;i++){
                    tempStrL = tempStrL + parseInt(ele.subUnits[i].length)
                    tempStrW = tempStrW + parseInt(ele.subUnits[i].width)
                    tempStrH = tempStrH + parseInt(ele.subUnits[i].height)
                    tempStrSpaceOcc = tempStrSpaceOcc + parseInt(ele.subUnits[i].spaceOccupied);
                }
                tempObj['size'] = tempStrL+'x'+tempStrW+'x'+tempStrH;
                tempObj['area'] = parseInt(tempStrSpaceOcc)
                tempObj['totalArea'] = parseInt(tempStrL)*parseInt(tempStrW)
                if(ele.isVerified){
                    finalArr.push(tempObj);
                }
            });

            setWarehouseInfo(finalArr);

        } catch (err) {
            console.log("Error in fetching data" + err);
            alert('Error while fetching data');
            navigate('/');
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
                                {warehouseInfo.length == 0 ? (<><h4>-- Warehouses are sent to admin for verification --</h4></>): 
                                <MyCardSection warehouseInfo={warehouseInfo}></MyCardSection>}
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </>
    
        );
    }
}


export default AllListedSpace;