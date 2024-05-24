import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name, slots, price } = treatment; //treatment is appointment options
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    console.log(price);

    const handleBooking =  event => {
        
            event.preventDefault();
            const form = event.target;
            const slot = form.slot.value;
            const name = form.name.value;
            const email = form.email.value;
            const phone = form.phone.value;
            console.log(name);

            const booking = {
                appointmentDate: date,
                treatment: treatment.name,
                patient: name,
                slot,
                email,
                phone,
                price,
            }


            fetch('https://localhost:44333/api/Bookings',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('Token')}`
                },
                body: JSON.stringify(booking)
            })
                .then(res => res.json())
                .then(data => {
                    console.log("this",data);
                    if(data?.success === false){
                        toast.error(data.message);
                    }else{
                        setTreatment(null);
                        toast.success('Booking confirmed');
                        refetch();
                    }
                    
                        
                })
                .catch(error =>{
                    toast.error(error.message);
                })
            console.log(booking);
       


    }

    return (
        <>
            <dialog id="booking-modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={date} className="input w-full input-bordered" />
                        <select name="slot" className="select select-bordered w-full">

                            {
                                slots.map(slt => {
                                    const { slot, id } = slt;
                                    console.log(id);
                                    return <option
                                        value={slot}
                                        key={id}
                                    >{slot}</option>
                                })
                            }
                        </select>
                        <input name='name' type="text" value={user?.firstName +" "+ user?.lastName} disabled className="input w-full input-bordered" />
                        <input name='email' type="email" value={user?.email} readOnly className="input w-full input-bordered" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full ' type="submit" value="Submit" />
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default BookingModal;