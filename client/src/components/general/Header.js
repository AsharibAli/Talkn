import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { appSettings } from '../../helpers/settings';
import { FiSearch } from 'react-icons/fi';
import { configEtherScanUrl, fixNavbarToTop, truncate } from '../../helpers/utils';
import { Jazzicon } from '@ukstv/jazzicon-react';
import { toast } from 'react-toastify';

// HOOKS
import useWeb3 from '../../hooks/useWeb3';
import useVideos from '../../hooks/useVideos';

// COMPONENTS
import ConnectWalletHander from './ConnectWalletHandler';

function Navbar() {
    const { account, networkId, username } = useWeb3();
    const { owner, contract, appProfits } = useVideos();

    /*** -------------------------------------------- */
    //      CONNECT WALLET HANDLER
    /*** -------------------------------------------- */
    function walletConnect() {
        contract.methods
            .connectWalletHandler()
            .send({ from: account })
            .on('sending', () => {
                toast.success('Senidng');
            })
            .on('receipt', () => {
                toast.success('Great! Wallet Connected');
                window.location.reload();
            })
            .on('error', () => {
                toast.error('Ops! Something went wrong');
            });
    }

    /*** -------------------------------------------- */
    //      FIXING NAVBAR TO TOP
    /*** -------------------------------------------- */
    useEffect(() => {
        fixNavbarToTop();
    }, []);

    return (
        <header className='main-header fixed-top'>
            <div className='container'>
                <nav className='navbar w-100 navbar-expand-lg px-0 justify-content-between rounded-0 shadow-0'>
                    <Link className='navbar-brand' to='/'>
                        <img
                            src={appSettings.logo}
                            alt={appSettings.brandName}
                            width={appSettings.logoWidth}
                            className='h-auto'
                        />
                    </Link>

                    <button
                        className='navbar-toggler shadow-0 p-0 border-0'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon-el'>
                            <span className='btn-mobile--menu-icon'></span>
                        </span>
                        <span className='navbar-toggler-icon-el-2'>
                            <span className='btn-mobile--menu-icon-2' onClick={walletConnect}></span>
                        </span>
                    </button>

                    <div className='collapse navbar-collapse justify-content-lg-between' id='navbarSupportedContent'>
                        <ul className='navbar-nav mx-auto navbar-nav-custom'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/' end>
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/discover'>
                                    Discover
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/channels'>
                                    Channels
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/activities'>
                                    Activity
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/faqs'>
                                    FAQs
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/search'>
                                    <FiSearch size='1.2rem' style={{ transform: 'translateY(-2px)' }} />
                                </NavLink>
                            </li>
                        </ul>

                        {account ? (
                            <div className='dropdown'>
                                <Link
                                    className='px-0 nav-link dropdown-toggle no-caret d-flex align-items-center text-reset'
                                    id='accountDropdown'
                                    to='/'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    data-bs-target='#userDropdown'
                                    aria-expanded='false'
                                >
                                    <div className='d-flex align-items-center'>
                                        <div className='list-inline-item'>
                                            <div className='avatar avatar-md2'>
                                                <div style={{ width: '40px', height: '40px' }}>
                                                    <Jazzicon address={account} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='list-inline-item'>
                                            <h6 className='mb-1 lh-1 fw-normal'>{username}</h6>
                                            <p className='small text-muted mb-0 lh-1'>{truncate(account, 15)}</p>
                                        </div>
                                    </div>
                                </Link>
                                <ul className='dropdown-menu' id='userDropdown'>
                                    <li>
                                        <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={configEtherScanUrl(networkId, account)}
                                            className='dropdown-item rounded'
                                        >
                                            Track Transactions
                                        </a>
                                    </li>
                                    <li>
                                        <NavLink
                                            rel='noopener noreferrer'
                                            to='/account'
                                            className='dropdown-item rounded'
                                        >
                                            My Account
                                        </NavLink>
                                    </li>

                                    {owner === account ? (
                                        <li>
                                            <NavLink
                                                rel='noopener noreferrer'
                                                to='/admin'
                                                className='dropdown-item rounded'
                                            >
                                                Admin Panel
                                            </NavLink>
                                        </li>
                                    ) : (
                                        <p className='dropdown-item rounded mb-0 disabled d-flex align-items-center'>
                                            Admin Panel
                                            <span className='badge bg-primary text-xxs p-1 fw-normal ms-2'>
                                                Admin Only
                                            </span>
                                        </p>
                                    )}

                                    <li>
                                        <Link to='/account' className='dropdown-item rounded'>
                                            <span className='d-block lh-1 small text-muted'>
                                                {owner === account ? 'App' : 'My Afilliate'} Profits
                                            </span>
                                            <strong className='lh-1'>
                                                {appProfits} {appSettings?.currency}
                                            </strong>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <ConnectWalletHander />
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
