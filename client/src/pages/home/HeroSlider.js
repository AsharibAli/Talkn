import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper';

// COMPONENTS
import HeroSlide from './HeroSlide';
import HeroSlideMock from '../../mock-components/HeroSlideMock';

function HeroSlider({ data }) {
    return (
        <section>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                effect={'fade'}
                modules={[EffectFade, Autoplay]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
            >
                {data?.length > 0 ? (
                    data.map((vid) => {
                        return (
                            <SwiperSlide key={vid.videoId}>
                                <HeroSlide {...vid} />
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <SwiperSlide>
                        <HeroSlideMock />
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    );
}

export default HeroSlider;
