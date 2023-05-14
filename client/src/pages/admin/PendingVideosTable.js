import React from 'react';
import { AiFillVideoCamera } from 'react-icons/ai';
import { formatDate, truncate, truncateStart } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

// HOOKS
import useVideos from '../../hooks/useVideos';

function PendingVideosTable({ setIds }) {
    const { allVideos, channels } = useVideos();

    /*** ------------------------------------------------ */
    //      ALL PENDING VIDEOS TABLE COLUMNS
    /*** ------------------------------------------------ */
    const columns = [
        {
            name: 'Video',
            selector: (row) => row?.title,
            minWidth: '300px',
            cell: (row) => (
                <div row={row}>
                    <Link className='text-reset' to={`/videos/${row.videoId}`}>
                        <div className='d-flex align-items-center'>
                            <div
                                className='flex-shrink-0 bg-cover bg-center'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: `url(${row?.poster})`,
                                    borderRadius: '0.5rem',
                                }}
                            ></div>
                            <div className='ms-3'>
                                <h6 className='mb-1'>{row?.title}</h6>
                                <p className='text-muted small mb-0'>{truncateStart(row?.description, 30, '...')}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            name: 'Channel',
            minWidth: '200px',
            selector: (row) => row?.channelId,
            cell: (row) => (
                <div row={row}>
                    <Link
                        to={`/channels/${channels?.filter((channel) => channel?.id === row?.channelId)[0]?.slug}`}
                        className='text-reset'
                    >
                        <div className='d-flex align-items-center'>
                            <div
                                className='flex-shrink-0 bg-cover bg-center'
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundImage: `url(${
                                        channels?.filter((channel) => channel?.id === row?.channelId)[0]?.avatar
                                    })`,
                                    borderRadius: '0.5rem',
                                }}
                            ></div>
                            <div className='ms-3'>
                                <h6 className='mb-1' style={{ fontSize: '0.9rem' }}>
                                    {channels?.filter((channel) => channel?.id === row?.channelId)[0]?.title}
                                </h6>
                                <p className='text-muted small mb-0'>
                                    {channels?.filter((channel) => channel?.id === row?.channelId)[0]?.ownerName &&
                                        truncate(
                                            channels?.filter((channel) => channel?.id === row?.channelId)[0]?.ownerName,
                                            15,
                                            '.....'
                                        )}
                                </p>
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
            name: 'Accessibility',
            selector: (row) => row?.price,
            cell: (row) => (
                <div row={row}>
                    <small>{row?.isPremium ? 'Requires Subscription' : 'Free to Watch'}</small>
                </div>
            ),
        },
        {
            name: 'Duration',
            selector: (row) => row?.duration,
            cell: (row) => (
                <div row={row}>
                    <small>{row?.duration}</small>
                </div>
            ),
        },
        {
            name: 'Action',
            minWidth: '140px',
            selector: (row) => row?.videoId,
            cell: (row) => (
                <div row={row}>
                    <div className='form-check'>
                        <input
                            type='checkbox'
                            id={`pending_video_${row?.videoId}`}
                            className='form-check-input'
                            onChange={(e) =>
                                e.target.checked
                                    ? setIds((prev) => [...prev, Number(row.videoId)])
                                    : setIds((prev) => prev.filter((id) => id !== Number(row.videoId)))
                            }
                        />
                        <label htmlFor={`pending_video_${row?.videoId}`} className='form-check-label'>
                            Select
                        </label>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className='card shadow-lg mb-0' data-aos='fade-up' data-aos-delay='200'>
            <div className='card-body p-lg-5'>
                <div className='d-flex mb-5'>
                    <div className='stats-icon solid-orange'>
                        <AiFillVideoCamera size='1.4rem' />
                    </div>
                    <div className='ms-3'>
                        <h2 className='mb-0 h4'>Pending Videos</h2>
                        <p className='text-muted fw-normal mb-0'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={allVideos
                        ?.filter((vid) => !vid.isApproved)
                        .sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        })}
                    pagination={allVideos.length >= 1 && true}
                    responsive
                    theme='solarized'
                />
            </div>
        </div>
    );
}

export default PendingVideosTable;
