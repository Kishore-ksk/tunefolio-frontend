import { useNavigate, useParams } from "react-router-dom";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { TfiControlShuffle } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Icon } from '@iconify-icon/react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApiService from "../../api/ApiService";

function SongDetails() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  console.log(" DetailsPage Loaded for:", type, "ID:", id);

  // Fetch the logged-in user's ID from local storage
  const loggedInUserId = localStorage.getItem("userId");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // Stores ID & type (song/album)
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [song, setSong] = useState(null);
  const [album, setAlbum] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [albums, setAlbums] = useState([]); // Store multiple albums

  useEffect(() => {

    // Fetch song details from backend
    if (type === "song") {
      ApiService.getSongById(id)
        .then(response => {
          setSong({
            ...response.data,
            likes: Math.floor(Math.random() * 1000),
            share: Math.floor(Math.random() * 500),
            views: Math.floor(Math.random() * 5000),
            comment: Math.floor(Math.random() * 200)
          }); // Update song state
        })
        .catch(error => {
          console.error("There was an error fetching the song data!", error);
        });
      // Fetch all albums separately
      ApiService.getAlbums()
        .then(response => setAlbums(response.data))
        .catch(error => console.error("Error fetching albums!", error));
    }

    if (type === "album") {
      ApiService.getAlbumById(id)
        .then(response => {
          if (response.data) {
            setAlbum(response.data); // Update album state only if response.data is valid
            return ApiService.getSongsByAlbumId(id)
          } else {
            console.error("Album not found");
            setAlbum(null); // Explicitly set album to null if not found
            return [];
          }
        })
        .then(response => {
          setAlbumSongs(response.data); // Update songs for the album
        })
        .catch(error => {
          console.error("There was an error fetching the album data!", error);
        });
    }
  }, [type, id]);

  let content;
  const confirmDelete = (id, type) => {
    setDeleteTarget({ id, type }); // Store which item is being deleted
    setDeleteModalOpen(true); // Open modal
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    const { id, type } = deleteTarget;


    ApiService.deleteItem(id, type)
      .then(() => {
        console.log(`${type} with ID ${id} deleted`);
        navigate("/dashboard/portfolio");
      })
      .catch((error) => console.error(`Error deleting ${type}:`, error))
      .finally(() => {
        setDeleteModalOpen(false);
        setDeleteTarget(null);
      });
  };

  const handleAddToAlbum = (songId, albumId) => {
    if (!albumId) return;

    ApiService.addSongToAlbum(songId, albumId)
      .then(() => {
        console.log(`Song ${songId} added to album ${albumId}`);
        navigate(`/dashboard/album/${albumId}`);
      })
      .catch((error) => console.error("Error adding song to album:", error));
  };

  if (type === "song" && song) {
    content = (
      <div className="flex flex-col p-10 gap-10">
        <div className="flex gap-10">
          <div className="h-[500px] w-[500px] group relative">
            <img src={song.image} alt={song.name} className="h-full rounded-[10px] w-full object-center object-cover" />
            <button className='flex bg-[#70CCE2] justify-center p-5 rounded-full text-black text-xl -translate-x-1/2 -translate-y-1/2 absolute cursor-pointer duration-300 group-hover:opacity-100 items-center left-1/2 opacity-0 top-1/2 transition-opacity'><FaPlay /></button>
            <button className='flex justify-center p-5 rounded-full text-2xl absolute cursor-pointer items-center right-0 top-0'><FaEdit /></button>
          </div>
          <div className="flex flex-col justify-around w-[60%] gap-4">
            <div className="flex flex-col gap-5">
              <h1 className="text-6xl font-bold">{song?.name || "Untitled Song"}</h1>
              <p className="text-xl">{song?.desc || "No description available"}</p>
              <div className="flex gap-16">
                <p>Genre: <span className="text-[#70CCE2] font-bold">{song?.genre || "Unkown"}</span></p>
                <p>Released Date: <span className="text-[#70CCE2] font-bold">{song?.date || "Unknown"}</span></p>
                <p>Duration: <span className="text-[#70CCE2] font-bold">{song?.duration || "Unknown"}</span></p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex bg-[#191919] border-[#303030] border-[1px] rounded-full cursor-pointer gap-2 items-center pr-4">
                <Icon icon="logos:spotify-icon" className="border-[#303030] border-1 p-4 rounded-full" /> Spotify
              </button>
              <button className="flex bg-[#191919] border-[#303030] border-[1px] rounded-full cursor-pointer gap-2 items-center pr-4">
                <Icon icon="logos:youtube-icon" className="border-[#303030] border-1 p-4 rounded-full" /> Youtube
              </button>
              <button className="flex bg-[#191919] border-[#303030] border-[1px] rounded-full cursor-pointer gap-2 items-center pr-4">
                <Icon icon="fontisto:apple-music" className="border-[#303030] border-1 p-4 rounded-full text-[#ff4e6b]" /> Apple Music
              </button>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <p className="flex flex-col text-3xl items-center"><span className="text-[#70CCE2] text-2xl font-bold">{song?.views || 0}</span>PLAYS</p>
                <p className="flex flex-col text-3xl items-center"><span className="text-[#70CCE2] text-2xl font-bold">{song?.likes || 0}</span>Likes</p>
                <p className="flex flex-col text-3xl items-center"><span className="text-[#70CCE2] text-2xl font-bold">{song?.comment || 0}</span>COMMENTS</p>
                <p className="flex flex-col text-3xl items-center"><span className="text-[#70CCE2] text-2xl font-bold">{song?.share || 0}</span>SHARES</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-16 items-center">
          {!song.album_id && (
            <div className="flex flex-col gap-4">
              <select
                className="bg-[#191919] border-[#303030] p-3 text-white"
                value={selectedAlbum}
                onChange={(e) => setSelectedAlbum(e.target.value)}
              >
                <option value="">Select an album</option>
                {albums.length > 0 ? (
                  albums.map((album) => (
                    <option key={album.id} value={album.id}>{album.name}</option>
                  ))
                ) : (
                  <option disabled>No albums available</option>
                )}
              </select>
              <button
                className="bg-[#70CCE2] p-3 text-black w-full font-bold hover:bg-[#5bb8cf]"
                onClick={() => handleAddToAlbum(song.id, selectedAlbum)}
                disabled={!selectedAlbum}
              >
                Add to Album
              </button>
            </div>
          )}
          <div className="flex flex-col w-full gap-4">
            <button className="bg-[#191919] border-[#303030] border-[1px] p-3 w-full duration-300 font-bold hover:bg-[#70CCE2] hover:text-black transition-all">
              Customize
            </button>
            <button onClick={() => confirmDelete(song.id, "song")} className="bg-red-500 border-[#c19797] border-[1px] p-3 w-full duration-300 font-bold hover:bg-red-600 transition-all">
              delete Song
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type === "album" && album) {
    content = (
      <div className="p-10">
        <div className="flex gap-6">
          <div className="h-[80] w-[80]">
            <img src={album.image} alt={album.name} className="bg-center bg-cover h-80 rounded-[10px] w-80" />
          </div>

          <div className="flex flex-col justify-around w-[70%]">
            <div>
              <h1 className="text-4xl font-bold">{album?.name || "Untitled Album"}</h1>
              <p className="my-3">{album?.desc || "No description available"}</p>
              <p className="text-gray-400">{albumSongs?.length || 0} {albumSongs?.length >= 2 ? "songs" : "song "}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <button className='flex bg-[#70CCE2] justify-center p-5 rounded-full text-black text-xl cursor-pointer duration-300 items-center transition-opacity'><FaPlay /></button>
                <TfiControlShuffle className="text-2xl cursor-pointer" />
                <PiDotsThreeOutlineFill className="text-2xl cursor-pointer" />
              </div>
              <div className="flex gap-4 items-center">
                <CiSearch className="text-2xl cursor-pointer" />
                <AiOutlineUnorderedList className="text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-2 mt-10">
          <h2 className="text-xl mb-2">Songs in this Album:</h2>
          <div onClick={() => confirmDelete(album.id, "album")} className="flex bg-red-500 cursor-pointer font-bold gap-2 items-center px-3">
            <RiDeleteBin6Fill className="text-2xl cursor-pointer" />
            Delete Album
          </div>
        </div>
        <ul className="bg-scroll border-[#2E3638] border-t-1 h-[260px] overflow-auto py-2">
          {albumSongs.length > 0 ? (
            albumSongs.map((song) => (
              <li
                key={song.id}
                className="p-2 duration-300 hover:bg-[#adcfd8] hover:text-black mt-2 transition-all"
              >
                <div className="grid grid-cols-5 justify-between items-center">
                  <div className="col-span-2 flex h-[20] w-[20] gap-4 items-center">
                    <img src={song.image} alt="" className="h-[40px] w-[40px] cursor-pointer" />
                    <div className="cursor-pointer" onClick={() => navigate(`/dashboard/song/${song.id}`)}>
                      {song.name}
                    </div>
                  </div>
                  <div>
                    {song.date}
                  </div>
                  <div>
                    {song.duration}
                  </div>
                  <div>
                    <PiDotsThreeOutlineFill />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No songs found in this album.</p>
          )}
        </ul>
      </div>
    );

  } else {
    content = <p>Invalid type.</p>;
  }

  return <div className="text-white">{content}
    {/* Delete Confirmation Modal */}
    {
      isDeleteModalOpen && (
        <div className="flex bg-opacity-50 justify-center fixed inset-100 items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-6 rounded-lg text-center text-white"
          >
            <div className="bg-[#e4e4e4] p-6 rounded-lg shadow-lg text-black text-center w-96 animate-scale-up scale-95 transform">
              <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              <p className="mt-2">Are you sure you want to delete this {deleteTarget?.type}?</p>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-gray-900 rounded-md text-white hover:bg-gray-800 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 rounded-md hover:bg-red-600 px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      )
    }</div>;
}

export default SongDetails;
