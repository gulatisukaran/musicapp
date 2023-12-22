import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Error, Loader } from '../components'
import axios from 'axios';

import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';
import { SongCard } from '../components';

const CountryTracks = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const { data, isFetching, error } = useGetSongsByCountryQuery(country);
    const { activeSong, isPlaying } =  useSelector((state) => state.player);

    console.log(country);

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_KsWjKgEHCb0zxVUa7QP6GErVGpANw`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [country]);

    if (isFetching && loading) return <Loader title="Loading Songs around you..." />;

    if (error && country !== '') return <Error />;

    return (
        <div className='flex flex-col'>
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around you <span className="font-black">{country}</span></h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {data?.map((song, i) => (
                <SongCard 
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={i}
                />
            ))}
            </div>
        </div>
    );
}

export default CountryTracks;
