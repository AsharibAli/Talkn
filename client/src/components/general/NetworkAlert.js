import React, { useEffect } from 'react';
import { appSettings } from '../../helpers/settings';

function NetworkAlert() {
    /*** ------------------------------------------------ */
    //      RELOAD PAGE WHEN NETWORK HAS BEEN CHANGED
    /*** ------------------------------------------------ */
    useEffect(() => {
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });
    }, []);

    const networks = {
        bsctest: {
            chainId: `0x${Number(appSettings.networkId).toString(16)}`,
            chainName: appSettings.activeNetworkName,
            nativeCurrency: {
                name: `${appSettings.activeNetworkName} Native Token`,
                symbol: appSettings.nativeCurrency,
                decimals: 18,
            },
            rpcUrls: [appSettings.rpcUrl],
            blockExplorerUrls: [appSettings.blockExplorerUrls],
        },
    };

    /*** -------------------------------------------- */
    //      CHANGE NETWORK INTO METAMASK
    /*** -------------------------------------------- */
    const changeNetwork = async ({ networkName }) => {
        try {
            if (!window.ethereum) throw new Error('No crypto wallet found');
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        ...networks[networkName],
                    },
                ],
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    /*** -------------------------------------------- */
    //      CHANGE NETWORK CALLBACK
    /*** -------------------------------------------- */
    const handleNetworkSwitch = async (networkName) => {
        await changeNetwork({ networkName });
    };

    return (
        <div className='fullscreen-loader'>
            <div className='fullscreen-loader-inner'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-7 mx-auto text-center'>
                            <div className='card shadow'>
                                <div className='card-body p-4 p-lg-5'>
                                    <img src='/metamask.png' alt='Kovan Test Network' className='mb-4' width='50' />
                                    <h2 className='h5 mb-1'>
                                        This Demo is set to run on{' '}
                                        <span className='text-orange orange text-backline'>
                                            {appSettings.activeNetworkName}
                                        </span>
                                    </h2>
                                    <p className='text-muted fw-normal mb-4'>
                                        Click the button below to switch your network
                                    </p>
                                    <button
                                        className='btn btn-primary py-1'
                                        onClick={() => handleNetworkSwitch(`bsctest`)}
                                    >
                                        Switch network
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NetworkAlert;
