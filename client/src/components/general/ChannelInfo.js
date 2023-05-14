import React, { useMemo } from 'react';
import { truncate } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import { AiFillUnlock } from 'react-icons/ai';
import { BsFillPlayCircleFill } from 'react-icons/bs';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

function ChannelInfo({ channelId, UIType, videoId, fromPreview }) {
    const { channels, allVideos, setPreviewModal, owner } = useVideos();
    const { account } = useWeb3();

    const channelInfo = useMemo(() => {
        return channels.filter((channel) => Number(channel?.id) === Number(channelId))[0];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelId, channels]);

    const videoInfo = useMemo(() => {
        return allVideos.filter((video) => video?.videoId === videoId)[0];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    const shouldAccess = useMemo(() => {
        if (channelInfo?.subscribers?.map((user) => user?.address).includes(account)) {
            return true;
        } else if (owner === account) {
            return true;
        } else if (channelInfo?.owner === account) {
            return true;
        } else {
            return false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, channelInfo, videoInfo]);

    return (
        <>
            {/* Channel info UI for single page */}
            {UIType === 'singlePage' && (
                <div className='p-3 bg-opac-secondary' style={{ borderRadius: '0.5rem' }}>
                    <Link className='text-reset d-flex align-items-center me-3' to={`/channels/${channelInfo?.slug}`}>
                        <div
                            className='channel-avatar channel-avatar-sm rounded-circle'
                            style={{ backgroundImage: `url(${channelInfo?.avatar})` }}
                        ></div>
                        <div className='text-reset text-start ms-3'>
                            <h6 className='mb-1'>{channelInfo?.title}</h6>
                            <p className='text-muted small mb-0'>By: {truncate(channelInfo?.ownerName, 15, '.....')}</p>
                        </div>
                    </Link>
                </div>
            )}

            {/* Channel info UI for Hero element */}
            {UIType === 'hero' && (
                <div
                    className={`d-flex ${
                        fromPreview ? 'align-items-center' : 'align-items-sm-center align-items-start'
                    } flex-column flex-sm-row p-3 bg-opac-secondary`}
                    style={{ borderRadius: '0.5rem' }}
                >
                    <Link
                        className='text-reset d-flex align-items-center me-3'
                        to={`/channels/${channelInfo?.slug}`}
                        onClick={() => setPreviewModal(false)}
                    >
                        <div
                            className='channel-avatar channel-avatar-sm rounded-circle'
                            style={{ backgroundImage: `url(${channelInfo?.avatar})` }}
                        ></div>
                        <div className='text-reset mx-3'>
                            <h6 className='mb-1'>{truncate(channelInfo?.title, 15, '.....')}</h6>
                            <p className='text-muted small mb-0'>By: {truncate(channelInfo?.ownerName, 15, '.....')}</p>
                        </div>
                    </Link>

                    <div className='ms-sm-auto mt-3 mt-sm-0'>
                        {!videoInfo?.isPremium ? (
                            <Link
                                to={`/videos/${videoId}`}
                                className='btn btn-primary btn-sm'
                                onClick={() => setPreviewModal(false)}
                            >
                                <BsFillPlayCircleFill className='mb-1 me-2' />
                                Watch Now
                            </Link>
                        ) : videoInfo?.isPremium && shouldAccess ? (
                            <Link
                                to={`/videos/${videoId}`}
                                className='btn btn-primary btn-sm'
                                onClick={() => setPreviewModal(false)}
                            >
                                <BsFillPlayCircleFill className='mb-1 me-2' />
                                Watch Now
                            </Link>
                        ) : (
                            <Link
                                to={`/channels/${channelInfo?.slug}`}
                                className='btn btn-success btn-sm'
                                onClick={() => setPreviewModal(false)}
                            >
                                <AiFillUnlock className='mb-1 me-2' />
                                Subsctibe to Watch
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Channel info UI for movie box */}
            {UIType === 'box' && (
                <Link
                    className='text-reset d-flex align-items-center'
                    to={`/channels/${channelInfo?.slug}`}
                    onClick={() => setPreviewModal(false)}
                >
                    <div
                        className='channel-avatar channel-avatar-xs rounded-circle'
                        style={{ backgroundImage: `url(${channelInfo?.avatar})` }}
                    ></div>
                    <div className='text-reset ms-2'>
                        <h6 className='mb-0 lh-1 text-sm'>{channelInfo?.title}</h6>
                        <p className='text-muted small mb-0 lh-1 mt-1'>
                            By: {truncate(channelInfo?.ownerName, 15, '.....')}
                        </p>
                    </div>
                </Link>
            )}
        </>
    );
}

export default ChannelInfo;
