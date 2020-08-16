import React from 'react';
import back from './stackImg/card-back.png'

export const Card = ({card, onFlip}) => {
    const {isFlipped, img, id} = card
    return (
        <div className='card'>
            <img src={isFlipped ? img : back} alt="card" onClick={() => onFlip(id)}/>
        </div>
    )
}
