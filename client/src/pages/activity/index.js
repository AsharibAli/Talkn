import React from 'react';

// COMPONENTS
import PageBanner from '../../components/general/PageBanner';
import ActivitiesTable from './ActivitiesTable';

function ActivitesPage() {
    return (
        <>
            <PageBanner
                heading='Activities'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>

            <section className='py-5'>
                <div className='container py-5'>
                    <div className='mb-5'>
                        <ActivitiesTable />
                    </div>
                </div>
            </section>
        </>
    );
}

export default ActivitesPage;
