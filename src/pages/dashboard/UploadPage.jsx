import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../api/ApiService";

const UploadPage = () => {
  const userId = localStorage.getItem("userId"); // Get userId after login
  console.log("user-ID is" + userId);

  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("album");
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    bgColor: "#2a4365",
    date: new Date().toISOString().split("T")[0],
    image: null,
    genre: "Classical Guitar",
    albumId: "",
    type: "album"
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch the albums from backend
    const fetchAlbums = async () => {
      try {
        const response = await ApiService.getAlbumsByUserId(userId);
        setAlbums(response.data);
        if (response.data.length > 0) {
          setFormData((prev) => ({ ...prev, albumId: response.data[0].id }));
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: uploadType }));
  }, [uploadType]);

  const genres = [
    "Classical Guitar", "Jazz Fusion", "Rock", "Pop", "Hip-Hop",
    "Electronic", "Blues", "Country", "Reggae", "Lo-Fi",
    "Metal", "Indie"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check for image file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      // Set the image file directly
      setFormData((prev) => ({ ...prev, image: file }));

      // Create a preview if you still want to display it
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result); // Set the preview image
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.desc || !formData.image) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('desc', formData.desc);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('image', formData.image); // Append the actual file
      formDataToSend.append('user_id', userId); // Attach userId

      // If the upload type is 'album'
      if (uploadType === "album") {
        const response = await ApiService.createAlbum(formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Album uploaded successfully!");
      } else {
        // If the upload type is 'song'
        if (albums.length === 0) {
          alert("No albums found! Create an album before uploading songs.");
          return;
        }

        formDataToSend.append('albumId', parseInt(formData.albumId));
        formDataToSend.append('genre', formData.genre);
        formDataToSend.append('likes', "0");
        formDataToSend.append('comment', "0");
        formDataToSend.append('share', "0");
        formDataToSend.append('views', "0");
        formDataToSend.append('duration', '3:25');
        formDataToSend.append('type', formData.type);
        formDataToSend.append('user_id', userId); // Attach userId

        const response = await ApiService.createSong(formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Song uploaded successfully!");
      }

      navigate("/dashboard/portfolio");
    } catch (error) {
      console.error('Error uploading data:', error);
      alert("There was an error uploading your data.");
    }
  };

  return (
    <div className="flex flex-col bg-[#0D0D0D] h-full p-5 text-white items-center pb-24">
      <h1 className="text-3xl font-bold mb-2">Showcase Your Music to the World!</h1>
      <h1 className="text-md mb-8">Upload your albums and songs effortlessly. Share your music, grow your audience, and take your talent to the next level!</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${uploadType === "album" ? "bg-[#70CCE2] hover:bg-[#5BB8CF]  text-black" : "bg-[#191919]"}`}
          onClick={() => setUploadType("album")}
        >
          Upload Album
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${uploadType === "song" ? "bg-[#70CCE2] hover:bg-[#5BB8CF] text-black" : "bg-[#191919]"}`}
          onClick={() => setUploadType("song")}
        >
          Upload Song
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col h-[67%] justify-center p-12 rounded-lg shadow-lg w-full items-center overflow-hidden">
        <div className="flex h-full justify-between w-full gap-6">
          <div className="h-full rounded-md w-[60%] overflow-hidden">
            <label className="block mb-3">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-[#191919] border-[#303030] border-[1px] p-2 rounded-md text-white w-full"
                required
              />
            </label>

            {previewImage && <img src={previewImage} alt="Preview" className="h-full rounded-md w-full mb-3 object-cover" />}
          </div>
          <div className="flex flex-col w-full">
            <label className="block mb-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#191919] p-2 rounded-md text-white w-full"
                required
              />
            </label>

            <label className="block mb-3">
              <textarea
                name="desc"
                placeholder="Description"
                value={formData.desc}
                onChange={handleChange}
                className="bg-[#191919] p-2 rounded-md text-white w-full"
                required
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-300">Date</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-[#191919] p-2 rounded-md text-white w-full"
                required
              />
            </label>
            <div>
              {uploadType === "song" && (
                <label className="block mb-3">
                  <span className="text-gray-300">Album</span>
                  <select
                    name="albumId"
                    value={formData.albumId}
                    onChange={handleChange}
                    className="bg-[#191919] p-2 rounded-md text-white w-full"
                  >
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {uploadType === "song" && (
                <label className="block mb-3">
                  <span className="text-gray-300">Genre</span>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="bg-[#191919] p-2 rounded-md text-white w-full"
                  >
                    {genres.map((genre, index) => (
                      <option key={index} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <button type="submit" className="bg-[#70CCE2] rounded-md text-black w-full font-semibold hover:bg-[#5BB8CF] mt-4 py-2">
              Upload {uploadType}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
