import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlayCircle, BsHourglassSplit } from 'react-icons/bs';
import { CgTimer } from 'react-icons/cg';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

// HOOKS
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import ChannelInfo from './ChannelInfo';

function MovieBox({ videoId, preview, channelId, title, category, duration, poster, isPremium, isApproved }) {
    const { setPreviewModal, setPreviewSrc } = useVideos();

    return (
        <div data-aos='fade-up'>
            <div className='movie-box w-100'>
                <div className='movie-box-poster-holder'>
                    <Link to={`/videos/${videoId}`}>
                        <BsPlayCircle className='play-icon text-white z-index-20' size='2.5rem' />
                    </Link>
                    <div className='movie-box-poster' style={{ backgroundImage: `url(${poster})` }}></div>
                    {isPremium && (
                        <div className='position-absolute top-0 end-0 p-3'>
                            <span className='badge-premium'>
                                <RiMoneyDollarCircleFill size='1.7rem' />
                            </span>
                        </div>
                    )}
                    {!isApproved && (
                        <div className='position-absolute top-0 start-0 p-2'>
                            <span className='badge bg-primary text-xxs'>
                                <BsHourglassSplit size='0.85rem' className='me-2' />
                                Pending
                            </span>
                        </div>
                    )}
                    <div className='movie-box-cta w-100 pt-3'>
                        <button
                            className='btn btn-primary btn-sm w-100 py-2'
                            style={{ borderRadius: '0.5rem' }}
                            onClick={() => {
                                setPreviewModal(true);
                                setPreviewSrc(preview, channelId, videoId);
                            }}
                        >
                            <BsPlayCircle className='me-2' />
                            Watch Trailer
                        </button>
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <h5 className='mb-0 title'>
                        <Link className='text-reset' to={`/videos/${videoId}`}>
                            {title}
                        </Link>
                    </h5>
                    <div className='ms-2'>
                        <div className='text-xxs badge fw-normal bg-secondary'>{category}</div>
                    </div>
                </div>
                <div
                    className='d-flex align-items-center info justify-content-between p-3 bg-opac-secondary'
                    style={{ borderRadius: '0.5rem' }}
                >
                    <ChannelInfo UIType='box' channelId={channelId} videoId={videoId} />
                    <span className='small ms-2'>
                        <CgTimer className='text-warning me-2' size='1.4rem' /> {duration}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MovieBox;
