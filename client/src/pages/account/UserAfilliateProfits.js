import React from 'react';
import { appSettings } from '../../helpers/settings';
import { toast } from 'react-toastify';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

function UserAfilliateProfits() {
    const { contract, appProfits, setTransactionLoading, loadAppProfits } = useVideos();
    const { account } = useWeb3();

    /*** -------------------------------------------- */
    //      CLAIM PROFITS TO WALLET
    /*** -------------------------------------------- */
    function claimProfitsHandler() {
        contract.methods
            .claimFunds()
            .send({ from: account })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadAppProfits(contract, account);
                toast.success('Great! You have claimed your profits');
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Something went error');
            });
    }

    return (
        <>
            <div className='card shadow-lg mb-5' data-aos='fade-up' data-aos-delay='100'>
                <div className='card-body p-lg-5'>
                    <div className='d-flex a;ign-items-center mb-5'>
                        <div className='stats-icon solid-turquoise'>
                            <RiMoneyDollarCircleFill size='1.4rem' />
                        </div>
                        <div className='ms-3'>
                            <h2 className='mb-0 h4'>Afilliate Profits</h2>
                            <p className='text-muted fw-normal mb-0'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </div>
                    </div>

                    {appProfits === '0' ? (
                        <p className='lead'>You don't have any profits yet!</p>
                    ) : (
                        <div
                            className='d-flex flex-column flex-md-row justify-content-md-between align-items-center px-3 py-3 py-md-1 bg-gray-850'
                            style={{ borderRadius: '0.5rem' }}
                        >
                            <p className='text-xl mb-2 mb-md-0'>
                                {appProfits} {appSettings.currency}
                            </p>
                            <button
                                className='btn btn-primary mb-2 mb-md-0'
                                type='button'
                                onClick={claimProfitsHandler}
                            >
                                Claim your profits
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserAfilliateProfits;
