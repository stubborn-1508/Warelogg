import React from 'react'
import "./Refund.css"
import { useNavigate } from 'react-router-dom'


const Message = () =>
{
        const Navigate=useNavigate()
    return (
        <div className="message-box">
                <div className='refund-box shadow p-3 bg-white rounded'>
                <h4>
                        Your cancellation request will be processed in 3 business days
                </h4>
                <div>
                        <button className='btn btn-danger' onClick={()=>{Navigate('/')}}><span style={{fontSize: '1.5rem'}}>Home</span></button>
                </div>
        </div>
        </div>
    )
}

export default Message
