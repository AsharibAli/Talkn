import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web3Provider from './providers/Web3Provider';
import VideosProvider from './providers/VideosProvider';

ReactDOM.render(
    <React.StrictMode>
        <Web3Provider>
            <VideosProvider>
                <App />
            </VideosProvider>
        </Web3Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
