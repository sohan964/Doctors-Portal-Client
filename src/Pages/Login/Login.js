import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { token, setToken, setLoading } = useContext(AuthContext);


    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location?.state?.from.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = async fromData => {
        console.log(fromData);
        setLoginError('');
        setLoading(true);
        try {
            const res = await fetch("https://localhost:44333/api/Account/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(fromData),
            })
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                localStorage.setItem("Token", data);
                setToken(data);
                toast.success("Welcome");
                setLoading(false);
                navigate(from, { replace: true });


            }
        } catch (error) {
            setLoading(false);
            setLoginError("An error occurred. Please try again later.");
            console.error("Login error:", error);
        }

    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7 border'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="email"
                            {...register("email", {
                                required: "Email Address is required"
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
                                minLength: { value: 6, message: "Password must be 6 characters or longer" }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                        <div className="label">
                            <span className="label-text">Forget Password?</span>
                        </div>
                    </label>
                    <input className='btn btn-accent w-full' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Doctors Portal? <Link className='text-secondary' to="/signup">Create new Account</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;