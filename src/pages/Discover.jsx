import { SongCard, Error, Loader } from "../components";
import { genres } from '../assets/constants'
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";

const Discover = () => {
    const { genreListId } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {data, isFetching, error} = useGetSongsByGenreQuery(genreListId || 'POP');

    if(isFetching) return <Loader title="loading..."/>

    if(error) return <Error />

    console.log(data);

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="ont-bold text-3xl text-white">Discover {genreTitle}</h2>
                <select 
                    onChange={(e) => {dispatch(selectGenreListId(e.target.value))}}
                    value={ genreListId || 'pop'}
                    className="bg-black rounded-lg outline-none p-3 text-gray-300 sm:mt-0 mt-5"
                >
                {genres.map((genre) => <option key={genre.value} value={genre.value}>
                    {genre.title}
                    </option>
                    )}
                </select>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8" >
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        isFetching={isFetching}
                        data={data}
                        i={i}
                    />
                )) }
            </div>
        </div>
    );
};

export default Discover;
