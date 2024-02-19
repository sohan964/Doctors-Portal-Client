import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name,price, slots } = appointmentOption;
    return (
        <div className="card  shadow-xl">
            <div className="card-body text-center">
                <h2 className="card-title font-bold justify-center text-secondary">{name}</h2>
                <p> {slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p>{slots.length} spaces available </p>
                <p><small>Price: ${price}</small></p>
                <div className="card-actions justify-center">
                    <button disabled={slots.length===0} className="btn btn-secondary text-white"  onClick={async () => {
                        await setTreatment(appointmentOption);
                        const bookingModal = await document.getElementById('booking-modal').showModal();
                        if (bookingModal) {
                            bookingModal.showModal();
                            
                        }
                        
                    }}>Book Appointment</button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;