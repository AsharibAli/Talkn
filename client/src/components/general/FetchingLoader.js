import React from 'react';

function FetchingLoader({ heading, message }) {
    return (
        <>
            <section className='py-5'>
                <div className='container py-5 mt-5'>
                    <div className='row'>
                        <div className='col-lg-7 mx-auto text-center'>
                            <p className='h1'>{heading}</p>
                            <p className='text-muted'>{message}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FetchingLoader;
