import React from 'react'
import "./Refund.css"
import { BsFillCartXFill } from "react-icons/bs";
import { IconContext } from 'react-icons/lib';
import {  useNavigate } from 'react-router-dom';


const Refund = () =>
{
        const Navigate = useNavigate()
    return (
        <div className='Cancel '>
                <div className='refund-box shadow p-3 bg-white rounded'>
                <IconContext.Provider
                        value={{ color: '#ff6600', size: '75px'}}
    >
                        <div>
                                <BsFillCartXFill/>
                        </div>
                </IconContext.Provider>
                <div className='refund-text'>
                        <h3>Are you sure you want to send a cancellation request?</h3>
                        <h5>Your request will be sent to our team.</h5>
                </div>
                <div>
                        <textarea   cols={70} rows={4} class="tag form-control reason" placeholder="What made you cancel?"/>
                </div>
                <div>
                        <button className='btn btn-danger' onClick={()=>{Navigate('/message')}}><span style={{fontSize: '1.2rem'}}>Proceed</span></button>
                </div>
                </div>
                


                
        </div>
    )
}

export default Refund
