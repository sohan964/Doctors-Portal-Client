import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const {handleLogout} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignOut = () => {
        fetch("https://localhost:44333/api/Account/logout",{
            headers:{
                authorization: `bearer ${localStorage.getItem('Token')}`
            }
        }).then(res => res.json())
        .then(data =>{
            if(data === true){
                handleLogout();
                console.log("logouted");
                navigate('/login');
                
            }
        })

    }
    return (
        <div>
            <p className="text-red-500">somthing went wrong</p>
            <p className="text-red-400">{error.statusText || error.message}</p>
            <h4 className="text-3xl">Please <button className='btn' onClick={handleSignOut}>Sign out</button></h4>
        </div>
    );
};

export default DisplayError;