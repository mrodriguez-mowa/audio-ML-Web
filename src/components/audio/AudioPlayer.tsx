import axios from "axios";
import React from "react";

import ReactAudioPlayer from "react-audio-player";

interface IAudioPlayer {
    audio: string;
    audioId: any;
    audioCode: string;
}

const AudioPlayer = ({ audio, audioId, audioCode }: IAudioPlayer) => {

    const voiceMail = async () => { 
        await axios.post("/api/audios/voice-mail", {
            audioCode
        })
        audioId()
    };

    const skipAudioAndUpdate = async () => {
        // Update status to undelivered
        await axios.post("/api/audios/restart", {
            audioCode
        })

        audioId()
    }

    return (
        <div className="mx-auto">
            <ReactAudioPlayer
                className="mx-auto my-10"
                src={`./audios/${audio}`}
                controls
            />

            <div className="flex justify-center w-full md:w-4/12 mx-auto">
                <button onClick={()=>voiceMail()} className="my-8 px-5  py-2 flex  rounded-lg bg-red-400 hover:cursor-pointer hover:text-red-100 text-red-700 font-semibold transition-all mx-auto border-2">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>

                    <span>Buzón</span>
                </button>


                <button onClick={skipAudioAndUpdate} className="my-8 px-5  py-2 flex  rounded-lg bg-blue-400 hover:cursor-pointer hover:text-blue-100 text-blue-700 font-semibold transition-all mx-auto border-2">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                    </svg>

                    <span>Omitir</span>
                </button>

            </div>


        </div>
    );
};

export default AudioPlayer;
