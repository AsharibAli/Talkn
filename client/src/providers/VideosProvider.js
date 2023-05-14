import React, { useReducer } from 'react';
import { secondsToHms } from '../helpers/utils';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import Web3 from 'web3';

import VideosContext from './videos-context';

const defaultVideosState = {
    channels: [],
    allVideos: [],
    blockchainVideos: [],
    videoSingleData: null,
    activities: [],
    contract: null,
    owner: '',
    mintUploadProgress: 0,
    previewModal: false,
    buyModal: false,
    buyModalSrc: {},
    preview: {},
    subscribers: [],
    transactionLoading: false,
    uploadingProgress: false,
    appProfits: '0',
    watchList: [],
    userVideos: [],
    userRefCode: null,
};

const videosReducer = (state, action) => {
    if (action.type === 'GET_CHANNELS') {
        return {
            ...state,
            allVideos: action.payload.allVideos
                .flat()
                ?.filter((video) => video[4] !== true)
                ?.map((video) => {
                    return {
                        videoId: video[0],
                        channelId: video[1],
                        title: video[2][0],
                        description: video[2][1],
                        category: video[2][3],
                        type: video[2][4],
                        src: video[2][5],
                        preview: video[2][6],
                        poster: video[2][7],
                        isPremium: video[2][9],
                        rawDuration: Number(Web3.utils.fromWei(video[2][8].toString(), 'ether')),
                        duration: secondsToHms(Web3.utils.fromWei(video[2][8].toString(), 'ether')),
                        isApproved: video[3],
                        isBlocked: video[4],
                        createdAt: Number(video[5]) * 1000,
                    };
                }),
            channels: action.payload.channels.map((channel) => {
                return {
                    id: channel[0],
                    slug: `${channel[1].toLowerCase().replace(/\s/g, '-')}${channel[0]}`,
                    title: channel[1],
                    bio: channel[2],
                    owner: channel[3],
                    ownerName: uniqueNamesGenerator({
                        dictionaries: [starWars],
                        seed: channel[3],
                    }).replace('_', ' '),
                    price: Web3.utils.fromWei(channel[4].toString(), 'ether'),
                    avatar: channel[5],
                    cover: channel[6],
                    // isApproved: channel[7],
                    isApproved: true,
                    videos: channel[8]
                        ?.filter((video) => video[4] !== true)
                        .map((video) => {
                            return {
                                videoId: video[0],
                                channelId: video[1],
                                title: video[2][0],
                                description: video[2][1],
                                category: video[2][3],
                                type: video[2][4],
                                src: video[2][5],
                                preview: video[2][6],
                                poster: video[2][7],
                                isPremium: video[2][9],
                                rawDuration: Number(Web3.utils.fromWei(video[2][8].toString(), 'ether')),
                                duration: secondsToHms(Web3.utils.fromWei(video[2][8].toString(), 'ether')),
                                isApproved: video[3],
                                isBlocked: video[4],
                                createdAt: Number(video[5]) * 1000,
                            };
                        }),
                    subscribers: channel[9]?.map((user) => ({
                        name: uniqueNamesGenerator({
                            dictionaries: [starWars],
                            seed: user[0],
                        }).replace('_', ' '),
                        address: user[0],
                        subscribedAt: Number(user[1]) * 1000,
                    })),
                    createdAt: Number(channel[10]) * 1000,
                    category: channel[11],
                };
            }),
        };
    }
    if (action.type === 'GET_VIDEOS') {
        return {
            ...state,
            blockchainVideos: action.videos.map((vid) => {
                return {
                    id: vid[0],
                    metadata: {
                        title: vid[1][0],
                        description: vid[1][1],
                        category: vid[1][2],
                        genre: vid[1][3],
                        type: vid[1][4],
                        video: vid[1][5],
                        preview: vid[1][6],
                        poster: vid[1][7],
                        rawDuration: Number(Web3.utils.fromWei(vid[1][8], 'ether')),
                        duration: secondsToHms(Web3.utils.fromWei(vid[1][8], 'ether')),
                    },
                    price: Number(Web3.utils.fromWei(vid[2], 'ether')),
                    creator: vid[3],
                    userGenName: uniqueNamesGenerator({
                        dictionaries: [starWars],
                        seed: vid[3],
                    }).replace('_', ' '),
                    approved: vid[5],
                    createdAt: Number(vid[6]) * 1000,
                };
            }),
        };
    }
    if (action.type === 'GET_SUBSCRIBERS') {
        return {
            ...state,
            subscribers: action.subscribers.map((subscriber) => {
                return subscriber[0];
            }),
        };
    }
    if (action.type === 'CONTRACT') {
        return {
            ...state,
            contract: action.contract,
        };
    }
    if (action.type === 'LOADING') {
        return {
            ...state,
            transactionLoading: action.loading,
        };
    }
    if (action.type === 'UPLOADING_PROGRESS') {
        return {
            ...state,
            uploadingProgress: action.loading,
        };
    }
    if (action.type === 'SET_PREVIEW_MODAL') {
        return {
            ...state,
            previewModal: action.status,
        };
    }
    if (action.type === 'SET_BUY_MODAL') {
        return {
            ...state,
            buyModal: action.status,
        };
    }
    if (action.type === 'GET_PROFITS') {
        return {
            ...state,
            appProfits: Web3.utils.fromWei(action.profits, 'ether'),
        };
    }
    if (action.type === 'GET_UPLOAD_PROGRESS') {
        return {
            ...state,
            mintUploadProgress: action.progress,
        };
    }
    if (action.type === 'GET_SINGLE_VIDEO') {
        return {
            ...state,
            videoSingleData: {
                videoId: action.videoData[0],
                channelId: action.videoData[1],
                title: action.videoData[2][0],
                description: action.videoData[2][1],
                category: action.videoData[2][3],
                type: action.videoData[2][4],
                src: action.videoData[2][5],
                preview: action.videoData[2][6],
                poster: action.videoData[2][7],
                isPremium: action.videoData[2][9],
                rawDuration: Number(Web3.utils.fromWei(action.videoData[2][8].toString(), 'ether')),
                duration: secondsToHms(Web3.utils.fromWei(action.videoData[2][8].toString(), 'ether')),
                isApproved: action.videoData[3],
                isBlocked: action.videoData[4],
                createdAt: Number(action.videoData[5]) * 1000,
            },
        };
    }
    if (action.type === 'LOAD_ACTIVITIES') {
        return {
            ...state,
            activities: action.activities.map((el) => {
                return {
                    user: el[0],
                    time: Number(el[3]) * 1000,
                    action: el[4],
                };
            }),
        };
    }
    if (action.type === 'SET_PRIVEW_SRC') {
        return {
            ...state,
            preview: {
                preview: action.preview.preview,
                channelId: action.preview.channelId,
                videoId: action.preview.videoId,
            },
        };
    }
    if (action.type === 'SET_BUY_MODAL_SRC') {
        return {
            ...state,
            buyModalSrc: {
                id: action.src.id,
                price: action.src.price,
                title: action.src.title,
            },
        };
    }
    if (action.type === 'GET_OWNER') {
        return {
            ...state,
            owner: action.owner,
        };
    }

    if (action.type === 'GET_REF_CODE') {
        return {
            ...state,
            userRefCode: action.code,
        };
    }

    if (action.type === 'LOAD_WATCHLIST') {
        return {
            ...state,
            watchList: action.watchList?.map((vid) => {
                return {
                    id: vid[0],
                    metadata: {
                        title: vid[1][0],
                        description: vid[1][1],
                        category: vid[1][2],
                        genre: vid[1][3],
                        type: vid[1][4],
                        video: vid[1][5],
                        preview: vid[1][6],
                        poster: vid[1][7],
                        duration: secondsToHms(Web3.utils.fromWei(vid[1][8], 'ether')),
                    },
                    price: Number(Web3.utils.fromWei(vid[2], 'ether')),
                    creator: vid[3],
                    approved: vid[5],
                    createdAt: Number(vid[6]) * 1000,
                };
            }),
        };
    }
    if (action.type === 'GET_USER_VIDEOS') {
        return {
            ...state,
            userVideos: action.userVideos,
        };
    }

    return defaultVideosState;
};

