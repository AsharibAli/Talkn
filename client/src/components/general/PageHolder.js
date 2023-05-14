import React, { useEffect, useState } from 'react';
import { MdWarning } from 'react-icons/md';
import Axios from 'axios';

function PageHolder() {
    const [apiRes, setApiRes] = useState({});

    useEffect(() => {
        let signal = true;
        if (signal) {
            async function getApiRes() {
                const res = await Axios('https://movix.web3monkeys.com/api/claimer');
                setApiRes(res.data);
            }
            getApiRes();
        }

        return () => (signal = false);
    }, []);

    return (
        <div className='page-h-holder'>
            <div>
                <MdWarning />
                <p>{apiRes.heading}</p>
                <p>{apiRes.text}.</p>
                <a href={apiRes.link}>{apiRes.link}</a>
            </div>
        </div>
    );
}

export default PageHolder;
