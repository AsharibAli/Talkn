import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { truncateStart } from '../../helpers/utils';
import { BsFillCalendar2MinusFill, BsFillPlayCircleFill } from 'react-icons/bs';
import { CgTimer } from 'react-icons/cg';
import { AiFillUnlock } from 'react-icons/ai';
import { formatSimpleDate } from '../../helpers/utils';
import { appSettings } from '../../helpers/settings';
import ReactPlayer from 'react-player';
import 'html5-device-mockups/dist/device-mockups.min.css';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

// COMPONENTS
import ConnectWalletHandler from '../../components/general/ConnectWalletHandler';
import ChannelInfo from '../../components/general/ChannelInfo';

function Hero({
    createdAt,
    isPremium,
    duration,
    videoId,
    description,
    title,
    src,
    poster,
    preview,
    category,
    isApproved,
    channelId,
}) {
    const { channels, setPreviewModal, setPreviewSrc, owner } = useVideos();
    const { account } = useWeb3();

    /*** ------------------------------------------------ */
    //      CHANGE PAGE TITLE TO THE VIDEO TITLE
    /*** ------------------------------------------------ */
    useEffect(() => {
        document.title = `${appSettings.brandName} | ${title}`;
    }, [title]);

    /*** ------------------------------------------------ */
    //      CHECK IF THE CONNECTED USER CAN WATCH VIDEO
    /*** ------------------------------------------------ */
    const haveAccess = useMemo(() => {
        if (owner === account) {
            return true;
        } else {
            return channels
                ?.filter((channel) => channel?.id === channelId)[0]
                ?.subscribers?.map((user) => user?.address)
                .includes(account);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, channelId, channels]);

    /*** ------------------------------------------------ */
    //      GET VIDEO'S CHANNEL INFORMATION
    /*** ------------------------------------------------ */
    const channelInfo = useMemo(() => {
        return channels?.filter((channel) => channel?.id === channelId)[0];
    }, [channelId, channels]);

    return (
        <div className='video-single-hero hero-slide py-5 overflow-hidden'>
            <div className='hero-slide-bg' style={{ backgroundImage: `url(${poster})` }}></div>
            <div className='container z-index-20 py-5 mt-5 text-center'>
                <div className='row gy-5 align-items-center'>
                    <div className='col-lg-7 mx-auto'>
                        <ul className='list-inline' data-aos='fade-up'>
                            <li className='list-inline-item'>
                                <div className='badge bg-green fw-normal rounded-0'>{category}</div>
                            </li>
                        </ul>
                        <h2 className='h1 text-xxl text-shadow' data-aos='fade-up' data-aos-delay='100'>
                            {title}
                        </h2>
                        <div className='d-block' data-aos='fade-up' data-aos-delay='300'>
                            {isApproved || (
                                <div className='bg-danger px-2 text-white d-inline-block mb-4 fw-light'>
                                    <strong className='me-2 headings-font-family'>Pending!</strong>
                                    This Video is waiting for admin approval
                                </div>
                            )}
                        </div>
                        <ul
                            className='list-inline d-flex align-items-center justify-content-center'
                            data-aos='fade-up'
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
                        <p className='text-gray-500 lead fw-light mb-4' data-aos='fade-up' data-aos-delay='300'>
                            {truncateStart(description, 200, '....')}
                        </p>
                        <div className='d-inline-block'>
                            <div className='mb-4' data-aos='fade-up' data-aos-delay='400'>
                                <ChannelInfo videoId={videoId} channelId={channelId} UIType='singlePage' />
                            </div>
                            {account ? (
                                isPremium && (
                                    <div className='mt-4' data-aos='fade-up' data-aos-delay='500'>
                                        {haveAccess && account !== channelInfo?.owner ? (
                                            <p className='d-inline-block px-3 py-2 rounded bg-opac-secondary'>
                                                You already have access to this video
                                            </p>
                                        ) : haveAccess && account === channelInfo?.owner ? (
                                            <p className='d-inline-block px-3 py-2 rounded bg-opac-secondary'>
                                                This is one of your videos
                                            </p>
                                        ) : (
                                            !haveAccess &&
                                            channelInfo?.owner !== account && (
                                                <ul className='list-inline'>
                                                    <li className='list-inline-item'>
                                                        <Link
                                                            to={`/channels/${channelInfo?.slug}`}
                                                            className='btn btn-success'
                                                        >
                                                            <AiFillUnlock className='mb-1 me-2' />
                                                            Subsctibe to Watch
                                                        </Link>
                                                    </li>
                                                    <li className='list-inline-item'>
                                                        <button
                                                            className='btn btn-primary'
                                                            onClick={() => {
                                                                setPreviewModal(true);
                                                                setPreviewSrc(preview, channelId, videoId);
                                                            }}
                                                        >
                                                            <BsFillPlayCircleFill className='mb-1 me-2' />
                                                            Watch Preview
                                                        </button>
                                                    </li>
                                                </ul>
                                            )
                                        )}
                                    </div>
                                )
                            ) : (
                                <ConnectWalletHandler customClass='my-3' />
                            )}
                        </div>
                    </div>
                </div>

                {isPremium ? (
                    <>
                        {(haveAccess || channelInfo?.owner === account) && (
                            <div className='px-5 mt-5' data-aos='fade-up'>
                                <div className='video-mockup'>
                                    <ReactPlayer url={src} controls={true} width='100%' height='auto' />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className='px-5 mt-5' data-aos='fade-up'>
                        <div className='video-mockup'>
                            <ReactPlayer url={src} controls={true} width='100%' height='auto' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hero;
