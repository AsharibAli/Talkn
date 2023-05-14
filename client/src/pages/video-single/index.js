import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MovieBox from '../../components/general/MovieBox';

// HOOKS
import useVideos from '../../hooks/useVideos';
import VideoSignleMock from '../../mock-components/VideoSignleMock';

// COMPONENTS
import Hero from './Hero';

function VideoSinglePage() {
    const { id } = useParams();
    const { contract, channels, loadSingleVideo, videoSingleData } = useVideos();

    /*** ------------------------------------------------ */
    //      GET THE CURRENT VIDEO INFORMATION
    /*** ------------------------------------------------ */
    useEffect(() => {
        if (contract && channels.length > 0) {
            loadSingleVideo(contract, Number(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, channels, id]);

    const videoParentChannel = useMemo(() => {
        return channels?.filter((channel) => channel?.id === videoSingleData?.channelId)[0];
    }, [videoSingleData, channels]);

    const relatedVideos = useMemo(() => {
        return videoParentChannel?.videos?.filter((video) => video?.videoId !== videoSingleData?.videoId);
    }, [videoSingleData, videoParentChannel]);

    return (
        <>
            {videoSingleData && videoSingleData?.videoId !== '0' ? (
                <>
                    <Hero {...videoSingleData} />
                    {relatedVideos?.length > 0 && (
                        <section className='py-5'>
                            <div className='container py-5'>
                                <header className='mb-5 text-center' data-aos='fade-up'>
                                    <h2 className='h1'>
                                        Similar from <span className='text-primary'>{videoParentChannel?.title}</span>
                                    </h2>
                                </header>

                                <div className='row justify-content-center g-3'>
                                    {relatedVideos?.slice(0, 3).map((video, index) => {
                                        return (
                                            <div className='col-xl-3 col-lg-4' key={index}>
                                                <MovieBox {...video} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            ) : (
                <VideoSignleMock />
            )}
        </>
    );
}

export default VideoSinglePage;
