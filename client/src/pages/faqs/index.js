import React from 'react';
import { FAQS } from '../../helpers/constants';

// COMPOENENTS
import PageBanner from '../../components/general/PageBanner';

function FAQsPage() {
    return (
        <>
            <PageBanner
                heading='Frequently Asked Questions'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>

            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-lg-7 mx-auto'>
                            <div className='accordion accordio-minimal' id='faqs'>
                                {FAQS.map((item, index) => {
                                    return (
                                        <div
                                            className='accordion-item'
                                            key={index}
                                            data-aos='fade-up'
                                            data-aos-delay={`${index * 100}`}
                                        >
                                            <h2 className='accordion-header' id={`heading${index}`}>
                                                <button
                                                    className='accordion-button'
                                                    type='button'
                                                    data-bs-toggle='collapse'
                                                    data-bs-target={`#collapse${index}`}
                                                    aria-expanded={index === 0 ? 'true' : 'false'}
                                                    aria-controls={`collapse${index}`}
                                                >
                                                    {item.question}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${index}`}
                                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                aria-labelledby={`heading${index}`}
                                                data-bs-parent='#faqs'
                                            >
                                                <div className='accordion-body'>{item.answer}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FAQsPage;
