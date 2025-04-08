import API from "../utils/axios"; // Import the existing axios instance

const ApiService = {
  register: async (data) => {
    await API.get("/sanctum/csrf-cookie"); // ✅ Set CSRF token cookie first
    return API.post("/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },


  login: async (data) => {
    await API.get("/sanctum/csrf-cookie"); // ✅ Same here before login
    return API.post("/login", data);
  },
  getUser: () => API.get("/user"),
  getAllUsers: () => API.get("/users"),

  deleteUser: () => API.delete("/auth/delete"),

  getAlbums: () => API.get("/albums"),
  getAlbumById: (id) => API.get(`/albums/${id}`),
  createAlbum: (data) => API.post("/albums", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  updateAlbum: (id, data) => API.put(`/albums/${id}`, data),
  deleteAlbum: (id) => API.delete(`/albums/${id}`),
  getAlbumsByUserId: (userId) => API.get(`/albums?userId=${userId}`),


  getSongs: () => API.get("/songs"),
  getSongById: (id) => API.get(`/songs/${id}`),
  createSong: (data) => API.post("/songs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  updateSong: (id, data) => API.put(`/songs/${id}`, data),
  deleteSong: (id) => API.delete(`/songs/${id}`),
  getSongsByAlbumId: (id) => API.get(`/albums/${id}/songs`),
  addSongToAlbum: (songId, albumId) => API.put(`/songs/${songId}`, { albumId }),
  getSongsByUserId: (userId) => API.get(`/songs?userId=${userId}`),


  // Delete API Calls
  deleteItem: (id, type) => {
    const endpoint = type === "song" ? `/songs/${id}` : `/albums/${id}`;
    return API.delete(endpoint);
  },
};

export default ApiService;
