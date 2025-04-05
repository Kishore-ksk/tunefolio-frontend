import API from "../utils/axios"; // Import the existing axios instance

const ApiService = {
  register: (data) => API.post("/api/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  login: (data) => API.post("/api/login", data),
  getUser: () => API.get("/api/user"),
  deleteUser: () => API.delete("/api/auth/delete"),

  getAlbums: () => API.get("/api/albums"),
  getAlbumById: (id) => API.get(`/api/albums/${id}`),
  createAlbum: (data) => API.post("/api/albums", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  updateAlbum: (id, data) => API.put(`/api/albums/${id}`, data),
  deleteAlbum: (id) => API.delete(`/api/albums/${id}`),
  getAlbumsByUserId: (userId) => API.get(`/api/albums?userId=${userId}`),


  getSongs: () => API.get("/api/songs"),
  getSongById: (id) => API.get(`/api/songs/${id}`),
  createSong: (data) => API.post("/api/songs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  updateSong: (id, data) => API.put(`/api/songs/${id}`, data),
  deleteSong: (id) => API.delete(`/api/songs/${id}`),
  getSongsByAlbumId: (id) => API.get(`/api/albums/${id}/songs`),
  addSongToAlbum: (songId, albumId) => API.put(`api/songs/${songId}`, { albumId }),
  getSongsByUserId: (userId) => API.get(`/api/songs?userId=${userId}`),


  // Delete API Calls
  deleteItem: (id, type) => {
    const endpoint = type === "song" ? `/api/songs/${id}` : `/api/albums/${id}`;
    return API.delete(endpoint);
  },
};

export default ApiService;
