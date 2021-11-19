import React, { useState } from 'react';
import Sound from 'react-sound';
import bgsong from '../../assets/bgsong.mp3';
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>



const SoundPlayer =  (
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying
) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return(
        <div>
            <button onClick={() => setIsPlaying(!isPlaying)}>
            <span class="material-icons">&#xE87C;</span>
</button>
<span class="material-icons-outlined">
volume_up
</span>
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