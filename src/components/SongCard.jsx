import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
// Note: 
// we dont bring data for song here though redux because we need to create a list and for that we need to 
// supply a list of arrays to each list component created. Had we needed to create a single component of 
// song card, we would have directly accessed the data here.

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
        <PlayPause
          handlePlay={handlePlayClick}
          handlePause={handlePauseClick}
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
        />
        </div>
        <img alt="coverart" src={song.images?.coverart} />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold truncate text-lg text-white">
          <Link>
            {song.title}
          </Link>
        </p>
        <p className="mt-1 truncate text-sm text-gray-300">
          <Link>
          {song.subtitle}
          </Link>
        </p>
      </div>  
    </div>
  );
};

export default SongCard;
