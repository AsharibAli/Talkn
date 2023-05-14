import React, { useState, useMemo } from 'react';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { appSettings } from '../../helpers/settings';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

// COMPONENTS
import PageBanner from '../../components/general/PageBanner';
import ChannelCard from '../../components/general/ChannelCard';
import ConnectWalletHander from '../../components/general/ConnectWalletHandler';

function AllChannelsPage() {
    const { channels } = useVideos();
    const { account } = useWeb3();
    const [categoryFilter, setCategoryFilter] = useState({ label: 'All', value: 'All' });
    const [dateFilter, setDateFilter] = useState({ label: 'Newest First', value: 'newest' });
    const [priceFilter, setPriceFilter] = useState({ label: 'Select', value: 'Select' });
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 9;
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(channels.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % channels.length;
        setItemOffset(newOffset);
    };

    const filteredResult = useMemo(() => {
        if (categoryFilter?.value === 'All') {
            return channels;
        } else if (categoryFilter?.value !== 'All') {
            return channels.filter((channel) => channel?.category === categoryFilter?.value);
        } else {
            return channels;
        }
        // eslint-disable-next-line
    }, [categoryFilter, dateFilter, priceFilter, channels]);

    function handleDateFilter(val) {
        setDateFilter(val);
        setPriceFilter({ label: 'Select', value: 'Select' });
    }
    function handlePriceFilter(val) {
        setPriceFilter(val);
        setDateFilter({ label: 'Select', value: 'Select' });
    }

    return (
        <>
            <PageBanner
                heading='Channels'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            >
                {account ? (
                    <Link className='btn btn-primary' to='/create-channel'>
                        Create a New Channel
                    </Link>
                ) : (
                    <ConnectWalletHander />
                )}
            </PageBanner>
            <section className='py-5'>
                <div className='container py-5'>
                    {/* FILTERS */}
                    {channels?.length > 0 ? (
                        <div className='row z-index-20 mb-5'>
                            <div className='col-lg-6 mx-auto' data-aos='fade-up'>
                                <ul
                                    className='list-inline d-flex justify-content-center flex-wrap z-index-20'
                                    style={{ borderRadius: '0.5rem' }}
                                >
                                    <li className='list-inline-item me-3 my-2 flex-fill'>
                                        <label htmlFor='categoryFilter' className='form-label'>
                                            Filter by Genre
                                        </label>

                                        <Select
                                            options={[{ label: 'All', value: 'All' }, ...appSettings.channelCategories]}
                                            className='border-0 shadow-sm'
                                            classNamePrefix='select'
                                            placeholder='Select'
                                            onChange={setCategoryFilter}
                                            isSearchable={false}
                                            value={categoryFilter}
                                            autosize={true}
                                        />
                                    </li>
                                    <li className='list-inline-item me-3 my-2 flex-fill'>
                                        <label htmlFor='dateSort' className='form-label'>
                                            Sort by Date
                                        </label>

                                        <Select
                                            options={[
                                                { label: 'Newest First', value: 'newest' },
                                                { label: 'Oldest First', value: 'oldest' },
                                            ]}
                                            className='border-0 shadow-sm'
                                            classNamePrefix='select'
                                            placeholder='Select'
                                            onChange={(value) => handleDateFilter(value)}
                                            isSearchable={false}
                                            value={dateFilter}
                                            autosize={true}
                                        />
                                    </li>
                                    <li className='list-inline-item my-2 flex-fill'>
                                        <label htmlFor='dateSort' className='form-label'>
                                            Sort by Price
                                        </label>

                                        <Select
                                            options={[
                                                { label: 'Highest Price', value: 'heighPrice' },
                                                { label: 'Lowest Price', value: 'lowPrice' },
                                            ]}
                                            className='border-0 shadow-sm'
                                            classNamePrefix='select'
                                            placeholder='Select'
                                            onChange={(value) => handlePriceFilter(value)}
                                            isSearchable={false}
                                            value={priceFilter}
                                            autosize={true}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <section className='z-index-20'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-6 mx-auto' data-aos='fade-up'>
                                        <div className='text-center'>
                                            <h2>It's Empty Here</h2>
                                            <p className='text-muted'>There're no videos at the moment.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    <div className='row g-3 justify-content-center'>
                        {filteredResult
                            ?.sort((a, b) => {
                                if (dateFilter.value === 'newest') {
                                    return b.createdAt - a.createdAt;
                                } else {
                                    return a.createdAt - b.createdAt;
                                }
                            })
                            ?.sort((a, b) => {
                                if (priceFilter.value === 'heighPrice') {
                                    return b.price - a.price;
                                } else if (priceFilter.value === 'lowPrice') {
                                    return a.price - b.price;
                                }
                                return a - b;
                            })
                            ?.slice(itemOffset, endOffset)
                            ?.map((channel, index) => {
                                return (
                                    <div
                                        className='col-xl-4 col-lg-6'
                                        key={index}
                                        data-aos='fade-up'
                                        data-aos-delay={`${index * 100}`}
                                    >
                                        <ChannelCard {...channel} />
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* PAGINATION */}
                {filteredResult?.length > 0 ? (
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
                ) : (
                    channels?.length > 0 && (
                        <div className='text-center'>
                            <h3>No Results Found</h3>
                            <p>There're no records matches these filters</p>
                        </div>
                    )
                )}
            </section>
        </>
    );
}

export default AllChannelsPage;
