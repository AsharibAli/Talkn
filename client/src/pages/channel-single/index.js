import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import { TiVideo } from 'react-icons/ti';
import { HiUsers } from 'react-icons/hi';
import { MdSubscriptions } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { appSettings } from '../../helpers/settings';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { truncate, configEtherScanUrl } from '../../helpers/utils';
import ReactPaginate from 'react-paginate';

// HOOKS
import useWeb3 from '../../hooks/useWeb3';
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import NotFound from '../../components/NotFound';
import MovieBox from '../../components/general/MovieBox';

function ChannelSinglePage() {
    const { channels, setBuyModalSrc, setBuyModal, owner } = useVideos();
    const { account, networkId, username } = useWeb3();
    const [channelData, setChannelData] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(channelData[0]?.videos?.length / itemsPerPage);
    const { slug } = useParams();

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % channelData[0]?.videos?.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        if (channels?.length > 0) {
            setChannelData(channels?.filter((channel) => channel?.slug === slug));
        }
    }, [channels, slug]);

    useEffect(() => {
        document.title = `${appSettings.brandName} | ${channelData[0]?.title}`;
    }, [channelData]);

    if (channelData?.length === 0) {
        return <NotFound />;
    }

    return (
        <>
            <section className='py-5'>
                <div className='container py-5 mt-5 mt-lg-0'>
                    <div
                        className='channel-page-cover mb-5'
                        style={{ backgroundImage: `url(${channelData[0]?.cover})` }}
                    >
                        <div
                            className='channel-page-avatar'
                            style={{ backgroundImage: `url(${channelData[0]?.avatar})` }}
                        ></div>

                        <div className='d-flex justify-content-end p-3 position-absolute end-0 bottom-0'>
                            {account !== channelData[0]?.owner ? (
                                <>
                                    {channelData[0]?.subscribers?.map((user) => user?.address)?.includes(account) ? (
                                        <p className='btn btn-opac-light btn-sm px-3 flex-shrink-0 mb-0 cursor-default'>
                                            <MdSubscriptions className='mb-1 me-2' />
                                            Subscribed
                                        </p>
                                    ) : account === owner ? (
                                        <p className='btn btn-opac-light btn-sm px-3 flex-shrink-0 mb-0 cursor-default'>
                                            <MdSubscriptions className='mb-1 me-2' />
                                            Owner Access
                                        </p>
                                    ) : (
                                        <button
                                            className='btn btn-primary btn-sm px-3 flex-shrink-0'
                                            onClick={() => {
                                                setBuyModalSrc(
                                                    channelData[0]?.id,
                                                    channelData[0]?.price,
                                                    channelData[0]?.title
                                                );
                                                setBuyModal(true);
                                            }}
                                        >
                                            <MdSubscriptions className='mb-1 me-2' />
                                            Subscribe
                                        </button>
                                    )}
                                </>
                            ) : (
                                <Link
                                    className='btn btn-success btn-sm px-3 flex-shrink-0'
                                    to={`/upload/${channelData[0]?.slug}`}
                                >
                                    <RiUploadCloud2Fill className='mb-1 me-2' />
                                    Upload Video
                                </Link>
                            )}
                        </div>
                    </div>

                    <h1 className='mb-2'>{channelData[0]?.title}</h1>
                    <div className='mb-5 px-3 py-2 rounded bg-gray-900 d-inline-block'>
                        <ul className='d-flex align-items-center list-inline text-sm mb-0'>
                            <li className='d-flex align-items-center me-3'>
                                <HiUsers className='text-primary me-2' size='1.2rem' />
                                <span>{channelData[0]?.subscribers.length}</span>
                            </li>
                            <li className='d-flex align-items-center me-3'>
                                <TiVideo className='text-primary me-2' size='1.2rem' />
                                <span>{channelData[0]?.videos?.filter((video) => video?.isApproved).length}</span>
                            </li>
                            <li className='d-flex align-items-center'>
                                <FaEthereum className='text-primary me-2' size='1.2rem' />
                                <span>
                                    {channelData[0]?.price} {appSettings.currency}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <ul
                        className='nav nav-tabs rounded-tabs flex-column flex-sm-row mb-5'
                        id='channelTab'
                        role='tablist'
                    >
                        <li className='nav-item flex-fill' role='presentation'>
                            <button
                                className='nav-link h5 mb-0 w-100 active'
                                id='videos-tab'
                                data-bs-toggle='tab'
                                data-bs-target='#videos-tab-pane'
                                type='button'
                                role='tab'
                                aria-controls='videos-tab-pane'
                                aria-selected='true'
                            >
                                Videos
                            </button>
                        </li>
                        <li className='nav-item flex-fill' role='presentation'>
                            <button
                                className='nav-link h5 mb-0 w-100'
                                id='about-tab'
                                data-bs-toggle='tab'
                                data-bs-target='#about-tab-pane'
                                type='button'
                                role='tab'
                                aria-controls='about-tab-pane'
                                aria-selected='false'
                            >
                                About
                            </button>
                        </li>
                        <li className='nav-item flex-fill' role='presentation'>
                            <button
                                className='nav-link h5 mb-0 w-100'
                                id='subscribers-tab'
                                data-bs-toggle='tab'
                                data-bs-target='#subscribers-tab-pane'
                                type='button'
                                role='tab'
                                aria-controls='subscribers-tab-pane'
                                aria-selected='false'
                            >
                                Subscribers
                            </button>
                        </li>
                    </ul>
                    <div className='tab-content' id='channelTabContent'>
                        <div
                            className='tab-pane fade show active'
                            id='videos-tab-pane'
                            role='tabpanel'
                            aria-labelledby='videos-tab'
                            tabIndex='0'
                        >
                            {account === channelData[0]?.owner &&
                                channelData[0]?.videos?.filter((video) => !video?.isApproved)?.length > 0 && (
                                    <>
                                        <h2 className='mb-0'>Pending Videos</h2>
                                        <p className='text-muted mb-4'>
                                            You're as the channel owner will only who can see these pending videos
                                        </p>
                                        <div className='row g-3 mb-5'>
                                            {channelData[0]?.videos
                                                ?.filter((video) => !video?.isApproved)
                                                .map((video, index) => {
                                                    return (
                                                        <div className='col-xl-3 col-lg-4 col-md-6' key={index}>
                                                            <MovieBox {...video} />
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </>
                                )}
                            {channelData[0]?.videos?.filter((video) => video?.isApproved)?.length > 0 ? (
                                <>
                                    <h2 className='mb-0'>Approved Videos</h2>
                                    <p className='text-muted mb-4'>
                                        These videos will be visible for all users, only subscribers can watch their
                                        content
                                    </p>
                                    <div className='row g-3'>
                                        {channelData[0]?.videos
                                            ?.filter((video) => video?.isApproved)
                                            ?.slice(itemOffset, endOffset)
                                            .map((video, index) => {
                                                return (
                                                    <div className='col-xl-3 col-lg-4 col-md-6' key={index}>
                                                        <MovieBox {...video} />
                                                    </div>
                                                );
                                            })}

                                        {channelData[0]?.videos?.filter((video) => video?.isApproved)?.length > 0 && (
                                            <div className='col-12 mt-5'>
                                                {/* PAGINATION */}
                                                <div className='react-pagination'>
                                                    <ReactPaginate
                                                        breakLabel='...'
                                                        nextLabel={<BiRightArrowAlt />}
                                                        onPageChange={handlePageClick}
                                                        pageRangeDisplayed={5}
                                                        pageCount={pageCount}
                                                        previousLabel={<BiLeftArrowAlt />}
                                                        renderOnZeroPageCount={null}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='d-flex align-items-center mb-3'>
                                        <TiVideo className='me-2 text-primary' size='1.3rem' />
                                        <p className='mb-0'>This channel has not any videos yet</p>
                                    </div>
                                    {account === channelData[0]?.owner && (
                                        <Link
                                            className='btn btn-opac-info btn-sm px-4'
                                            to={`/upload/${channelData[0]?.slug}`}
                                        >
                                            <RiUploadCloud2Fill className='mb-1 me-2' />
                                            Start uploading now
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                        <div
                            className='tab-pane fade'
                            id='about-tab-pane'
                            role='tabpanel'
                            aria-labelledby='about-tab'
                            tabIndex='0'
                        >
                            <h3 className='h4 mb-4'>Channel Owner</h3>
                            <a
                                href={configEtherScanUrl(networkId, channelData[0]?.owner)}
                                rel='noopener noreferrer'
                                className='text-reset mb-5 d-inline-block'
                                target='_blank'
                            >
                                <div className='d-flex align-items-center'>
                                    <div className='avatar avatar-md2'>
                                        <div style={{ width: '40px', height: '40px' }}>
                                            <Jazzicon address={channelData[0]?.owner || ''} />
                                        </div>
                                    </div>
                                    <div className='ms-3'>
                                        <h6 className='mb-1'>
                                            {channelData[0]?.owner !== account ? channelData[0]?.ownerName : username}
                                        </h6>
                                        <p className='text-muted small mb-0'>
                                            {truncate(channelData[0]?.owner, 15, '.....')}
                                        </p>
                                    </div>
                                </div>
                            </a>

                            <h3 className='h4 mb-4'>About {channelData[0]?.title}</h3>
                            <div className='row'>
                                <div className='col-lg-7'>
                                    <p className='text-gray-500 fs-6'>{channelData[0]?.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className='tab-pane fade'
                            id='subscribers-tab-pane'
                            role='tabpanel'
                            aria-labelledby='subscribers-tab'
                            tabIndex='0'
                        >
                            {channelData[0]?.subscribers?.length > 0 ? (
                                <ul className='list-inline'>
                                    {channelData[0]?.subscribers?.map((user, index) => {
                                        return (
                                            <li className='list-inline-item me-4 mb-3' key={index}>
                                                <a
                                                    href={configEtherScanUrl(networkId, user?.address)}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='text-reset'
                                                >
                                                    <div className='d-flex align-items-center'>
                                                        <div className='avatar avatar-md2'>
                                                            <div style={{ width: '30px', height: '30px' }}>
                                                                <Jazzicon address={user?.address || ''} />
                                                            </div>
                                                        </div>
                                                        <div className='ms-3'>
                                                            <h6 className='mb-1' style={{ fontSize: '0.9rem' }}>
                                                                {user?.address !== account ? user?.name : username}
                                                            </h6>
                                                            <p className='text-muted small mb-0'>
                                                                {truncate(user?.address, 15, '.....')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p>No subscribers yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChannelSinglePage;
