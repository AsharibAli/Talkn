import React from 'react';
import { truncateStart } from '../../helpers/utils';
import { BsFillCalendar2MinusFill } from 'react-icons/bs';
import { CgTimer } from 'react-icons/cg';
import { formatSimpleDate } from '../../helpers/utils';

// COMPOENENTS
import ChannelInfo from '../../components/general/ChannelInfo';

function HeroSlide({ title, category, description, channelId, createdAt, videoId, poster, duration }) {
    return (
        <>
            <div className='hero-slide py-5 overflow-hidden'>
                <div className='hero-slide-bg' style={{ backgroundImage: `url(${poster})` }}></div>
                <div className='container z-index-20 py-5 mt-5'>
                    <div className='row gy-5 align-items-center'>
                        <div className='col-lg-6 order-2 order-lg-1'>
                            <ul className='list-inline' data-aos='fade-right'>
                                <li className='list-inline-item'>
                                    <div className='badge bg-primary fw-normal rounded-0'>{category}</div>
                                </li>
                            </ul>
                            <h2 className='h1 text-xxl text-shadow' data-aos='fade-right' data-aos-delay='100'>
                                {title}
                            </h2>
                            <ul
                                className='list-inline d-flex align-items-center'
                                data-aos='fade-right'
                                data-aos-delay='200'
                            >
                                <li className='list-inline-item'>
                                    <span className='small ms-2'>
                                        <BsFillCalendar2MinusFill className='text-warning me-2' size='1.2rem' />{' '}
                                        {formatSimpleDate(createdAt)}
                                    </span>
                                </li>
                                <li className='list-inline-item ms-2 lh-1' style={{ fontSize: '0.7rem' }}>
                                    |
                                </li>
                                <li className='list-inline-item'>
                                    <span className='small ms-2'>
                                        <CgTimer className='text-warning me-2' size='1.4rem' /> {duration}
                                    </span>
                                </li>
                            </ul>
                            <p className='text-gray-500 lead fw-light mb-4' data-aos='fade-right' data-aos-delay='300'>
                                {truncateStart(description, 200, '....')}
                            </p>
                            <div data-aos='fade-right' data-aos-delay='400' className='mb-4'>
                                <ChannelInfo channelId={channelId} videoId={videoId} UIType='hero' />
                            </div>
                        </div>
                        <div className='col-lg-5 ms-auto order-1 order-lg-2'>
                            <div className='px-lg-5' data-aos='fade-left'>
                                <img
                                    src={poster}
                                    alt={title}
                                    className='img-fluid hero-slide-img d-block ms-auto shadow-lg w-100'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSlide;
