import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useWeb3 from '../../hooks/useWeb3';
import useVideos from '../../hooks/useVideos';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';

function WatchListAction({ id, creator }) {
    const { contract, loadAllChannels, setTransactionLoading, loadUserWatchlist, watchList } = useVideos();
    const { account } = useWeb3();
    const location = useLocation();

    /* -------------------------------------------------- */
    //      ADD VIDEO TO WATCHLIST HANDLER
    /* -------------------------------------------------- */
    function addToWatchList() {
        contract.methods
            .addToWishList(Number(id))
            .send({ from: account })
            .once('sending', () => {
                setTransactionLoading(true);
            })
            .on('receipt', () => {
                setTransactionLoading(false);
                loadAllChannels(contract);
                loadUserWatchlist(contract, account);
                toast.success('Great! You have added this video to your wachlist');
            })
            .on('error', () => {
                setTransactionLoading(false);
                toast.error('Oops! Something went error');
            });
    }

    return creator !== account ? (
        <>
            {watchList.filter((video) => video.id === id).length === 0 ? (
                <button type='button' className='btn btn-outline-light flex-fill' onClick={addToWatchList}>
                    <AiOutlineAppstoreAdd className='mb-1 me-2' size='1.35rem' />
                    Add to my list
                </button>
            ) : (
                <Link
                    className={`btn ${
                        location?.pathname.includes('watchlist')
                            ? 'btn-opac-light cursor-default text-white'
                            : 'btn-light text-dark'
                    }   flex-fill`}
                    to={'/watchlist'}
                >
                    <AiOutlineAppstoreAdd className='mb-1 me-2' size='1.35rem' />
                    In your List
                </Link>
            )}
        </>
    ) : (
        <button type='button' className='btn btn-opac-light text-white flex-fill cursor-default'>
            <AiOutlineAppstoreAdd className='mb-1 me-2' size='1.35rem' />
            One of your Items
        </button>
    );
}

export default WatchListAction;
