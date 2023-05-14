import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AiFillVideoCamera } from 'react-icons/ai';

// HOOKS
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import MovieBox from '../../components/general/MovieBox';

function LatestPremiumVideos() {
    const { allVideos } = useVideos();

    return (
        <>
            <section className='pb-5 '>
                <div className='container pb-5'>
                    <h2 className='text-lg lh-1 mb-3 d-flex align-items-center'>
                        <AiFillVideoCamera size='3.5rem' className='text-primary' />
                        <span className='ms-2'>Recent Premium Videos</span>
                    </h2>
                    <div className='row mb-4'>
                        <div className='col-lg-6'>
                            <p className='text-muted'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate aliquam libero nam
                                similique, et, laborum vitae qui porro at minus non.
                            </p>
                        </div>
                    </div>

                    {allVideos
                        ?.filter((video) => video?.isApproved)
                        ?.filter((video) => video?.isPremium)
                        ?.filter((video) => !video?.isBlocked)
                        ?.sort((a, b) => b.createdAt - a.createdAt)?.length === 0 && (
                        <p className='lead'>There's no videos at the moment</p>
                    )}

                    <div className='swiper-slow swiper-wrapper-padding'>
                        <Swiper
                            spaceBetween={15}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                991: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                },
                            }}
                        >
                            {allVideos
                                ?.filter((video) => video?.isApproved)
                                ?.filter((video) => video?.isPremium)
                                ?.filter((video) => !video?.isBlocked)
                                ?.sort((a, b) => b.createdAt - a.createdAt)
                                .map((video, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div data-aos='fade-up' data-aos-delay={`${index * 100}`}>
                                                <MovieBox {...video} />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LatestPremiumVideos;
