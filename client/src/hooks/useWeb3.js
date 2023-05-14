import { useContext } from 'react';
import Web3Context from '../providers/web3-context';

const useWeb3 = () => {
    return useContext(Web3Context);
};

export default useWeb3;
