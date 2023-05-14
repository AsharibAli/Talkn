import React, { useEffect, useRef } from 'react';
import { FaBullhorn } from 'react-icons/fa';
import { MdOutlineFileCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

// HOOKS
import useWeb3 from '../../hooks/useWeb3';
import useVideos from '../../hooks/useVideos';

function JoinAfilliate() {
    const { contract, setTransactionLoading, loadUserRefCode, userRefCode } = useVideos();
    const { account } = useWeb3();
    const copyBtnRef = useRef();

    /*** -------------------------------------------- */
    //      COPY REF CODE TO CLIPBOARD
    /*** -------------------------------------------- */
    function copyRefCode() {
        copyBtnRef.current.querySelector('.copy-msg').classList.add('active');
        copyBtnRef.current.classList.add('active');
        copyBtnRef.current.querySelector('.copy-msg').classList.add('transformed');
        navigator.clipboard.writeText(userRefCode);
        setTimeout(() => {
            copyBtnRef.current.querySelector('.copy-msg').classList.remove('active');
        }, 300);
        setTimeout(() => {
            copyBtnRef.current.classList.remove('active');
        }, 500);
        setTimeout(() => {
            copyBtnRef.current.querySelector('.copy-msg').classList.remove('transformed');
        }, 1000);
    }

    /*** -------------------------------------------- */
    //    FETCHING USER REFERRAL CODE (IF EXISTS)
    /*** -------------------------------------------- */
    useEffect(() => {
        let signal = true;
        if (contract && signal) {
            loadUserRefCode(contract, account);
        }
        return () => (signal = false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, account]);

    /*** -------------------------------------------- */
    //      GENERATE UNIQUE REFERRAL CODE
    /*** -------------------------------------------- */
    function createRefCodeHandler() {
        const refCode = uuid();

        contract.methods
            .addRefCode(refCode)
            .send({ from: account })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadUserRefCode(contract, account);
                toast.success("Great! you've create a referral code successfully");
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Somthing went wrong');
            });
    }

    return (
        <div className='card shadow-lg mb-0' data-aos='fade-up' data-aos-delay='200'>
            <div className='card-body p-lg-5'>
                <div className='d-flex a;ign-items-center mb-5'>
                    <div className='stats-icon solid-turquoise'>
                        <FaBullhorn size='1.4rem' />
                    </div>
                    <div className='ms-3'>
                        <h2 className='mb-0 h4'>Join Afilliate Program</h2>
                        <p className='text-muted fw-normal'>
                            Generate a referral code and send it to your freinds to get a revenue on each transaction
                            done using your referral code
                        </p>
                    </div>
                </div>

                {userRefCode && userRefCode !== 'null' ? (
                    <>
                        <p className='text-muted mb-3'>Your referral code is:</p>
                        <div className='d-flex'>
                            <button
                                className='btn btn-link p-0 shadow-0 me-2 copy-btn'
                                ref={copyBtnRef}
                                onClick={copyRefCode}
                            >
                                <MdOutlineFileCopy size='2rem' />
                                <span className='copy-msg'>Copied</span>
                            </button>

                            <p className='h2 pt-2'>{userRefCode}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <p>You don't have a referral code yet, generate one now if you're interested!</p>
                        <button className='btn btn-opac-info' type='button' onClick={createRefCodeHandler}>
                            Generate a Referral Code
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default JoinAfilliate;
