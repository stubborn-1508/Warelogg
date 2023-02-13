import React from 'react';
import Rating from "react-rating";
import { BsStar, BsStarFill } from "react-icons/bs";
const RatingBar = ({ fill }) =>
{
    return (
        <>
            <Rating
                readonly
                placeholderRating={ fill }
                placeholderSymbol={ <BsStarFill className='text-warning' /> }
                fractions={ 2 } defaultValue={ 5 } emptySymbol={ <BsStar className='text-warning' /> } fullSymbol={ <BsStarFill className='text-warning' /> } />
        </>
    );
};
export default RatingBar;
