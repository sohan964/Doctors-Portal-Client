import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const MyAppointment = () => {

    const { user,handleLogout  } = useContext(AuthContext);
    const url = `https://localhost:44333/api/Bookings?email=${user?.email}`;
    //console.log(user);
    console.log(url);
    const { data: bookings = [] } = useQuery({
        queryKey: ['Bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage?.getItem('Token')}`
                }
            });
            
            if(res.status ===401 || res.status === 403){
                handleLogout();
                return res.json();
            }
            const data = await res.json();
            console.log(data);
            return data;
        }
    })
    
    console.log(bookings);

    return (
        <div>
            <h3 className="text-3xl mb-5">My Appointments</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            bookings?.map((booking, i) =>
                                <tr className="hover" key={booking?._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking?.patient}</td>
                                    <td>{booking?.treatment}</td>
                                    <td>{booking?.appointmentDate}</td>
                                    <td>{booking?.slot}</td>
                                    <td> 
                                        {
                                            booking.price && !booking.paid && <Link
                                                to={`/dashboard/payment/${booking.id}`}
                                            ><button
                                                className='btn btn-primary btn-sm'
                                            >Pay</button>
                                            </Link>
                                        }
                                        {
                                            booking.price && booking.paid && <span className='text-green-500 text-bold'>paid</span>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;