import React from 'react';
import { MdScreenShare } from 'react-icons/md';
import { formatDate, truncateStart } from '../../helpers/utils';
import { appSettings } from '../../helpers/settings';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

function UserChannelsTable() {
    const { channels } = useVideos();
    const { account } = useWeb3();

    /*** ------------------------------------------------ */
    //      USER OWNED CHANNELS TABLE COLUMNS
    /*** ------------------------------------------------ */
    const columns = [
        {
            name: 'Channel',
            selector: (row) => row?.slug,
            minWidth: '300px',
            cell: (row) => (
                <div row={row}>
                    <Link className='text-reset' to={`/channels/${row.slug}`}>
                        <div className='d-flex align-items-center'>
                            <div
                                className='flex-shrink-0'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: `url(${row?.avatar})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    borderRadius: '0.5rem',
                                }}
                            ></div>
                            <div className='ms-3'>
                                <h6 className='mb-1'>{row?.title}</h6>
                                <p className='text-muted small mb-0'>{truncateStart(row?.bio, 30, '...')}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            name: 'Created At',
            minWidth: '200px',
            selector: (row) => row?.createdAt,
            cell: (row) => (
                <div row={row}>
                    <small>{formatDate(row.createdAt)}</small>
                </div>
            ),
        },
        {
            name: 'Subscription Price',
            selector: (row) => row?.price,
            cell: (row) => (
                <div row={row}>
                    <small>
                        {row?.price} {appSettings.currency}
                    </small>
                </div>
            ),
        },
        {
            name: 'Videos',
            selector: (row) => row?.videos,
            cell: (row) => (
                <div row={row}>
                    <small>{row?.videos?.filter((video) => video?.isApproved)?.length}</small>
                </div>
            ),
        },
        {
            name: 'Subscribers',
            selector: (row) => row?.subscribers,
            cell: (row) => (
                <div row={row}>
                    <small>{row?.subscribers?.length}</small>
                </div>
            ),
        },
    ];

    return (
        <div className='card shadow-lg mb-0' data-aos='fade-up' data-aos-delay='200'>
            <div className='card-body p-lg-5'>
                <div className='d-flex a;ign-items-center mb-5'>
                    <div className='stats-icon solid-cyan'>
                        <MdScreenShare size='1.4rem' />
                    </div>
                    <div className='ms-3'>
                        <h2 className='mb-0 h4'>My Channels</h2>
                        <p className='text-muted fw-normal mb-0'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>

                {channels?.filter((vid) => vid?.owner === account)?.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={channels
                            ?.filter((vid) => vid?.owner === account)
                            .sort((a, b) => {
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            })}
                        pagination={columns.length >= 1 && true}
                        responsive
                        theme='solarized'
                    />
                ) : (
                    <p className='mb-0'>There're no channels to display</p>
                )}
            </div>
        </div>
    );
}

export default UserChannelsTable;
