import { useState, useEffect } from "react";
import ApiService from "../../api/ApiService";
import { useNavigate } from 'react-router-dom';


const STATIC_PROFILE = {
  image: "default-profile.jpg",
  name: "Unknown Artist",
  totalPlays: Math.floor(Math.random() * (35000000 - 15000000 + 1)) + 15000000,
  totalLikes: Math.floor(Math.random() * (5000000 - 500000 + 1)) + 500000,
};

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [profile, setProfile] = useState(STATIC_PROFILE);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const userResponse = await ApiService.getUser();
        setUser(userResponse.data);

        const albumsResponse = await ApiService.getAlbums(userResponse.data.id);
        setAlbums(albumsResponse.data);

        const songsResponse = await ApiService.getSongs(userResponse.data.id);
        setSongs(songsResponse.data);

        setProfile({
          image: userResponse.data.image || STATIC_PROFILE.image,
          name: userResponse.data.name || STATIC_PROFILE.name,
          totalPlays: STATIC_PROFILE.totalPlays,
          totalLikes: STATIC_PROFILE.totalLikes,
        });

      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-between p-8 text-white w-full items-center lg:flex-row lg:items-stretch lg:pb-24 pb-5">
      {user && (
        <div className="flex flex-col bg-[#191919] border-[#303030] border-[1px] justify-between p-8 rounded-xl gap-11 lg:w-[35%] mb-20">
          <img src={profile.image} alt="Profile" className="border-[1px] border-gray-500 h-[50%] rounded-2xl w-full drop-shadow-lg object-center object-cover" />
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-[#878787]">Musician</p>
          </div>
          <div className="flex justify-center gap-9">
            <p className="flex flex-col bg-[#172022] p-4 rounded-2xl shadow-lg items-center"><span className="text-[#70CCE2] text-5xl">{albums.length}</span> {albums?.length >= 2 ? "albums" : "album"}</p>
            <p className="flex flex-col bg-[#172022] p-4 rounded-2xl items-center"><span className="text-[#70CCE2] text-5xl">{songs.length}</span>{songs?.length >= 2 ? "songs" : "song"}</p>
          </div>
          <div className="flex flex-col justify-between items-center md:flex-row">
            <p className="text-[#878787]">Total Plays: {profile.totalPlays.toLocaleString()}</p>
            <p className="text-[#878787]">Total Likes: {profile.totalLikes.toLocaleString()}</p>
          </div>

        </div>
      )}
      <div className="flex flex-col gap-10 lg:w-[60%]">
        <div className="flex flex-col bg-[#191919] h-[20%] p-4 rounded-xl gap-3 lg:h-[42%]">
          <h3 className="text-lg font-semibold">Albums</h3>
          <div className="grid grid-cols-2 h-full p-4 gap-4 lg:grid-cols-3 overflow-auto xl:grid-cols-4">
            {albums.map((album) => (
              <div onClick={() => navigate(`/dashboard/album/${album.id}`)} key={album.id} className="bg-[#172022] p-3 rounded-lg album-card cursor-pointer duration-300 ease-in-out hover:bg-[#243033] transition-colors">
                <img src={album.image || "default-album.jpg"} alt={album.name} className="h-32 rounded-md w-full object-cover" />
                <p className="text-center mt-2">{album.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-[#191919] h-[60%] p-4 rounded-xl gap-3 lg:h-[42%] songs">
          <h3 className="text-lg font-semibold">Songs</h3>
          <div className="h-full p-4 overflow-auto">
            <ul>
              {songs.map((song) => (
                <li onClick={() => navigate(`/dashboard/song/${song.id}`)} key={song.id} className="flex bg-[#172022] p-2 rounded-md cursor-pointer duration-300 ease-in-out gap-4 hover:bg-[#243033] items-center mb-2 transition-colors">
                  <img src={song.image || "default-song.jpg"} alt={song.name} className="h-12 rounded-md w-12" />
                  <div>
                    <p className="font-medium">{song.name}</p>
                    <p className="text-gray-400 text-sm">{song.plays} Plays | {song.likes} Likes</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Profile;
