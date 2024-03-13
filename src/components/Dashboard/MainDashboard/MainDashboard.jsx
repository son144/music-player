
import React, { useEffect, useState } from "react";
import data from "../../../db.json"
import "./MainDashboard.css"
import ReactAudioPlayer from "react-audio-player";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaMusic } from "react-icons/fa";

const MainDashboard = () => {
    const [selectedSongIndex, setSelectedSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePrevSong = () => {
        setSelectedSongIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNextSong = () => {
        setSelectedSongIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePause = () => {
        console.log("insdie handlePause");
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    useEffect(() => {
        setIsPlaying(true);
    }, [selectedSongIndex]);
    // console.log(isPlaying,"isPlaying");
    const selectedSong = data[selectedSongIndex];

    return (
        <div className={`main-outer-container`}>
            <div className={`left-container h-[100%]`}>
                <h2 className="heading text-2xl font-bold py-3 px-8 mb-3">Library</h2>
                <div className={`left-inner-container`}>
                    {data&&data.length>0&&data.map((song, index) => (
                        <div
                            onClick={() => setSelectedSongIndex(index)}
                            className={`outer-container px-8 py-4 cursor-pointer ${selectedSongIndex === index && "bg-[#FF7ED4]"}`}
                            key={index}
                        >
                            <div className={`image-container`}>
                                <img src={song.Image} alt={song.SongName} className=" w-20" />
                            </div>
                            <div className={`text-container flex flex-col`}>
                                <p className={`text text-base text-gray-500 font-semibold`}>{song.SongName}</p>
                                <p className={`text text-sm text-gray-400 font-semibold`}>{song.singerName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`w-[80%] h-[100%] flex flex-col gap-y-36 `}>
                <div className="flex justify-between items-center gap-x-20  mt-3 w-[50%]  mx-auto ">
                    <h4 className="text-xl font-bold">Waves</h4>
                    <h4 className="text-base border border-black px-5 py-2 rounded-md flex items-center">Library<FaMusic /></h4>
                </div>
                <div className="flex items-center justify-center w-[100%]">
                    {selectedSong && (
                        <div className="">
                            <div className="flex justify-center">
                                <img src={selectedSong.Image} alt={selectedSong.SongName} className="w-32 rounded-full" />
                            </div>
                            <div className="text-center mt-8 mb-12">
                                <h3 className="font-semibold text-lg">{selectedSong.SongName}</h3>
                                <h3 className="text-base text-gray-500 font-semibold">{selectedSong.singerName}</h3>
                            </div>
                            <ReactAudioPlayer
                                src={selectedSong.audio}
                                autoPlay={true}
                                controls={true}
                            />
                            <div className="flex justify-between mt-8 space-x-4 ">
                                <button onClick={handlePrevSong}><RiArrowLeftSLine className="text-2xl" /></button>
                                {/* <button onClick={handlePause}>Pause</button> */}
                                <button onClick={handleNextSong}><RiArrowRightSLine className="text-2xl" /></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
