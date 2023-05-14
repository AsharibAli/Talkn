import React, { useState } from 'react';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { appSettings } from '../../helpers/settings';
import { toast } from 'react-toastify';

// Hooks
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

// COMPONENTS
import PageBanner from '../../components/general/PageBanner';
import PendingVideosTable from './PendingVideosTable';
import AllVideosTable from './AllVideosTable';
import AllChannelsTable from './AllChannelsTable';
import TransferOwnership from './TransferOwnership';

function AdminPage() {
    const { account } = useWeb3();
    const { contract, setTransactionLoading, loadAllChannels, loadAppProfits, appProfits } = useVideos();
    const [pendingVideosIds, setPendingVideosIds] = useState([]);
    const [videosIds, setVideosIds] = useState([]);

    /*** ------------------------------------------------ */
    //      APPROVE PENDING VIDEOS
    /*** ------------------------------------------------ */
    function approveVideosHandler() {
        contract.methods
            .approveVideo(pendingVideosIds)
            .send({ from: account })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadAllChannels(contract);
                setPendingVideosIds([]);
                toast.success('Great! You have approved selected videos');
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Something went error');
            });
    }

    /*** ------------------------------------------------ */
    //      BLOCK EXISTED VIDEOS
    /*** ------------------------------------------------ */
    function blockVideosHandler() {
        contract.methods
            .blockVideos(videosIds)
            .send({ from: account })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadAllChannels(contract);
                setVideosIds([]);
                toast.success('Great! You have blocked selected videos');
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Something went error');
            });
    }

    /*** ------------------------------------------------ */
    //      CLAIM PROFITS TO WALLET
    /*** ------------------------------------------------ */
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
            <PageBanner
                heading='Admin Panel'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='card shadow-lg mb-5' data-aos='fade-up' data-aos-delay='100'>
                        <div className='card-body p-lg-5'>
                            <div className='d-flex a;ign-items-center mb-5'>
                                <div className='stats-icon solid-turquoise'>
                                    <RiMoneyDollarCircleFill size='1.4rem' />
                                </div>
                                <div className='ms-3'>
                                    <h2 className='mb-0 h4'>App Profits</h2>
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

                    <div className='mb-5'>
                        <TransferOwnership />
                    </div>

                    <div className='mb-5'>
                        <AllChannelsTable />
                    </div>

                    <div className='mb-5'>
                        <PendingVideosTable setIds={setPendingVideosIds} />
                        {pendingVideosIds.length > 0 && (
                            <button className='btn-primary btn w-100 mt-3' onClick={approveVideosHandler}>
                                Approve Selected
                            </button>
                        )}
                    </div>
                    <div className='mb-5'>
                        <AllVideosTable setIds={setVideosIds} />
                        {videosIds.length > 0 && (
                            <button className='btn-primary btn w-100 mt-3' onClick={blockVideosHandler}>
                                Block Selected
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminPage;
