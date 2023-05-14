import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

// HOOKS
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import PageBanner from '../../components/general/PageBanner';
import MovieBox from '../../components/general/MovieBox';
import ChannelCard from '../../components/general/ChannelCard';

function SearchPage() {
    const { allVideos, channels } = useVideos();
    const [searchInputVal, setSearchInputVal] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [resultsPerView, setResultsPerView] = useState(8);
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('Videos');

    /*** ------------------------------------------------ */
    //      SEARCH FUNCTION SUBMIT
    /*** ------------------------------------------------ */
    function handleSearchSubmit(e) {
        e.preventDefault();
        setSearchQuery((prev) => searchInputVal);
        if (searchType === 'Videos') {
            setSearchResults((prev) =>
                allVideos
                    ?.filter((vid) => vid?.isApproved)
                    .filter((vid) =>
                        vid?.title.toLowerCase().includes(searchInputVal?.toLowerCase()?.replace(/\s/g, ''))
                    )
            );
        } else if (searchType === 'Channels') {
            setSearchResults((prev) =>
                channels.filter((channel) =>
                    channel?.title.toLowerCase().includes(searchInputVal?.toLowerCase()?.replace(/\s/g, ''))
                )
            );
        }
    }

    function handleSearchType(type) {
        setSearchType(type);
        setSearchResults([]);
        setSearchQuery('');
        setSearchInputVal('');
    }

    /*** ------------------------------------------------ */
    //      CATCH SEARCH INPUT VALUE
    /*** ------------------------------------------------ */
    function handleSearchInput(val) {
        if (val === '') {
            setSearchQuery('');
            setSearchInputVal(val);
        }
        setSearchInputVal(val);
    }

    /*** ------------------------------------------------ */
    //      HANDLE SEARCH RESULTS
    /*** ------------------------------------------------ */
    function handleResultsPerView() {
        setResultsPerView((prev) => prev + 4);
    }

    return (
        <>
            <PageBanner
                heading="What you're looking for? "
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            >
                <form onSubmit={handleSearchSubmit}>
                    <div className='form-floating position-relative'>
                        <input
                            id='searchInput'
                            type='text'
                            className='form-control'
                            placeholder='Search for vidoes'
                            value={searchInputVal}
                            onChange={(e) => handleSearchInput(e.target.value)}
                            autoComplete='off'
                        />
                        <label htmlFor='searchInput'>Search for {searchType?.toLowerCase()}</label>

                        <div className='dropdwon'>
                            <a
                                className='btn btn-secondary search-inner-btn dropdown-toggle no-caret d-flex align-items-center text-reset show'
                                id='accountDropdown'
                                role='button'
                                data-bs-toggle='dropdown'
                                data-bs-target='#searchTypeDropdown'
                                aria-expanded='false'
                                href='/'
                            >
                                <BiSearchAlt className='me-1' size='1.3rem' style={{ transfrom: 'translateY(-3px)' }} />{' '}
                                {searchType}
                            </a>

                            <ul
                                className='dropdown-menu dropdown-menu-end'
                                id='searchTypeDropdown'
                                data-bs-popper='static'
                                style={{ minWidth: '7rem' }}
                            >
                                <li>
                                    <button
                                        type='button'
                                        className={`dropdown-item rounded ${searchType === 'Videos' && 'active'}`}
                                        onClick={() => {
                                            handleSearchType('Videos');
                                        }}
                                    >
                                        <BiSearchAlt
                                            className='me-1'
                                            size='1.3rem'
                                            style={{ transfrom: 'translateY(-3px)' }}
                                        />{' '}
                                        Videos
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type='button'
                                        className={`dropdown-item rounded ${searchType === 'Channels' && 'active'}`}
                                        onClick={() => {
                                            handleSearchType('Channels');
                                        }}
                                    >
                                        <BiSearchAlt
                                            className='me-1'
                                            size='1.3rem'
                                            style={{ transfrom: 'translateY(-3px)' }}
                                        />{' '}
                                        Channels
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button className='btn btn-primary w-100 mt-2' type='submit' disabled={searchInputVal.length < 3}>
                        <BiSearchAlt className='me-1' size='1.3rem' style={{ transfrom: 'translateY(-3px)' }} /> Search
                    </button>

                    <div className='mt-4'>
                        {searchQuery === '' && searchResults.length === 0 ? (
                            <p className='text-muted'>
                                Your Search results will appear below, minimum search query length is 3 characters
                            </p>
                        ) : searchResults.length > 0 ? (
                            <p className='lead text-muted'>
                                We've found
                                <strong className='fw-bold text-white px-2'>
                                    {searchResults.length} {searchResults.length < 2 ? 'Item' : 'Items'}
                                </strong>
                                {searchResults.length < 2 ? 'matches' : 'match'} the search term{' '}
                                <strong className='fw-bold text-white'>{searchQuery}</strong>
                            </p>
                        ) : (
                            searchResults.length === 0 &&
                            searchQuery !== '' && (
                                <p className='lead'>Sorry! We've not found any records matches your search</p>
                            )
                        )}
                    </div>
                </form>
            </PageBanner>
            <section className='py-5' style={{ marginTop: '-6rem', zIndex: '30' }}>
                <div className='container py-5'>
                    {searchType === 'Videos' && (
                        <div className='row g-3 justify-content-center'>
                            {searchResults?.slice(0, resultsPerView)?.map((video, i) => {
                                return (
                                    <div className='col-lg-3 col-md-4 col-sm-6' key={i}>
                                        <MovieBox {...video} />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {searchType === 'Channels' && (
                        <div className='row g-3 justify-content-center'>
                            {searchResults?.slice(0, resultsPerView)?.map((channel, i) => {
                                return (
                                    <div className='col-lg-4 col-md-6' key={i}>
                                        <ChannelCard {...channel} />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {searchResults.length > resultsPerView && (
                        <div className='mt-4 text-center'>
                            <button className='btn btn-primary' type='button' onClick={handleResultsPerView}>
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default SearchPage;
