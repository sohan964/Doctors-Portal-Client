import React from 'react';

const InfoCard = ({card}) => {
    const {name, description, icon, bgClass} =card;
    return (
        <div className={`card md:card-side text-white p-6 shadow-xl ${bgClass}`}>
            <figure><img src={icon} alt="info" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>
        </div>
    );
};

export default InfoCard;