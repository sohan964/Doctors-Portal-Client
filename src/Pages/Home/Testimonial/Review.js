import React from 'react';

const Review = ({ review }) => {
    const { name, img, review: userReview, location } = review;
    return (
        <div className="card shadow-xl mx-4">
            <div className="card-body">
                <p>{userReview}</p>
                <div className="flex items-center mt-6">
                    <div className="avatar mr-6">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt=''/>
                        </div>
                    </div>
                    <div>
                        <h5 className="text-lg">{name}</h5>
                        <h5 className="text-lg">{location}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;