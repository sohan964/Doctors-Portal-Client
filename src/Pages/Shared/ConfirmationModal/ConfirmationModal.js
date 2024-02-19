import React from 'react';

const ConfirmationModal = ({title, successButtonName, message, closeModal,modalData, successAction}) => {
    return (
        <div>
            <dialog id="confirmation-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            
                            <button onClick={()=>successAction(modalData)} className='btn text-white btn-error'>{successButtonName}</button>
                        </form>
                        <button onClick={closeModal} className="btn btn-outline">Cancel</button>
                        
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ConfirmationModal;