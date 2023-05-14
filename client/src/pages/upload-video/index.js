import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { appSettings } from '../../helpers/settings';
import { toast } from 'react-toastify';
import Select from 'react-select';
import Web3 from 'web3';

// HOOKS
import useWeb3 from '../../hooks/useWeb3';
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import ConnectWalletHander from '../../components/general/ConnectWalletHandler';
import UploadProgress from '../../components/general/UploadProgress';
import { useEffect } from 'react';

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

function UploadVideo() {
    const [genre, setGenre] = useState({ label: 'General', value: 'General' });
    const [targetChannel, setTargetChannel] = useState(null);
    const [video, setVideo] = useState('');
    const [preview, setPreview] = useState('');
    const [poster, setPoster] = useState('');
    const [type, setType] = useState('');
    const { account } = useWeb3();
    const { contract, channels, loadAllChannels, setTransactionLoading, setUploadingProgress, uploadingProgress } =
        useVideos();
    const navigate = useNavigate();
    const [duration, setDuration] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isPremium, setIsPremium] = useState(true);
    const [videoUploadProgress, setVideoUploadProgress] = useState(0);
    const [previewUploadProgress, setPreviewUploadProgress] = useState(0);
    const [posterUploadProgress, setPosterUploadProgress] = useState(0);
    const { slug } = useParams();

    const userChannels = useMemo(() => {
        return channels
            ?.filter((channel) => channel?.owner === account)
            ?.map((channel) => ({ label: channel?.title, value: channel?.id, slug: channel?.slug }));
    }, [account, channels]);

    useEffect(() => {
        if (userChannels?.map((channel) => channel?.slug)?.includes(slug)) {
            setTargetChannel({
                label: userChannels?.filter((channel) => channel?.slug === slug)[0]?.label,
                value: userChannels?.filter((channel) => channel?.slug === slug)[0]?.value,
            });
        } else {
            setTargetChannel({ label: 'Select a Channel', value: '' });
        }
    }, [slug, userChannels]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // CATCH INPUT VIDEO ----------------------------------
    const onSelectVideo = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setVideo(undefined);
            return;
        }
        setVideo(e.target.files[0]);
        setType(e.target.files[0].type);
        var files = e.target.files[0];
        var video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            setDuration((prev) => video.duration);
        };
        video.src = URL.createObjectURL(files);
    };

    // CATCH INPUT PREVIEW ----------------------------------
    const onSelectPreview = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setPreview(undefined);
            return;
        }
        setPreview(e.target.files[0]);
    };

    // CATCH INPUT POSTER ----------------------------------
    const onSelectPoster = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setPoster(undefined);
            return;
        }
        setPoster(e.target.files[0]);
    };

    function handleMediaInputsSubmit() {
        setSubmitted(true);
    }

    // SUBMIT MINT FORM ----------------------------------
    function handleFormSubmit(data) {
        if (video !== '' && poster !== '' && preview !== '' && targetChannel?.value !== '') {
            setUploadingProgress(true);
        }
        async function mintVideo() {
            try {
                if (video !== '' && poster !== '' && preview !== '' && targetChannel?.value !== '') {
                    const videoProgress = function (data) {
                        let percent = Math.floor((Number(data) * 100) / video.size);
                        setVideoUploadProgress((prev) => percent);
                    };
                    const previewProgress = function (data) {
                        let percent = Math.floor((Number(data) * 100) / preview.size);
                        setPreviewUploadProgress((prev) => percent);
                    };
                    const posterProgress = function (data) {
                        let percent = Math.floor((Number(data) * 100) / poster.size);
                        setPosterUploadProgress((prev) => percent);
                    };

                    const ipfsVideo = await ipfs.add(video, { progress: videoProgress });
                    const ipfsPreview = await ipfs.add(preview, { progress: previewProgress });
                    const ipfsPoster = await ipfs.add(poster, { progress: posterProgress });

                    if (ipfsVideo && ipfsPreview && ipfsPoster) {
                        setUploadingProgress(false);

                        contract.methods
                            .uploadVideo(
                                [
                                    data.title,
                                    data.description,
                                    'Category',
                                    genre.label,
                                    type,
                                    `https://${appSettings.IPFSGatewaySubdomain}.infura-ipfs.io/ipfs/${ipfsVideo.path}`,
                                    `https://${appSettings.IPFSGatewaySubdomain}.infura-ipfs.io/ipfs/${ipfsPreview.path}`,
                                    `https://${appSettings.IPFSGatewaySubdomain}.infura-ipfs.io/ipfs/${ipfsPoster.path}`,
                                    Web3.utils.toWei(duration.toString(), 'ether'),
                                    isPremium,
                                ],
                                Number(targetChannel?.value)
                            )
                            .send({ from: account })
                            .on('sending', () => {
                                setTransactionLoading(true);
                            })
                            .on('receipt', () => {
                                setTransactionLoading(false);
                                loadAllChannels(contract);
                                navigate(
                                    `/channels/${
                                        channels?.filter((channel) => channel?.id === targetChannel?.value)[0]?.slug
                                    }`
                                );
                                toast.success('Great! You have successfully minted a video');
                            })
                            .on('error', () => {
                                setTransactionLoading(false);
                                toast.error('Oops! Something went error');
                            });
                    } else {
                        setUploadingProgress(false);
                        setTransactionLoading(false);
                    }
                }
            } catch (error) {
                setUploadingProgress(false);
                setTransactionLoading(false);
                toast.error(error?.message.includes('413') ? 'Files are too large' : error?.message);
                console.log(error);
            }
        }

        mintVideo();
    }

    return (
        <>
            {uploadingProgress && (
                <UploadProgress
                    video={videoUploadProgress}
                    preview={previewUploadProgress}
                    poster={posterUploadProgress}
                />
            )}
            <section className='py-5'>
                <div className='container py-5 mt-5'>
                    <div className='row'>
                        <div className='col-xl-8 mx-auto'>
                            <h1 className='mb-5 text-center'>Upload your Video</h1>
                            {userChannels?.length > 0 ? (
                                <div className='card'>
                                    <div className='card-body p-lg-5'>
                                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                                            <div className='row gy-3'>
                                                <div className='col-12'>
                                                    <label className='form-label'>Title</label>
                                                    <input
                                                        type='text'
                                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                        placeholder='Enter your video title'
                                                        name='title'
                                                        {...register('title', { required: true })}
                                                    />
                                                    {errors.title && (
                                                        <span className='invalid-feedback'>
                                                            Please enter your video title
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <label className='form-label'>Description</label>
                                                    <textarea
                                                        rows='4'
                                                        className={`form-control ${
                                                            errors.description ? 'is-invalid' : ''
                                                        }`}
                                                        placeholder='Add a cool description about your video'
                                                        {...register('description', { required: true })}
                                                    />
                                                    {errors.description && (
                                                        <span className='invalid-feedback'>
                                                            Please enter your video description
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <label className='form-label'>Genre</label>
                                                    <Select
                                                        options={appSettings.genresOptions}
                                                        className='border-0 shadow-sm'
                                                        classNamePrefix='select'
                                                        placeholder='Select a genre'
                                                        onChange={setGenre}
                                                        isSearchable={false}
                                                        defaultValue={genre}
                                                    />
                                                </div>
                                                {/* {userTargetChannelExist ? (
                                                    <div className='col-12'>
                                                        <p className='mb-0 form-control bg-dark'>
                                                            {
                                                                userChannels?.filter(
                                                                    (channel) => channel?.slug === slug
                                                                )[0]?.label
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    
                                                )} */}

                                                {targetChannel && (
                                                    <div className='col-12'>
                                                        <label className='form-label'>Channel</label>
                                                        <Select
                                                            options={userChannels || []}
                                                            className={`border-0 shadow-sm ${
                                                                submitted && targetChannel?.value === ''
                                                                    ? 'is-invalid'
                                                                    : ''
                                                            }`}
                                                            classNamePrefix='select'
                                                            placeholder='Select a genre'
                                                            onChange={setTargetChannel}
                                                            isSearchable={false}
                                                            value={targetChannel}
                                                        />
                                                        {submitted && targetChannel?.value === '' && (
                                                            <span className='invalid-feedback'>
                                                                Please Select a channel for this upload
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <div className='col-12'>
                                                    <label className='form-label'>Upload your video</label>
                                                    <input
                                                        type='file'
                                                        className={`form-control ${
                                                            submitted && video === '' ? 'is-invalid' : ''
                                                        }`}
                                                        placeholder='Upload your Video'
                                                        onChange={onSelectVideo}
                                                        accept='.mp4, .mpeg, .mov'
                                                    />
                                                    <p className='form-text mb-0 fst-italic'>
                                                        For demo purpose, Please select a file less than{' '}
                                                        <span className='text-white'>90</span> mb
                                                    </p>
                                                    {submitted && video === '' && (
                                                        <span className='invalid-feedback'>
                                                            Please upload your video
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <label className='form-label'>Upload video Preview</label>
                                                    <input
                                                        type='file'
                                                        className={`form-control ${
                                                            submitted && preview === '' ? 'is-invalid' : ''
                                                        }`}
                                                        placeholder='Upload video preview'
                                                        onChange={onSelectPreview}
                                                        accept='.mp4, .mpeg, .mov'
                                                    />
                                                    <p className='form-text mb-0 fst-italic'>
                                                        For demo purpose, Please select a file less than{' '}
                                                        <span className='text-white'>10</span> mb
                                                    </p>
                                                    {submitted && preview === '' && (
                                                        <span className='invalid-feedback'>
                                                            Please upload your video preview
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <label className='form-label'>Upload video Poster</label>
                                                    <input
                                                        type='file'
                                                        className={`form-control ${
                                                            submitted && poster === '' ? 'is-invalid' : ''
                                                        }`}
                                                        placeholder='Upload video poster'
                                                        onChange={onSelectPoster}
                                                        accept='.jpg, .png'
                                                    />
                                                    {submitted && poster === '' && (
                                                        <span className='invalid-feedback'>
                                                            Please upload your video poster
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='col-12'>
                                                    <div className='form-check'>
                                                        <input
                                                            type='checkbox'
                                                            className='form-check-input'
                                                            id='isPremium'
                                                            checked={isPremium}
                                                            onChange={(e) => setIsPremium(e.target.checked)}
                                                        />
                                                        <label htmlFor='isPremium' className='form-check-label'>
                                                            Requires Subscription to access it
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col-12'>
                                                    {account ? (
                                                        <button
                                                            type='submit'
                                                            className='btn btn-primary px-5'
                                                            onClick={handleMediaInputsSubmit}
                                                        >
                                                            Upload your Video
                                                        </button>
                                                    ) : (
                                                        <ConnectWalletHander />
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <p className='lead'>
                                        It seems that you didn't created any channels yet, you have to create one first
                                    </p>
                                    <Link to='/create-channel' className='btn btn-primary'>
                                        Create Channel
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UploadVideo;
