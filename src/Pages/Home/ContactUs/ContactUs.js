import React from 'react';
import bg from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const ContactUs = () => {
    return (
        <div className="hero"
            style={{background:`url(${bg})`}}
        >
            <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-xl text-primary font-bold">Contact Us</h1>
                    <p className="text-4xl text-white">Stay connected with us</p>
                </div>
                <div className="card shrink-0 w-full ">
                    <form className="card-body">
                        <div className="form-control">
                        <input type="email" placeholder="Email Address" className="input input-bordered input-sm w-full max-w-xs" required/>
                        </div>
                        <div className="form-control">
                        <input type="text" placeholder="Subject" className="input input-bordered input-sm w-full max-w-xs" required/>
                        </div>
                        <div className="form-control">
                        <textarea className="textarea textarea-bordered" placeholder="Your message"></textarea>
                        </div>
                        <div className="text-center mt-3">
                            <PrimaryButton>Submit</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;