import React, { useRef, useState } from 'react';
import PageBanner from '../../components/general/PageBanner';
import { sendFormData } from '../../helpers/utils';
import { useForm } from 'react-hook-form';
import { appSettings } from '../../helpers/settings';
import { FaRegSmileBeam } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function FeaturesRequestsPage() {
    const [formspreeState, setFormsPreeState] = useState(false);
    const [formspreeSendingState, setFormsPreeSendingState] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formRef = useRef();
    const handleSucceeding = () => setFormsPreeState(true);
    const handleFailing = () => setFormsPreeState(false);
    const handleStartLoading = () => setFormsPreeSendingState(true);
    const handleStopLoading = () => setFormsPreeSendingState(true);

    function handleFormSubmit() {
        sendFormData(
            formRef.current,
            appSettings.requestFeatureFormId,
            handleSucceeding,
            handleFailing,
            handleStartLoading,
            handleStopLoading
        );
    }

    return (
        <>
            <PageBanner
                heading='Ask for a Feature'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>

            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-lg-7 mx-auto' data-aos='fade-up'>
                            <div className='card'>
                                <div className='card-body p-lg-5'>
                                    <div className='row'>
                                        <div className='col-lg-10 mx-auto text-center'>
                                            <h2 className='h3 mb-2'>Tell us about the feature you need</h2>
                                            <p className='text-muted mb-5'>
                                                Fill the form with what you need and we'll reach you via email to infom
                                                you about the possibilites of adding the requested feature
                                            </p>
                                        </div>
                                    </div>
                                    {formspreeState ? (
                                        <div className='text-center'>
                                            <FaRegSmileBeam size='4rem' className='text-primary mb-4' />
                                            <h1>Thanks</h1>
                                            <p className='text-muted'>We'll be back to you as soon as possible</p>
                                            <Link className='btn btn-primary px-4' to='/'>
                                                Return Home
                                            </Link>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate ref={formRef}>
                                            <div className='row gy-3'>
                                                <div className='col-12'>
                                                    <label className='form-label'>Your Name</label>
                                                    <input
                                                        type='text'
                                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                        placeholder='Enter your name'
                                                        name='name'
                                                        {...register('name', { required: true })}
                                                    />
                                                    {errors.name && (
                                                        <span className='invalid-feedback'>Please enter your name</span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <label className='form-label'>Your Email</label>
                                                    <input
                                                        type='email'
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        placeholder='Enter your email address'
                                                        name='email'
                                                        {...register('email', {
                                                            required: true,
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: 'Invalid email address',
                                                            },
                                                        })}
                                                    />
                                                    {errors.email && (
                                                        <span className='invalid-feedback'>
                                                            Please enter valid email address
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <label className='form-label'>Features Requested</label>
                                                    <textarea
                                                        rows='4'
                                                        className={`form-control ${
                                                            errors.description ? 'is-invalid' : ''
                                                        }`}
                                                        placeholder='Add a small brief about the feature you want from us'
                                                        {...register('description', { required: true })}
                                                    />
                                                    {errors.description && (
                                                        <span className='invalid-feedback'>
                                                            Please enter your feature description
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <button
                                                        type='submit'
                                                        className='btn btn-primary w-100'
                                                        disabled={formspreeSendingState}
                                                    >
                                                        {formspreeSendingState
                                                            ? 'Submitting...'
                                                            : 'Submit your request'}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FeaturesRequestsPage;
