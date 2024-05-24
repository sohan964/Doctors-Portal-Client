import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';


const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    
    const [signUpError, setSignUpError] = useState('');
    
    
    const navigate = useNavigate();


    const handleSignUp = async (fromData) => {
        console.log(fromData);
        setSignUpError('');

        const res = await fetch("https://localhost:44333/api/Account/signup",{
            method: "POST",
            headers:{
                "content-type" : "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(fromData)
        })
        
        const data = await res.json();
        console.log(data);
        if(data===true){
            toast.success('SignUp Success');
            navigate('/login');
        }else{
            setSignUpError("something is wrong");
        }
    }

    

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 border'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>


                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">FirstName</span>
                        </div>
                        <input type="text"
                            {...register("firstName", {
                                required: "FirstName is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.firstName && <p className='text-red-600'>{errors.FirstName.message}</p>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">LastName</span>
                        </div>
                        <input type="text"
                            {...register("lastName", {
                                required: "LastName is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.lastName && <p className='text-red-600'>{errors.lastName.message}</p>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="email"
                            {...register("email", {
                                required: "Email is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters or longer" },
                                pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be strong' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">ConfirmPassword</span>
                        </div>
                        <input type="password"
                            {...register("confirmPassword", {
                                required: "confirmPassword is required",
                                minLength: { value: 6, message: "confirmPassword must be 6 characters or longer" },
                                pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'confirmPassword must be strong' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message}</p>}
                    </label>
                    <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already an user? <Link className='text-secondary' to="/login">Login</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;