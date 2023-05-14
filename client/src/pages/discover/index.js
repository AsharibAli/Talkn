import React, { useState, useMemo } from 'react';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { appSettings } from '../../helpers/settings';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

// HOOKS
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import PageBanner from '../../components/general/PageBanner';
import MovieBox from '../../components/general/MovieBox';

function DiscoverPage() {
    const { allVideos } = useVideos();
    const [genreFilter, setGenreFilter] = useState({ label: 'All', value: 'All' });
    const [dateFilter, setDateFilter] = useState({ label: 'Newest First', value: 'newest' });
    const [priceFilter, setPriceFilter] = useState({ label: 'Select', value: 'All' });
    const [durationFilter, setDurationFilter] = useState({ label: 'Select', value: 'Select' });
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;
    const endOffset = itemOffset + itemsPerPage;

    const filteredResult = useMemo(() => {
        if (genreFilter?.value === 'All') {
            return allVideos.filter((vid) => vid.isApproved);
        } else if (genreFilter?.value !== 'All') {
            return allVideos.filter((vid) => vid.isApproved).filter((vid) => vid?.category === genreFilter?.value);
        } else {
            return allVideos.filter((vid) => vid.isApproved);
        }
        // eslint-disable-next-line
    }, [genreFilter, dateFilter, priceFilter, durationFilter, allVideos]);

    const pageCount = Math.ceil(allVideos.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % allVideos.length;
        setItemOffset(newOffset);
    };

    function handleDateFilter(val) {
        setDateFilter(val);
        // setPriceFilter({ label: 'Select', value: 'Select' });
        setDurationFilter({ label: 'Select', value: 'Select' });
    }

    function handleDurationFilter(val) {
        setDurationFilter(val);
        // setPriceFilter({ label: 'Select', value: 'Select' });
        setDateFilter({ label: 'Newest First', value: 'newest' });
    }

    function handlePriceFilter(val) {
        setPriceFilter(val);
    }

    console.log(priceFilter);

    return (
        <>
            <PageBanner
                heading='Discover All Videos'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            >
                <li className='list-inline-item m-1'>
                    <Link className='btn btn-light text-dark' to='/upload/general'>
                        Upload a Video
                    </Link>
                </li>
            </PageBanner>

            {allVideos?.filter((video) => video?.isApproved)?.length > 0 ? (
                <section className='pt-5 z-index-20'>
                    <div className='container py-5'>
                        <div className='row'>
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
                                            options={[{ label: 'All', value: 'All' }, ...appSettings.genresOptions]}
                                            className='border-0 shadow-sm'
                                            classNamePrefix='select'
                                            placeholder='Select'
                                            onChange={setGenreFilter}
                                            isSearchable={false}
                                            value={genreFilter}
                                            autosize={true}
                                        />
                                    </li>
                                    <li className='list-inline-item me-3 my-2 flex-fill'>
                                        <label htmlFor='priceSort' className='form-label'>
                                            Filter by Accessibility
                                        </label>

                                        <Select
                                            options={[
                                                { label: 'All', value: 'All' },
                                                { label: 'Free', value: false },
                                                { label: 'Premium', value: true },
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
                                    <li className='list-inline-item me-3 my-2 flex-fill'>
                                        <label htmlFor='priceSort' className='form-label'>
                                            Sort by Duration
                                        </label>

                                        <Select
                                            options={[
                                                { label: 'Longest First', value: 'longest' },
                                                { label: 'Shortest First', value: 'shortest' },
                                            ]}
                                            className='border-0 shadow-sm'
                                            classNamePrefix='select'
                                            placeholder='Select'
                                            onChange={(value) => handleDurationFilter(value)}
                                            isSearchable={false}
                                            value={durationFilter}
                                            autosize={true}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className='pt-5 z-index-20'>
                    <div className='container py-5'>
                        <div className='row'>
                            <div className='col-lg-6 mx-auto' data-aos='fade-up'>
                                <div className='text-center'>
                                    <h2>It's Empty Here</h2>
                                    <p className='text-muted'>There're no channels at the moment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className='pb-5'>
                <div className='container pb-5'>
                    <div className='row justify-content-center g-3'>
                        {filteredResult?.length > 0
                            ? filteredResult
                                  .filter((video) => {
                                      if (priceFilter?.value === 'All') {
                                          return video;
                                      } else {
                                          return video.isPremium === priceFilter?.value;
                                      }
                                  })
                                  .sort((a, b) => {
                                      if (dateFilter.value === 'newest') {
                                          return b.createdAt - a.createdAt;
                                      } else {
                                          return a.createdAt - b.createdAt;
                                      }
                                  })
                                  .sort((a, b) => {
                                      if (priceFilter.value === 'heighPrice') {
                                          return b.price - a.price;
                                      } else if (priceFilter.value === 'lowPrice') {
                                          return a.price - b.price;
                                      }
                                      return a - b;
                                  })
                                  .sort((a, b) => {
                                      if (durationFilter.value === 'longest') {
                                          return b.rawDuration - a.rawDuration;
                                      } else if (durationFilter.value === 'shortest') {
                                          return a.rawDuration - b.rawDuration;
                                      }
                                      return a - b;
                                  })
                                  .slice(itemOffset, endOffset)
                                  .map((vid) => {
                                      return (
                                          <div className='col-xxl-3 col-lg-4 col-md-6' key={vid.videoId}>
                                              <MovieBox {...vid} />
                                          </div>
                                      );
                                  })
                            : allVideos?.length > 0 && (
                                  <div className='text-center'>
                                      <h3>No Results Found</h3>
                                      <p>There're no records matches these filters</p>
                                  </div>
                              )}
                    </div>
                </div>

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
            </section>
        </>
    );
}

export default DiscoverPage;
