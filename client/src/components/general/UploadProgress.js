import React from 'react';

function NetworkAlert({ video, poster, preview, forChannel, avatar, cover }) {
    return (
        <div className='fullscreen-loader' data-aos='zoom-in-up' data-aos-duration='100'>
            <div className='fullscreen-loader-inner'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-7 mx-auto text-center'>
                            <div className='card shadow'>
                                <div className='card-body p-4 p-lg-5'>
                                    <span className='loader-spinner mb-3'></span>
                                    <h2 className='h4 fw-normal mb-1'>Uploading your assets</h2>
                                    <p className='text-muted fw-normal mb-4'>
                                        This could take some time until we save your assets to IFPS...
                                    </p>

                                    {forChannel ? (
                                        <div className='row gy-3'>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center rounded bg-gray-850 p-3'>
                                                    <h6 className='mb-0'>Cover</h6>
                                                    <div
                                                        className='progress mx-3 flex-fill'
                                                        role='progressbar'
                                                        aria-label='Animated striped example'
                                                        aria-valuenow={cover}
                                                        aria-valuemin='0'
                                                        aria-valuemax='100'
                                                        style={{ height: '4px' }}
                                                    >
                                                        <div
                                                            className='progress-bar progress-bar-striped progress-bar-animated'
                                                            style={{ width: `${cover}%` }}
                                                        ></div>
                                                    </div>
                                                    <h6 className='mb-0'>{cover}%</h6>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center rounded bg-gray-850 p-3'>
                                                    <h6 className='mb-0'>Avatar</h6>
                                                    <div
                                                        className='progress mx-3 flex-fill'
                                                        role='progressbar'
                                                        aria-label='Animated striped example'
                                                        aria-valuenow={avatar}
                                                        aria-valuemin='0'
                                                        aria-valuemax='100'
                                                        style={{ height: '4px', width: '4rem' }}
                                                    >
                                                        <div
                                                            className='progress-bar progress-bar-striped progress-bar-animated'
                                                            style={{ width: `${avatar}%` }}
                                                        ></div>
                                                    </div>
                                                    <h6 className='mb-0'>{avatar}%</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='row gy-3'>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center rounded bg-gray-850 p-3'>
                                                    <h6 className='mb-0'>Video</h6>
                                                    <div
                                                        className='progress mx-3 flex-fill'
                                                        role='progressbar'
                                                        aria-label='Animated striped example'
                                                        aria-valuenow={video}
                                                        aria-valuemin='0'
                                                        aria-valuemax='100'
                                                        style={{ height: '4px' }}
                                                    >
                                                        <div
                                                            className='progress-bar progress-bar-striped progress-bar-animated'
                                                            style={{ width: `${video}%` }}
                                                        ></div>
                                                    </div>
                                                    <h6 className='mb-0'>{video}%</h6>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center rounded bg-gray-850 p-3'>
                                                    <h6 className='mb-0'>Preview</h6>
                                                    <div
                                                        className='progress mx-3 flex-fill'
                                                        role='progressbar'
                                                        aria-label='Animated striped example'
                                                        aria-valuenow={preview}
                                                        aria-valuemin='0'
                                                        aria-valuemax='100'
                                                        style={{ height: '4px', width: '4rem' }}
                                                    >
                                                        <div
                                                            className='progress-bar progress-bar-striped progress-bar-animated'
                                                            style={{ width: `${preview}%` }}
                                                        ></div>
                                                    </div>
                                                    <h6 className='mb-0'>{preview}%</h6>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center rounded bg-gray-850 p-3'>
                                                    <h6 className='mb-0'>Poster</h6>
                                                    <div
                                                        className='progress mx-3 flex-fill'
                                                        role='progressbar'
                                                        aria-label='Animated striped example'
                                                        aria-valuenow={poster}
                                                        aria-valuemin='0'
                                                        aria-valuemax='100'
                                                        style={{ height: '4px', width: '4rem' }}
                                                    >
                                                        <div
                                                            className='progress-bar progress-bar-striped progress-bar-animated'
                                                            style={{ width: `${poster}%` }}
                                                        ></div>
                                                    </div>
                                                    <h6 className='mb-0'>{poster}%</h6>
                                                </div>
                                            </div>
                                        </div>
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

export default NetworkAlert;
