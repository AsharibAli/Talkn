import React from 'react';

// HOOKS
import MovieBox from '../../components/general/MovieBox';
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import PageBanner from '../../components/general/PageBanner';

function MyListPage() {
    const { watchList } = useVideos();

    return (
        <>
            <PageBanner
                heading='My Watchlist'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>
            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row g-3 justify-content-center'>
                        {watchList.map((video, i) => {
                            return (
                                <div className='col-lg-3 col-md-4 col-sm-6' key={i}>
                                    <MovieBox {...video} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyListPage;
