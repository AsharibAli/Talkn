import React from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs';
import { BsFillPlayFill } from 'react-icons/bs';

function VideoSinglePageMock() {
    return (
        <>
            <div className='hero-slide mock py-5 overflow-hidden flow-font'>
                <div className='hero-slide-bg'></div>
                <div className='container z-index-20 py-5 mt-5'>
                    <div className='row gy-5 align-items-center mb-5'>
                        <div className='col-lg-8 mx-auto text-center'>
                            <ul className='list-inline'>
                                <li className='list-inline-item'>
                                    <div className='badge bg-green fw-normal rounded-0'>Action</div>
                                </li>
                                <li className='list-inline-item'>
                                    <div className='badge bg-green fw-normal rounded-0'>Fantasy</div>
                                </li>
                            </ul>
                            <h2 className='h1 text-xxl text-shadow flow-font'>Lorem ipsum</h2>
                            <ul className='list-inline d-flex align-items-center justify-content-center'>
                                <li className='list-inline-item d-flex align-items-center'>
                                    <BsFillClockFill className='text-warning' />
                                    <span className='small ms-2'>2.3</span>
                                </li>
                                <li className='list-inline-item ms-2 lh-1' style={{ fontSize: '0.7rem' }}>
                                    |
                                </li>
                                <li className='list-inline-item'>
                                    <span className='small ms-2'>2015</span>
                                </li>
                                <li className='list-inline-item ms-2 lh-1' style={{ fontSize: '0.7rem' }}>
                                    |
                                </li>
                                <li className='list-inline-item'>
                                    <span className='small ms-2'>1hr 57min</span>
                                </li>
                            </ul>
                            <p className='text-gray-500 lead fw-light mb-4'>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, nesciunt odit. Iste
                                iure autem dicta magnam officia, fugiat corporis in quibusdam eveniet dignissimos
                                blanditiis omnis. Iusto ipsum quidem quos est.
                            </p>
                            <ul className='list-inline'>
                                <li className='list-inline-item'>
                                    <a href='#!' className='btn btn-primary'>
                                        <BsFillPlayFill className='mb-1 me-2' size='1.35rem' />
                                        Play Now
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a href='#!' className='btn btn-outline-light'>
                                        <AiOutlineAppstoreAdd className='mb-1 me-2' size='1.35rem' />
                                        Add to my list
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-10 mx-auto'>
                            <div className='px-5'>
                                <img
                                    src='/movie-mock-lg.png'
                                    alt='Sample Movie Mock'
                                    className='img-fluid hero-slide-img d-block ms-auto shadow-lg w-100'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoSinglePageMock;
