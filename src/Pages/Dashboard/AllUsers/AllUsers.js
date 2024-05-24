import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://localhost:44333/api/Account/GetAllUsers',{
                headers:{
                    authorization : `bearer ${localStorage.getItem('Token')}`
                }
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })
   console.log(users);
    //handle admin
    const handleMakeAdmin = email => {
        
        fetch(`https://localhost:44333/api/Account/${email}`, {
            method: 'PUT',
            headers:{
                authorization: `bearer ${localStorage.getItem('Token')}`
            }

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make admin successful');
                    console.log(data);
                    refetch();
                }
            })
    }
    return (
        <div>
            <h2 className="text-3xl">All Users</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, i) => <tr className='hover'
                                key={user.id}
                            >
                                <th>{i + 1}</th>
                                <td>{user.firstName +" "+ user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user.email)} className='btn text-white btn-xs btn-primary'>Make Admin</button>}</td>
                                <td><button className='btn btn-xs bg-red-600 text-white'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;