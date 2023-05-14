import React, { useReducer } from 'react';

import Web3Context from './web3-context';

const defaultWeb3State = {
    account: null,
    networkId: null,
    username: localStorage.getItem('moviex_username') || 'User',
};

const web3Reducer = (state, action) => {
    if (action.type === 'ACCOUNT') {
        return {
            ...state,
            account: action.account,
        };
    }

    if (action.type === 'NETWORKID') {
        return {
            ...state,
            networkId: action.networkId,
        };
    }

    if (action.type === 'GET_USERNAME') {
        return {
            ...state,
            username: action.username,
        };
    }

    return defaultWeb3State;
};

const Web3Provider = (props) => {
    const [web3State, dispatchWeb3Action] = useReducer(web3Reducer, defaultWeb3State);

    const loadAccountHandler = async (web3) => {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        dispatchWeb3Action({ type: 'ACCOUNT', account: account });
        return account;
    };

    const loadNetworkIdHandler = async (web3) => {
        const networkId = await web3.eth.net.getId();
        dispatchWeb3Action({ type: 'NETWORKID', networkId: networkId });
        return networkId;
    };

    const setUsernameHandler = (username) => {
        dispatchWeb3Action({ type: 'GET_USERNAME', username: username });
        localStorage.setItem('moviex_username', username);
    };

    const web3Context = {
        account: web3State.account,
        networkId: web3State.networkId,
        username: web3State.username,
        loadAccount: loadAccountHandler,
        loadNetworkId: loadNetworkIdHandler,
        setUsername: setUsernameHandler,
    };

    return <Web3Context.Provider value={web3Context}>{props.children}</Web3Context.Provider>;
};

export default Web3Provider;
