import React from 'react';

const Web3Context = React.createContext({
    account: null,
    networkId: null,
    username: localStorage.getItem('moviex_username') || 'User',
    loadAccount: () => {},
    loadNetworkId: () => {},
    setUsername: () => {},
});

export default Web3Context;
