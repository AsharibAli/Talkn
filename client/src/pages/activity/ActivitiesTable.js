import React, { useMemo } from 'react';
import { HiPresentationChartBar } from 'react-icons/hi';
import { configEtherScanUrl, formatDate, truncate } from '../../helpers/utils';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

function UserApprovedVideosTable() {
    const { contract, activities } = useVideos();
    const { account, username, networkId } = useWeb3();

    const formattedActivities = useMemo(() => {
        return activities.map((activity) => ({
            ...activity,
            userGenName: uniqueNamesGenerator({
                dictionaries: [starWars],
                seed: activity.user,
            }).replace('_', ' '),
        }));
    }, [activities]);

    /*** ------------------------------------------------ */
    //      CONNECT WALLET HANDLER
    /*** ------------------------------------------------ */
    function walletConnect() {
        contract.methods
            .connectWalletHandler()
            .send({ from: account })
            .on('sending', () => {
                toast.success('Senidng');
            })
            .on('receipt', () => {
                toast.success('Great! Wallet Connected');
                window.location.reload();
            })
            .on('error', () => {
                toast.error('Ops! Something went wrong');
            });
    }

    /*** ------------------------------------------------- */
    //      ACTIVITIES TABLE COLUMNS
    /*** ------------------------------------------------- */
    const columns = [
        {
            name: 'User',
            selector: (row) => row?.metadata?.title,
            minWidth: '300px',
            cell: (row) => (
                <div row={row}>
                    <a
                        href={configEtherScanUrl(networkId, row?.user)}
                        rel='noopener noreferrer'
                        className='text-reset'
                        target='_blank'
                    >
                        <div className='d-flex align-items-center'>
                            <div className='avatar avatar-md2'>
                                <div style={{ width: '30px', height: '30px' }}>
                                    <Jazzicon address={row?.user || ''} />
                                </div>
                            </div>
                            <div className='ms-3'>
                                <h6 className='mb-1' style={{ fontSize: '0.9rem' }}>
                                    {row?.user !== account ? row?.userGenName : username}
                                </h6>
                                <p className='text-muted small mb-0'>{truncate(row?.user, 15, '.....')}</p>
                                <p className='text-muted small mb-0' onClick={walletConnect}></p>
                            </div>
                        </div>
                    </a>
                </div>
            ),
        },
        {
            name: 'Time',
            minWidth: '200px',
            selector: (row) => row?.time,
            cell: (row) => (
                <div row={row}>
                    <small>{formatDate(row?.time)}</small>
                </div>
            ),
        },
        {
            name: 'Action',
            selector: (row) => row?.action,
            cell: (row) => (
                <div row={row}>
                    {row?.action === 'Mint Video' ? (
                        <div className='btn btn-opac-success cursor-default px-3 py-0'>
                            <span className='small fw-light'>{row?.action}</span>
                        </div>
                    ) : row?.action === 'Approve minted video' ? (
                        <div className='btn btn-opac-success cursor-default px-3 py-0'>
                            <span className='small fw-light'>{row?.action}</span>
                        </div>
                    ) : row?.action === 'Play Video' ? (
                        <div className='btn btn-opac-info cursor-default px-3 py-0'>
                            <span className='small fw-light'>Subscribed to Video</span>
                        </div>
                    ) : row?.action === 'Added to Wish list' ? (
                        <div className='btn btn-opac-warning cursor-default px-3 py-0'>
                            <span className='small fw-light'>Added video to Watchlist</span>
                        </div>
                    ) : row?.action === 'New Subscriber' ? (
                        <div className='btn btn-opac-secondary cursor-default px-3 py-0'>
                            <span className='small fw-light'>{row?.action}</span>
                        </div>
                    ) : row?.action === 'New Channel Created' ? (
                        <div className='btn btn-opac-primary cursor-default px-3 py-0'>
                            <span className='small fw-light'>Created a channel</span>
                        </div>
                    ) : row?.action === 'New Video Uploded' ? (
                        <div className='btn btn-opac-secondary cursor-default px-3 py-0'>
                            <span className='small fw-light'>{row?.action}</span>
                        </div>
                    ) : row?.action === 'The uploaded video has been approved by the administrator' ? (
                        <div className='btn btn-opac-success cursor-default px-3 py-0'>
                            <span className='small fw-light'>Approved Video</span>
                        </div>
                    ) : row?.action === 'New subscriber' ? (
                        <div className='btn btn-opac-success cursor-default px-3 py-0'>
                            <span className='small fw-light'>New Subscription</span>
                        </div>
                    ) : row?.action === 'A new referral code has been added' ? (
                        <div className='btn btn-opac-info cursor-default px-3 py-0'>
                            <span className='small fw-light'>Generated Referral Code</span>
                        </div>
                    ) : (
                        <span className='small'>{row?.action}</span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className='card shadow-lg mb-0' data-aos='fade-up' data-aos-delay='200'>
            <div className='card-body p-lg-5'>
                <div className='d-flex a;ign-items-center mb-5'>
                    <div className='stats-icon solid-cyan'>
                        <HiPresentationChartBar size='1.4rem' />
                    </div>
                    <div className='ms-3'>
                        <h2 className='mb-0 h4'>Latest Activities</h2>
                        <p className='text-muted fw-normal mb-0'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>

                {formattedActivities.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={formattedActivities?.sort((a, b) => b?.time - a?.time)}
                        pagination={formattedActivities.length >= 1 && true}
                        responsive
                        theme='solarized'
                    />
                ) : (
                    <p className='mb-0'>There're no activities yet to display</p>
                )}
            </div>
        </div>
    );
}

export default UserApprovedVideosTable;
