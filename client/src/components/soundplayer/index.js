import React, { useState } from 'react';
import Sound from 'react-sound';
import bgsong from '../../assets/bgsong.mp3';



const SoundPlayer =  (
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying
) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return(
        <div>
            <button onClick={() => setIsPlaying(!isPlaying)}>Play</button>
        <Sound
            url={bgsong}
            playStatus={
                isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
            }
            playFromPosition = {300}
            onLoading ={handleSongLoading}
            onPlaying= {handleSongPlaying}
            onFinishedPlaying= {handleSongFinishedPlaying}
            loop = {true}
            />
        </div>
    )
};

export default SoundPlayer;