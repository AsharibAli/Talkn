import React from 'react';
import ReactPlayer from 'react-player';

// HOOKS
import useVideos from '../../hooks/useVideos';
import useWeb3 from '../../hooks/useWeb3';

// COMPONENTS
import ConnectWalletHander from './ConnectWalletHandler';
import ChannelInfo from './ChannelInfo';

function PreviewModal() {
    const { preview, setPreviewModal } = useVideos();
    const { account } = useWeb3();

    return (
        <div className='fullscreen-loader' data-aos='zoom-in-up' data-aos-duration='100'>
            <div className='fullscreen-loader-inner p-4'>
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-xl-6 col-lg-7 mx-auto text-center'>
                            <div className='card shadow position-relative preview-modal'>
                                <div className='position-absolute m-3 top-0 end-0'>
                                    <button
                                        className='btn btn-dark btn-sm z-index-20'
                                        type='button'
                                        onClick={() => setPreviewModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                                <div className='card-body p-4 p-lg-5'>
                                    <h2 className='h1 mb-2'>Video Trailer</h2>
                                    <p className='text-muted mb-5'>Short preview from the original video</p>
                                    <ReactPlayer url={preview?.preview} controls={true} width='100%' height='auto' />

                                    {account ? (
                                        <div className='text-start'>
                                            <ChannelInfo
                                                channelId={preview?.channelId}
                                                videoId={preview?.videoId}
                                                UIType='hero'
                                                fromPreview={true}
                                            />
                                        </div>
                                    ) : (
                                        <ConnectWalletHander customClass='my-3' />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewModal;
