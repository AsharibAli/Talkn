import React from 'react';

function MetaMaskLoader() {
    return (
        <div className='fullscreen-loader' data-aos='zoom-in-up' data-aos-duration='100'>
            <div className='fullscreen-loader-inner flex-column justify-content-between'>
                <div className='w-100'></div>
                <div className='w-100 text-center p-4'>
                    <p className='text-xl h1'>This normally takes some time</p>
                    <p className='text-muted fw-light mb-1'>
                        We're processing your transaction, please don't reload your browser
                    </p>
                    <p className='text-muted fw-light'>
                        If this took more than expected, you can check your transaction status from{' '}
                        <span className='text-white'>MetaMask activity tab</span>
                    </p>
                </div>
                <div className='w-100 p-4'>
                    <div className='d-flex align-items-center'>
                        <img src='/metamask.png' alt='MetaMask' width='45' className='flex-shrink-0' />
                        <div className='ms-3'>
                            <h6 className='mb-1'>Processing Transaction</h6>
                            <div className='cloud m-0'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MetaMaskLoader;
