import React from 'react';
import { appSettings } from '../../helpers/settings';

function Footer() {
    return (
        <footer className='main-footer'>
            <div className='container py-3 mt-4'>
                <p className='text-muted mb-0 text-center text-sm'>
                    Created by{' '}
                    <a href={appSettings.copyrightsLink} className='text-primary'>
                        {appSettings.copyrightsBrand}
                    </a>{' '}
                    {new Date().getFullYear()}. &copy; All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
