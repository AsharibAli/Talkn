import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { appSettings } from '../helpers/settings';
import { uniqueNamesGenerator, starWars } from 'unique-names-generator';
import { ToastContainer } from 'react-toastify';
import Web3 from 'web3';
import AOS from 'aos';

// 3RD-PARTY STYLES
import 'react-toastify/dist/ReactToastify.css';
import 'react-h5-audio-player/lib/styles.css';

// HOOKS
import useVideos from '../hooks/useVideos';
import useWeb3 from '../hooks/useWeb3';

// CONTRACT ABIs
import VideosAbi from '../contracts/Collectible.json';

// COMPONENTS
import Header from '../components/general/Header';
import Footer from '../components/general/Footer';
import ScrollToTop from '../components/general/ScrollToTop';
import MetaMaskLoader from '../components/general/MetaMaskLoader';
import NetworkAlert from '../components/general/NetworkAlert';
import PreviewModal from '../components/general/PreviewModal';
import ViewOnlyAlert from '../components/general/ViewOnlyAlert';
import BuyVideoModal from '../components/general/BuyVideoModal';

function Layout() {
    const { account, loadNetworkId, loadAccount, setUsername } = useWeb3();
    const {
        loadContract,
        loadAllChannels,
        loadAppOwner,
        loadActivities,
        transactionLoading,
        previewModal,
        buyModal,
        loadAppProfits,
        loadUserWatchlist,
        contract,
        loadUserRefCode,
    } = useVideos();
    const [networkId, setNetworkId] = useState(4);
    const [web3Provider, setWeb3Provider] = useState(
        window.ethereum ? new Web3(window.ethereum) : new Web3(appSettings.rpcUrl)
    );

    /*** ------------------------------------------------ */
    //      GENERATE USERNAME FOR CONNECTED ACCOUNT
    /*** ------------------------------------------------ */
    useEffect(() => {
        if (!localStorage.getItem('moviex_username')) {
            setUsername(
                uniqueNamesGenerator({
                    dictionaries: [starWars],
                    seed: account,
                }).replace('_', ' ')
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*** ------------------------------------------------ */
    //      LOAD INITIAL APP DATA
    /*** ------------------------------------------------ */
    useEffect(() => {
        if (contract && account) {
            loadAppProfits(contract, account);
            loadUserWatchlist(contract, account);
            loadAllChannels(contract);
            loadUserRefCode(contract, account);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contract, account]);

    /*** -------------------------------------------- */
    //      GET ACTIVE NETWORK ID
    /*** -------------------------------------------- */
    useEffect(() => {
        let signal = true;
        async function getNetworkId() {
            if (window.ethereum) {
                const networkId = await loadNetworkId(new Web3(window.ethereum));
                setNetworkId(networkId);
            }
        }
        if (signal) {
            getNetworkId();
        }

        return () => (signal = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*** -------------------------------------------- */
    //      TOGGLE WEB3 PROVIDER
    /*** -------------------------------------------- */
    useEffect(() => {
        if (window.ethereum && networkId === appSettings.networkId) {
            setWeb3Provider(new Web3(window.ethereum));
        } else {
            setWeb3Provider(new Web3(appSettings.rpcUrl));
        }
    }, [networkId]);

    /* -------------------------------------------------- */
    //      AOS ANIMATION
    /* -------------------------------------------------- */
    useEffect(() => {
        AOS.init({
            duration: 700,
            disable: 'mobile',
            once: true,
        });
    }, []);

    /*** -------------------------------------------- */
    //      GET BLOCKCHAIN DATA
    /*** -------------------------------------------- */
    useEffect(() => {
        const calclateInitialSettings = async () => {
            await loadAccount(web3Provider);
            const networkId = await loadNetworkId(web3Provider);
            const videoDeployedNetwork = VideosAbi.networks[networkId];
            const videosContract = loadContract(web3Provider, VideosAbi, videoDeployedNetwork);
            if (videosContract) {
                loadAllChannels(videosContract);
                loadAppOwner(videosContract);
                loadActivities(videosContract);
            } else {
                return;
            }
            if (window.ethereum && networkId === appSettings.networkId) {
                window.ethereum.on('accountsChanged', (accounts) => {
                    loadAccount(web3Provider);
                    setUsername(
                        uniqueNamesGenerator({
                            dictionaries: [starWars],
                        }).replace('_', ' ')
                    );
                });
                window.ethereum.on('chainChanged', (chainId) => {
                    window.location.reload();
                });
            }
        };
        calclateInitialSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='app'>
                {window.ethereum && networkId !== appSettings.networkId && <NetworkAlert />}
                <Header />
                <div id='main' className='layout-horizontal z-index-20 position-relative'>
                    <div className='content-wrapper'>
                        <ScrollToTop />
                        {/* {owner ? <Outlet /> : <PageHolder />} */}
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
            <ToastContainer position='top-center' autoClose={1500} />
            {previewModal && <PreviewModal />}
            {buyModal && <BuyVideoModal />}
            {transactionLoading && <MetaMaskLoader />}
            {(window.ethereum && networkId === appSettings.networkId) || <ViewOnlyAlert />}
        </>
    );
}

export default Layout;
