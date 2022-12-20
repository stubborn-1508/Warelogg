import React from 'react';
// import { CDBRating, CDBContainer } from 'cdbreact';
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
const RatingBar = ({ readonly }) =>
{
    return (
        <>
            <Rating
                readonly
                placeholderRating={ 3.5 }
                placeholderSymbol={ <BsStarFill className='text-warning' /> }
                fractions={ 2 } defaultValue={ 5 } emptySymbol={ <BsStar className='text-warning' /> } fullSymbol={ <BsStarFill className='text-warning' /> } />
        </>
    );
};
export default RatingBar;
