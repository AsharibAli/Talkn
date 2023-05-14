import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();

    /* -------------------------------------------------- */
    //      SCROLL PAGE TO TOP ON FIRTS VISITING
    /* -------------------------------------------------- */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default ScrollToTop;
