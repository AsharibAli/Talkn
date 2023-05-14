import React, { useMemo } from 'react';
import { HiUsers } from 'react-icons/hi';
import { TiVideo } from 'react-icons/ti';
import { MdSubscriptions } from 'react-icons/md';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { FaEthereum } from 'react-icons/fa';
import { appSettings } from '../../helpers/settings';
import { Link } from 'react-router-dom';
import { truncateStart } from '../../helpers/utils';

// HOOKS
import useWeb3 from '../../hooks/useWeb3';
import useVideos from '../../hooks/useVideos';

function ChannelCard({ id, title, bio, avatar, cover, owner, slug, videos, subscribers, price, category }) {
    const { setBuyModalSrc, setBuyModal, owner: appOwner } = useVideos();
    const { account } = useWeb3();

    const isSubscriber = useMemo(() => {
        return subscribers.map((user) => user?.address).includes(account);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, account, subscribers]);

    const isOwner = useMemo(() => {
        return Boolean(owner === account);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, account, owner]);

    return (
        <>
            <div className='card channel-card mb-0'>
                <div className='card-body p-3'>
                    <div className='channel-card-cover' style={{ backgroundImage: `url(${cover})` }}>
                        <div className='channel-card-avatar' style={{ backgroundImage: `url(${avatar})` }}></div>
                        <div className='channel-card-category'>{category}</div>
                    </div>

                    <div className='pt-5 pb-3 d-flex align-items-center justify-content-between'>
                        <Link to={`/channels/${slug}`} className='text-reset'>
                            <h2 className='h3 mb-0'>{truncateStart(title, 20)}</h2>
                        </Link>
                        {!isSubscriber && !isOwner && account !== appOwner ? (
                            <button
                                className='btn btn-primary btn-sm flex-shrink-0 px-3'
                                onClick={() => {
                                    setBuyModalSrc(id, price, title);
                                    setBuyModal(true);
                                }}
                            >
                                <MdSubscriptions className='me-1 mb-1' />
                                Subscribe
                            </button>
                        ) : isOwner && !isSubscriber ? (
                            <Link className='btn btn-success btn-sm px-3 flex-shrink-0' to={`/upload/${slug}`}>
                                <RiUploadCloud2Fill className='mb-1 me-2' />
                                Upload Video
                            </Link>
                        ) : account === appOwner ? (
                            <p className='btn btn-opac-light btn-sm px-3 flex-shrink-0 mb-0 cursor-default'>
                                <MdSubscriptions className='mb-1 me-2' />
                                Owner Access
                            </p>
                        ) : (
                            <p className='btn btn-opac-light btn-sm px-3 flex-shrink-0 mb-0 cursor-default'>
                                <MdSubscriptions className='mb-1 me-2' />
                                Subscribed
                            </p>
                        )}
                    </div>
                    <p className='text-muted'>{truncateStart(bio, 50)}</p>

                    <ul
                        className='d-flex align-items-center list-inline mb-0 text-sm text-muted p-3 bg-gray-850'
                        style={{ borderRadius: '0.3rem' }}
                    >
                        <li className='d-flex align-items-center me-3'>
                            <HiUsers className='text-white me-2' size='1.2rem' />
                            <span>{subscribers.length}</span>
                        </li>
                        <li className='d-flex align-items-center me-3'>
                            <TiVideo className='text-white me-2' size='1.2rem' />
                            <span>{videos?.filter((video) => video?.isApproved).length}</span>
                        </li>
                        <li className='d-flex align-items-center'>
                            <FaEthereum className='text-white me-2' size='1.2rem' />
                            <span>
                                {price} {appSettings.currency}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ChannelCard;
