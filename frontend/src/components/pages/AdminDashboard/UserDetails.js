import React from 'react'

const UserDetails = (props) =>
{
    console.log(props)
    return (
        <div>
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                    {props.userDetails.name==null ? <p>--</p>:
                    <p className="text-muted mb-0">{props.userDetails.name}</p>}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                {props.userDetails.email==null ? <p>--</p>:
                    <p className="text-muted mb-0">{props.userDetails.email}</p>}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                {props.userDetails.phone==null ? <p>--</p>:
                    <p className="text-muted mb-0">{props.userDetails.phone}</p>}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                </div>
                <div className="col-sm-9">
                {props.userDetails.mobile==null ? <p>--</p>:
                    <p className="text-muted mb-0">{props.userDetails.mobile}</p>}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                    <p className="text-muted mb-0">Bay Ahemdabad-Gujarat, India</p>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;

