import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { appSettings } from '../../helpers/settings';
import Web3 from 'web3';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

// COMPONENTS
import ConnectWalletHander from './ConnectWalletHandler';

function BuyVideoModal() {
    const { contract, setTransactionLoading, setBuyModal, buyModalSrc, userRefCode, loadAllChannels, setPreviewModal } =
        useVideos();
    const { account } = useWeb3();
    const [buyerRefCode, setBuyerRefCode] = useState('null');
    const [finalPrice, setFinalPrice] = useState(buyModalSrc.price);
    const [validCode, setValidCode] = useState(false);
    const [validatingSubmitted, setValidatingSubmitted] = useState(false);

    /*** -------------------------------------------- */
    //      GET THE PRICE AFTER REFERRAL DISCOUNT
    /*** -------------------------------------------- */
    useEffect(() => {
        let signal = true;
        async function getActualPrice() {
            const actualPrice = await contract.methods.actualPrice(Number(buyModalSrc.id)).call();
            setFinalPrice(Web3.utils.fromWei(actualPrice.toString(), 'ether'));
        }
        if (signal) {
            getActualPrice();
        }
        return () => (signal = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*** -------------------------------------------- */
    //      VALIDATE THE REFERRAL CODE
    /*** -------------------------------------------- */
    async function validateRefCode() {
        if (buyerRefCode !== '' && buyerRefCode !== 'null') {
            const refCode = await contract.methods.refCodeOwner(buyerRefCode).call();
            setValidatingSubmitted(true);
            if (refCode === '0x0000000000000000000000000000000000000000') {
                setValidCode(false);
            } else if (buyerRefCode === userRefCode) {
                setValidCode(false);
            } else {
                setValidCode(true);
            }
        }
    }

    /*** -------------------------------------------- */
    //      SUBSCRIBE TO A CHANNEL
    /*** -------------------------------------------- */
    function subscribeToVideo() {
        const priceToBePaid = validCode ? finalPrice : buyModalSrc.price;

        contract.methods
            .subscribe(Number(buyModalSrc.id), validCode ? buyerRefCode : '')
            .send({ from: account, value: Web3.utils.toWei(priceToBePaid.toString(), 'ether') })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadAllChannels(contract);
                setBuyModal(false);
                setPreviewModal(false);
                toast.success('Great! You have access now');
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Something went error');
            });
    }

    return (
        <div className='fullscreen-loader' data-aos='zoom-in-up' data-aos-duration='100'>
            <div className='fullscreen-loader-inner p-md-4'>
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-lg-8 mx-auto text-center'>
                            <div className='card shadow position-relative'>
                                <div className='position-absolute m-3 top-0 end-0'>
                                    <button
                                        className='btn btn-dark btn-sm z-index-20'
                                        type='button'
                                        onClick={() => setBuyModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                                <div className='card-body p-4 p-lg-5'>
                                    <div className='badge bg-primary px-3 mb-3'>
                                        {buyModalSrc?.price} {appSettings.currency}
                                    </div>
                                    <h2 className='h1 mb-2'>Subscribe to {buyModalSrc?.title}</h2>
                                    <p className='text-muted mb-5'>
                                        If you have a referral code, type it below and proccess, if not, you can
                                        subscribe without it.
                                    </p>
                                    <form>
                                        <div className='row'>
                                            <div className='col-lg-11 mx-auto text-start'>
                                                <div className='mb-3'>
                                                    <label className='form-label' htmlFor='refCode'>
                                                        Referral Code (If Exisits)
                                                    </label>
                                                    {validCode ? (
                                                        <div className='bg-opac-success px-3 py-2 rounded'>
                                                            <strong className='me-2 text-success'>Valid Code!</strong>
                                                            {buyerRefCode}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className='row gy-2 gx-3 align-items-center'>
                                                                <div className='col-md-8'>
                                                                    <input
                                                                        type='text'
                                                                        id='refCode'
                                                                        placeholder='Enter your referral code'
                                                                        name='ref_code'
                                                                        className='form-control'
                                                                        onChange={(e) =>
                                                                            setBuyerRefCode(e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='col-md-4'>
                                                                    <button
                                                                        className='btn btn-secondary w-100 text-nowrap'
                                                                        type='button'
                                                                        disabled={
                                                                            buyerRefCode === 'null' ||
                                                                            buyerRefCode === ''
                                                                        }
                                                                        onClick={validateRefCode}
                                                                    >
                                                                        Activate Code
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {validatingSubmitted && !validCode && (
                                                                <div className='invalid-feedback'>
                                                                    Invalid Referral Code
                                                                </div>
                                                            )}
                                                        </>
                                                    )}

                                                    <p className='mb-0 form-text text-muted mt-2'>
                                                        Use a referral code and pay only{' '}
                                                        <strong className='fw-bold text-white'>
                                                            {finalPrice} {appSettings.currency}
                                                        </strong>{' '}
                                                    </p>
                                                </div>
                                                <div className='mb-3'>
                                                    {account ? (
                                                        <button
                                                            className='btn btn-primary w-100'
                                                            type='button'
                                                            onClick={subscribeToVideo}
                                                        >
                                                            Subscribe
                                                        </button>
                                                    ) : (
                                                        <ConnectWalletHander customLinkClass='w-100' />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyVideoModal;
