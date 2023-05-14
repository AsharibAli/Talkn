import React from 'react';
import { Link } from 'react-router-dom';

// HOOKS
import useWeb3 from '../../hooks/useWeb3';

// COMPONENTS
import UserChannelsTable from './UserChannelsTable';
import UserPendingVideosTable from './UserPendingVideosTable';
import UserSubscriptionsTable from './UserSubscriptionsTable';
import JoinAfilliate from './JoinAfilliate';
import PageBanner from '../../components/general/PageBanner';
import ConnectWalletHander from '../../components/general/ConnectWalletHandler';
import UserAfilliateProfits from './UserAfilliateProfits';

function UserPage() {
    const { account } = useWeb3();

    return (
        <>
            <PageBanner
                heading='My Account'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            >
                {account ? (
                    <ul className='list-inline mb-0'>
                        <li className='list-inline-item m-1'>
                            <Link className='btn btn-primary' to='/create-channel'>
                                Create a Channel
                            </Link>
                        </li>
                        <li className='list-inline-item m-1'>
                            <Link className='btn btn-light text-dark' to='/upload/general'>
                                Upload a Video
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ConnectWalletHander customClass='my-3' />
                )}
            </PageBanner>
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='mb-5'>
                        <UserAfilliateProfits />
                    </div>
                    <div className='mb-5'>
                        <JoinAfilliate />
                    </div>
                    <div className='mb-5'>
                        <UserChannelsTable />
                    </div>
                    <div className='mb-5'>
                        <UserPendingVideosTable />
                    </div>
                    <div className='mb-5'>
                        <UserSubscriptionsTable />
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserPage;
