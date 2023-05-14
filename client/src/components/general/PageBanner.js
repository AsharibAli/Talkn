import React, { useEffect } from 'react';
import { appSettings } from '../../helpers/settings';

function PageBanner({ heading, text, children }) {
    /*** ----------------------------------------------------- */
    //      CHANGE PAGE TITLE ACCORDING TO THE BANNER TITLE
    /*** ----------------------------------------------------- */
    useEffect(() => {
        document.title = `${appSettings.brandName} | ${heading}`;
    }, [heading]);

    return (
        <>
            <header className='page-banner'>
                <div className='container page-banner-content'>
                    <div className='row'>
                        <div className='col-lg-7 mx-auto text-center'>
                            <h1 className='text-xl' data-aos='fade-up'>
                                {heading}
                            </h1>
                            <p className='text-muted' data-aos='fade-up' data-aos-delay='100'>
                                {text}
                            </p>
                            <div data-aos='fade-up' data-aos-delay='200'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default PageBanner;
