import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiExchangeFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

function TransferOwnership() {
    const { contract, setTransactionLoading } = useVideos();
    const { account } = useWeb3();
    const [newOwner, setNewOwner] = useState('');
    const [successTransfer, setSuccessTransfer] = useState(false);
    const navigate = useNavigate();

    /*** ------------------------------------------------ */
    //      TRANSFER THE OWNER SHIP OF THE CONTRACT
    /*** ------------------------------------------------ */
    function transferOwnershipHandler(e) {
        e.preventDefault();
        if (newOwner.length < 42) {
            toast.error("Invalid Address!, please check the address you've entered");
        } else {
            setTransactionLoading(true);
            contract.methods
                .transferOwnership(newOwner)
                .send({ from: account })
                .once('sending', () => {
                    setTransactionLoading(true);
                })
                .on('receipt', () => {
                    setTransactionLoading(false);
                    toast.success('Great! Ownership has been transfered to another account');
                    setSuccessTransfer(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                })
                .on('error', () => {
                    setTransactionLoading(false);
                    toast.error('Opps! Something went error');
                });
        }
    }

    return successTransfer ? (
        <div className='card shadow-lg mb-0 p-lg-5 text-center'>
            <div className='card-body'>
                <h1>You're no longer the owner of this contract</h1>
                <p className='lead text-muted'>
                    The Ownership goes to another account now, you're no longer have access to this page. Good luck
                </p>
            </div>
        </div>
    ) : (
        <div className='card shadow-lg mb-0' data-aos='fade-up' data-aos-delay='200'>
            <div className='card-body p-lg-5'>
                <div className='d-flex mb-5'>
                    <div className='stats-icon solid-turquoise'>
                        <RiExchangeFill size='1.4rem' />
                    </div>
                    <div className='ms-3'>
                        <h2 className='mb-0 h4'>Transfer Contracts Ownership</h2>
                        <p className='text-muted fw-normal mb-0'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>

                <form onSubmit={transferOwnershipHandler}>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <div className='d-flex align-items-end'>
                                <div className='me-2 w-100'>
                                    <label className='form-label' htmlFor='newOwner'>
                                        New Owner
                                    </label>
                                    <input
                                        type='text'
                                        id='newOwner'
                                        className='form-control'
                                        placeholder='Enter the new owner address form'
                                        onChange={(e) => setNewOwner(e.target.value)}
                                    />
                                </div>
                                <button className='btn btn-primary' type='submit'>
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TransferOwnership;
