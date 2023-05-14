import { useContext } from 'react';
import VideosContext from '../providers/videos-context';

const useVideos = () => {
    return useContext(VideosContext);
};

export default useVideos;