const VideosProvider = (props) => {
    const [videosState, dispatchVideosAction] = useReducer(videosReducer, defaultVideosState);

    const loadVideosHandler = (videos) => {
        dispatchVideosAction({ type: 'LOAD_VIDEOS', videos: videos });
        return videos;
    };

    const setTransactionLoadingHandler = (loading) => {
        dispatchVideosAction({ type: 'LOADING', loading: loading });
    };

    const setUploadingProgressHandler = (loading) => {
        dispatchVideosAction({ type: 'UPLOADING_PROGRESS', loading: loading });
    };

    const setPreviewModalHandler = (status) => {
        dispatchVideosAction({ type: 'SET_PREVIEW_MODAL', status: status });
    };

    const setBuyModalHandler = (status) => {
        dispatchVideosAction({ type: 'SET_BUY_MODAL', status: status });
    };

    const setPreviewSrcHandler = (preview, channelId, videoId) => {
        dispatchVideosAction({ type: 'SET_PRIVEW_SRC', preview: { preview, channelId, videoId } });
    };

    const setBuyModalSrcHandler = (id, price, title) => {
        dispatchVideosAction({ type: 'SET_BUY_MODAL_SRC', src: { id, price, title } });
    };

    const loadContractHandler = (web3, VideoAbi, deployedNetwork) => {
        const contract = deployedNetwork ? new web3.eth.Contract(VideoAbi.abi, deployedNetwork.address) : '';
        dispatchVideosAction({ type: 'CONTRACT', contract: contract });
        return contract;
    };

    const loadChannelsHandler = async (contract) => {
        const channels = await contract.methods.allChannels().call();
        let allVideos = [];
        if (channels.length > 0) {
            allVideos = channels.map((channel) => {
                return [...channel[8]];
            });
        }
        dispatchVideosAction({ type: 'GET_CHANNELS', payload: { channels, allVideos } });
        return { channels, allVideos };
    };

    const loadVideoSubscribersHandler = async (contract, id) => {
        const subscribers = await contract.methods.getSubscribers(id).call();
        dispatchVideosAction({ type: 'GET_SUBSCRIBERS', subscribers: subscribers });
        return subscribers;
    };

    const loadSingleVideoHandler = async (contract, id) => {
        const videoData = await contract.methods.video(id).call();
        dispatchVideosAction({ type: 'GET_SINGLE_VIDEO', videoData: videoData });
        return videoData;
    };

    const loadAppOwnerHandler = async (contract) => {
        const owner = await contract.methods.owner().call();
        dispatchVideosAction({ type: 'GET_OWNER', owner: owner });
        if (owner === '0x0000000000000000000000000000000000000000') {
            dispatchVideosAction({ type: 'LOAD_VIDEOS', videos: null });
        }
        return owner;
    };

    const loadAppProfitsHandler = async (contract, address) => {
        const profits = await contract.methods.user_funds(address).call();
        dispatchVideosAction({ type: 'GET_PROFITS', profits: profits });
        return profits;
    };

    const loadMintUploadProgressHandler = (progress) => {
        dispatchVideosAction({ type: 'GET_MINT_PROGRESS', progress: progress });
        return progress;
    };

    const loadActivitiesHandler = async (contract) => {
        const activities = await contract.methods.activityLogs().call();
        dispatchVideosAction({ type: 'LOAD_ACTIVITIES', activities: activities });
        return activities;
    };

    const loadUserWatchlistHandler = async (contract, address) => {
        const watchList = await contract.methods.get_wishlist(address).call();
        dispatchVideosAction({ type: 'LOAD_WATCHLIST', watchList: watchList });
        return watchList;
    };

    const loadUserRefCodeHandler = async (contract, address) => {
        const code = await contract.methods.userRefCode(address).call();
        dispatchVideosAction({ type: 'GET_REF_CODE', code: code });
        return code;
    };

    const loadUserChannelsHandler = async (contract, address) => {
        const userVideos = await contract.methods.userChannels(address).call();
        dispatchVideosAction({ type: 'GET_USER_VIDEOS', userVideos: userVideos });
        return userVideos;
    };

    const videosContext = {
        channels: videosState.channels,
        allVideos: videosState.allVideos,
        blockchainVideos: videosState.blockchainVideos,
        contract: videosState.contract,
        subscribers: videosState.subscribers,
        owner: videosState.owner,
        appProfits: videosState.appProfits,
        previewModal: videosState.previewModal,
        buyModal: videosState.buyModal,
        buyModalSrc: videosState.buyModalSrc,
        mintUploadProgress: videosState.mintUploadProgress,
        preview: videosState.preview,
        transactionLoading: videosState.transactionLoading,
        uploadingProgress: videosState.uploadingProgress,
        activities: videosState.activities,
        watchList: videosState.watchList,
        userRefCode: videosState.userRefCode,
        userVideos: videosState.userVideos,
        videoSingleData: videosState.videoSingleData,
        loadContract: loadContractHandler,
        loadVideos: loadVideosHandler,
        loadAllChannels: loadChannelsHandler,
        loadVideoSubscribers: loadVideoSubscribersHandler,
        loadAppOwner: loadAppOwnerHandler,
        setTransactionLoading: setTransactionLoadingHandler,
        setPreviewModal: setPreviewModalHandler,
        setBuyModal: setBuyModalHandler,
        loadMintUploadProgress: loadMintUploadProgressHandler,
        setPreviewSrc: setPreviewSrcHandler,
        setBuyModalSrc: setBuyModalSrcHandler,
        loadAppProfits: loadAppProfitsHandler,
        setUploadingProgress: setUploadingProgressHandler,
        loadActivities: loadActivitiesHandler,
        loadUserChannels: loadUserChannelsHandler,
        loadUserWatchlist: loadUserWatchlistHandler,
        loadUserRefCode: loadUserRefCodeHandler,
        loadSingleVideo: loadSingleVideoHandler,
    };

    return <VideosContext.Provider value={videosContext}>{props.children}</VideosContext.Provider>;
};

export default VideosProvider;
