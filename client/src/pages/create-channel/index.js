import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { appSettings } from '../../helpers/settings';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Select from 'react-select';

// HOOKS
import useWeb3 from '../../hooks/useWeb3';
import useVideos from '../../hooks/useVideos';

// COMPOENENTS
import PageBanner from '../../components/general/PageBanner';
import UploadProgress from '../../components/general/UploadProgress';

// IPFS CREATE HOST
const auth = 'Basic ' + Buffer.from(appSettings.IPFSProjectID + ':' + appSettings.IPFSSecret).toString('base64');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

function CreateChannelPage() {
    const { account } = useWeb3();
    const {
        contract,
        loadAllChannels,
        loadActivities,
        setTransactionLoading,
        setUploadingProgress,
        uploadingProgress,
    } = useVideos();
    const navigate = useNavigate();
    const [channelAvatar, setChannelAvatar] = useState('');
    const [channelCover, setChannelCover] = useState('');
    const [category, setCategory] = useState({ label: 'General', value: 'General' });
    const [submitted, setSubmitted] = useState(false);
    const [avatarUploadProgress, setAvatarUploadProgress] = useState(0);
    const [coverUploadProgress, setCoverUploadProgress] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function handleMediaInputsSubmit() {
        setSubmitted(true);
    }

    /*** ------------------------------------------------ */
    //      CATCH SELECTED AVATAR
    /*** ------------------------------------------------ */
    const onSelectAvatar = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setChannelAvatar(undefined);
            return;
        }
        setChannelAvatar(e.target.files[0]);
    };

    /*** ------------------------------------------------ */
    //      CATCH SELECTED COVER
    /*** ------------------------------------------------ */
    const onSelectCover = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setChannelCover(undefined);
            return;
        }
        setChannelCover(e.target.files[0]);
    };

    /*** ------------------------------------------------ */
    //      SUBMIT CREATE CHANNEL FORM
    /*** ------------------------------------------------ */
    function handleFormSubmit(data) {
        if (channelAvatar !== '' && channelCover !== '') {
            setUploadingProgress(true);
        }

        async function createChannel() {
            try {
                if (channelAvatar !== '' && channelCover !== '') {
                    const avatarProgress = function (data) {
                        let percent = Math.floor((Number(data) * 100) / channelAvatar.size);
                        setAvatarUploadProgress((prev) => percent);
                    };
                    const coverProgress = function (data) {
                        let percent = Math.floor((Number(data) * 100) / channelCover.size);
                        setCoverUploadProgress((prev) => percent);
                    };

                    const ipfsAvatar = await ipfs.add(channelAvatar, { progress: avatarProgress });
                    const ipfsCover = await ipfs.add(channelCover, { progress: coverProgress });

                    if (ipfsAvatar && ipfsCover) {
                        setUploadingProgress(false);
                        setAvatarUploadProgress(0);
                        setCoverUploadProgress(0);
                        contract.methods
                            .createChannel(
                                data?.title,
                                data?.bio,
                                Web3.utils.toWei(data?.price.toString(), 'ether'),
                                `https://${appSettings.IPFSGatewaySubdomain}.infura-ipfs.io/ipfs/${ipfsAvatar.path}`,
                                `https://${appSettings.IPFSGatewaySubdomain}.infura-ipfs.io/ipfs/${ipfsCover.path}`,
                                category?.label
                            )
                            .send({ from: account })
                            .on('sending', () => {
                                setTransactionLoading(true);
                            })
                            .on('receipt', () => {
                                setTransactionLoading(false);
                                loadAllChannels(contract);
                                loadActivities(contract);
                                navigate('/account');
                                toast.success('Great! You have successfully created a channel');
                            })
                            .on('error', () => {
                                setTransactionLoading(false);
                                toast.error('Oops! Something went error');
                            });
                    }
                } else {
                    setUploadingProgress(false);
                    setTransactionLoading(false);
                }
            } catch (error) {
                setUploadingProgress(false);
                setTransactionLoading(false);
                toast.error(error.message);
            }
        }

        createChannel();
    }

    return (
        <>
            {uploadingProgress && (
                <UploadProgress cover={coverUploadProgress} avatar={avatarUploadProgress} forChannel={true} />
            )}
            <PageBanner
                heading='Create a New Channel'
                text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, similique pariatur et corporis cum vero minus exercitationem veritatis.'
            ></PageBanner>

            <section className='py-5'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-xl-7 mx-auto' data-aos='fade-up'>
                            <div className='card shadow-lg'>
                                <div className='card-body p-lg-5'>
                                    <header className='text-center mb-4'>
                                        <h2>Create a Channel</h2>
                                        <p className='text-muted'>Add your new channel info below</p>
                                    </header>

                                    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                                        <div className='row gy-3'>
                                            <div className='col-12'>
                                                <label htmlFor='channelName' className='form-label'>
                                                    Channel Title
                                                </label>
                                                <input
                                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                    type='text'
                                                    id='channelName'
                                                    placeholder='Enter your channel title'
                                                    name='title'
                                                    {...register('title', { required: true })}
                                                />
                                                {errors.title && (
                                                    <span className='invalid-feedback'>
                                                        Please enter your channel title
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label htmlFor='channelBio' className='form-label'>
                                                    Channel Bio
                                                </label>
                                                <textarea
                                                    className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                                                    rows='5'
                                                    id='channelBio'
                                                    placeholder='Enter a small brief about your channel'
                                                    name='bio'
                                                    {...register('bio', { required: true })}
                                                ></textarea>
                                                {errors.bio && (
                                                    <span className='invalid-feedback'>
                                                        Please enter your channel bio
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Category</label>
                                                <Select
                                                    options={appSettings.channelCategories}
                                                    classNamePrefix='select'
                                                    placeholder='Select a genre'
                                                    onChange={setCategory}
                                                    isSearchable={false}
                                                    defaultValue={category}
                                                />
                                            </div>
                                            <div className='col-12'>
                                                <label htmlFor='channelPrice' className='form-label'>
                                                    Channel Subscription Price
                                                </label>
                                                <input
                                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                    type='number'
                                                    id='channelPrice'
                                                    placeholder='Enter your channel subscription price'
                                                    name='price'
                                                    {...register('price', { required: true, min: 0.00001 })}
                                                />
                                                {errors.price && (
                                                    <span className='invalid-feedback'>
                                                        Please enter your channel subscription price
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label htmlFor='channelAvatar' className='form-label'>
                                                    Channel Avatar
                                                </label>
                                                <input
                                                    className={`form-control ${
                                                        submitted && channelAvatar === '' ? 'is-invalid' : ''
                                                    }`}
                                                    type='file'
                                                    id='channelAvatar'
                                                    placeholder='Upload your channel avatar'
                                                    name='avatar'
                                                    accept='.jpg, .png'
                                                    onChange={onSelectAvatar}
                                                />
                                                {submitted && channelAvatar === '' && (
                                                    <span className='invalid-feedback'>
                                                        Please upload your channel avatar
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <label htmlFor='channelCover' className='form-label'>
                                                    Upload your channel Cover
                                                </label>
                                                <input
                                                    className={`form-control ${
                                                        submitted && channelCover === '' ? 'is-invalid' : ''
                                                    }`}
                                                    type='file'
                                                    id='channelCover'
                                                    placeholder='Upload your channel cover'
                                                    accept='.jpg, .png'
                                                    name='cover'
                                                    onChange={onSelectCover}
                                                />
                                                {submitted && channelCover === '' && (
                                                    <span className='invalid-feedback'>
                                                        Please upload your channel cover
                                                    </span>
                                                )}
                                            </div>
                                            <div className='col-12'>
                                                <button
                                                    className='btn btn-primary w-100'
                                                    type='submit'
                                                    onClick={handleMediaInputsSubmit}
                                                >
                                                    Create Channel
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CreateChannelPage;
