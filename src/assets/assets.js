import bell_icon from './bell.svg'
import dashboard_icon from './dashboard.svg'
import comment_icon from './comment.svg'
import dashboard_dark_icon from './dashboard-dark.svg'
import disc_icon from './disc.svg'
import down_arrow_icon from './down-arrow.svg'
import edit_icon from './edit.svg'
import google_icon from './google.svg'
import heart_icon from './heart.svg'
import loop_icon from './loop.svg'
import menu_icon from './menu.svg'
import message_icon from './message.svg'
import messsage_dark_icon from './message-dark.svg'
import next_arrow_icon from './next-arrow.svg'
import next_icon from './next.svg'
import oppurtunities_icon from './oppor.svg'
import oppurtunities_dark_icon from './oppor-dark.svg'
import pause_icon from './pause.svg'
import play_icon from './play.svg'
import playlist_icon from './playlist.svg'
import portfolio_dark_icon from './port-dark.svg'
import portfolio_icon from './port.svg'
import prev_arrow_icon from './prev-arrow.svg'
import previous_icon from './previous.svg'
import pro_icon from './pro.svg'
import profile_dark_icon from './profile-dark.svg'
import profile_icon from './profile.svg'
import search_icon from './search.svg'
import settings_dark_icon from './settings-dark.svg'
import settings_icon from './settings.svg'
import share_icon from './share.svg'
import views_icon from './views.svg'
import volume_icon from './volume.svg'
import img4 from './img-1.jpg'
import img5 from './img-2.jpg'
import img6 from './img-3.jpg'
import img7 from './img-4.jpg'
import img8 from './img-5.jpg'
import single1 from './single-1.jpg'
import single2 from './single-2.jpg'
import single3 from './single-3.jpg'
import single4 from './single-4.jpg'
import single5 from './single-5.jpg'
import song1 from './song1.mp3'
import song2 from './song2.mp3'
import song3 from './song3.mp3'
import featuredTandA from './featured-t-a.jpg'
import featuredT from './featured-t.jpg'
import featuredA from './featured-a.jpg'
import collab from './featured-c.jpg'
import behindTheBeat from './behind-the-beat.jpg'
import liveShow from './live-show.jpg'
import musicVideo from './music-video.jpg'
import video1 from './video-1.jpg'
import video2 from './video-2.jpg'
import video3 from './video-3.jpg'
import defaultSongImg from "../assets/single-1.jpg";
import defaultAlbumImg from "../assets/img-1.jpg";


export const assets = {
    bell_icon,
    dashboard_icon,
    comment_icon,
    dashboard_dark_icon,
    disc_icon,
    down_arrow_icon,
    edit_icon,
    google_icon,
    heart_icon,
    loop_icon,
    menu_icon,
    message_icon,
    messsage_dark_icon,
    next_arrow_icon,
    next_icon,
    oppurtunities_icon,
    oppurtunities_dark_icon,
    pause_icon,
    play_icon,
    playlist_icon,
    portfolio_dark_icon,
    portfolio_icon,
    prev_arrow_icon,
    previous_icon,
    pro_icon,
    profile_dark_icon,
    profile_icon,
    search_icon,
    settings_dark_icon,
    settings_icon,
    share_icon,
    views_icon,
    volume_icon
}

export const portImage = [
    {
        id: 0,
        name: "Featured Tracks & Albums",
        featuredTracksandAlbums: featuredTandA,
        desc: "Showcase your top singles, albums, and collaborations in one place. Engage listeners with seamless streaming, interactive features, and direct fan feedback. Whether it’s a chart-topping hit or an underground gem, let your music take center stage"
    },
    {
        id: 1,
        name: "Slow Burn",
        collabrator: "Ft. Cyrah Jade",
        featuredAlbums: featuredA,
        desc: "A Soothing acoustic rendition of a classical ballad, capturing the essence of late-night nostalgia",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "38k",
        comment: "2.6k",
        share: "16k"
    },
    {
        id: 2,
        name: "Midnight Stories",
        collabrator: "Ft. Cyrah Jade",
        collaborations: collab,
        desc: "A Soothing acoustic rendition of a classical ballad, capturing the essence of late-night nostalgia",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "38k",
        comment: "2.6k",
        share: "16k"
    },
    {
        id: 3,
        name: "Echoes of Midnight",
        featuredTracks: featuredT,
        desc: "A Soothing acoustic rendition of a classical ballad, capturing the essence of late-night nostalgia",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "42k",
        comment: "3k",
        share: "13k"
    },
    {
        id: 4,
        name: "Old Love",
        behindTheBeat: behindTheBeat,
        desc: "An intimate live performance with acoustic vibes",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "42k",
        comment: "3k",
        share: "13k"
    },
    {
        id: 5,
        name: "Acoustic Dreams - Live at The Loft",
        liveShow: liveShow,
        desc: "An intimate live performance with acoustic vibes",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "38k",
        comment: "2.6k",
        share: "16k"
    },
    {
        id: 6,
        name: "Falling Stars",
        musicVideo: musicVideo,
        desc: "An emotional ballad about chasing dreams",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "38k",
        comment: "2.6k",
        share: "16k"
    }

]

export const videoData = [
    {
        id: 0,
        name: "Rainy Day Blues",
        video: video1,
        desc: "A bluesy acoustic cover with warm, mellow tones that set a reflective mood",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "38k",
        comment: "2.6k",
        share: "16k",
        views: "24,756"
    },
    {
        id: 1,
        name: "Drifting Notes",
        video: video2,
        desc: "A delicate classical guitar cover that evokes the peaceful beauty of sunrise",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "38k",
        comment: "2.6k",
        share: "16k",
        views: "13,732"

    },
    {
        id: 2,
        name: "Whispers of the Wind",
        video: video3,
        desc: "A soft fingerstyle cover that brings out the raw emotion of the original melody",
        bgColor: "#2a4365",
        date: "8-4-2025",
        likes: "38k",
        comment: "2.6k",
        share: "16k",
        views: "22,811"
    }
]


// Load stored data from localStorage or initialize empty arrays
export let dataBase = {
    albums: JSON.parse(localStorage.getItem("albums")) || [],
    songs: JSON.parse(localStorage.getItem("songs")) || [],
};

// Function to update localStorage
const updateLocalStorage = () => {
    localStorage.setItem("albums", JSON.stringify(dataBase.albums));
    localStorage.setItem("songs", JSON.stringify(dataBase.songs));
};

// Function to add a new album
export const addAlbum = (newAlbum) => {
    dataBase.albums.unshift(newAlbum);
    updateLocalStorage();
};

// Function to add a new song
export const addSong = (newSong) => {
    dataBase.songs.unshift(newSong);
    updateLocalStorage();
};

// Function to delete an album **without removing songs**
export const deleteAlbum = (albumId) => {
    dataBase.albums = dataBase.albums.filter((album) => album.id !== albumId);

    dataBase.songs = dataBase.songs.map((song) =>
        song.albumId === albumId ? { ...song, albumId: null } : song
    );
    updateLocalStorage();
};

// Function to delete a song
export const deleteSong = (songId) => {
    dataBase.songs = dataBase.songs.filter((song) => song.id !== songId);
    updateLocalStorage();
};

// Function to refresh database
export const refreshDataBase = () => {
    dataBase.albums = JSON.parse(localStorage.getItem("albums")) || [];
    dataBase.songs = JSON.parse(localStorage.getItem("songs")) || [];
};

// Default album & song (if database is empty)
if (dataBase.albums.length === 0) {
    dataBase.albums = [
        {
            id: 4,
            name: "Golden Reveries",
            image: "/assets/img-3.jpg",
            desc: "A nostalgic blend of warm acoustic tones, evoking the beauty of autumn landscapes, golden leaves dancing in the wind, and the cozy feeling of reminiscing about cherished memories. Each song is like a fading photograph—soft, comforting, and timeless",
            bgColor: "#234e52",
            date: "8-4-2025",
            likes: "13k",
            comment: "474",
            share: "2k"
        },
        {
            id: 5,
            name: "Echoes of Nature",
            image: "/assets/img-2.jpg",
            desc: "A serene collection of acoustic melodies inspired by the symphony of the natural world. Each track flows like a gentle breeze through the trees, the rhythmic patter of rain on a quiet afternoon, or the distant hum of a flowing river. Perfect for moments of relaxation and deep connection with nature",
            bgColor: "#234e52",
            date: "12-6-2025",
            likes: "12k",
            comment: "121",
            share: "2k"
        },
        {
            id: 6,
            name: "Serenity Unplugged",
            image: "/assets/img-1.jpg",
            desc: "A soulful acoustic experience that mirrors the ebb and flow of the ocean. From the gentle lapping of waves on a sunlit shore to the power of a rolling tide, these tracks bring a sense of peace and renewal. Perfect for meditative mornings, long drives, or simply unwinding with a cup of tea",
            bgColor: "#234e52",
            date: "22-5-2025",
            likes: "9k",
            comment: "342",
            share: "2.5k"
        }
        ,
        {
            id: 7,
            name: "Moonlit Strings",
            image: "/assets/img-4.jpg",
            desc: "A dreamy, fingerstyle guitar album that captures the quiet magic of the night. Let each note paint a picture of a peaceful sky filled with stars, the soft glow of the moon, and the calm stillness of the world after dark. Whether you're unwinding after a long day or lost in deep thought, these melodies will guide you into tranquility",
            bgColor: "#234e52",
            date: "4-7-2025",
            likes: "7k",
            comment: "294",
            share: "3k"
        }
        ,
        {
            id: 8,
            name: "Winter’s Lullaby",
            image: "/assets/img-5.jpg",
            desc: "A cozy collection of soft guitar covers, perfect for chilly nights, candlelit corners, and the quiet serenity of snowfall. Each note carries a sense of warmth and nostalgia, wrapping around you like a comforting blanket on a winter evening",
            bgColor: "#234e52",
            date: "24-11-2024",
            likes: "33k",
            comment: "466",
            share: "4k"
        }
    ];
}

if (dataBase.songs.length === 0) {
    dataBase.songs = [
        {
            id: 9,
            name: "Whispering Chords",
            image: "/assets/single-1.jpg",
            desc: "A soulful instrumental piece where gentle fingerpicking meets atmospheric reverb, creating a dreamlike soundscape. This track embodies late-night reflections and quiet emotions, where every note tells an unspoken story",
            duration: "3:00",
            date: "26-5-2025",
            likes: "9k",
            comment: "691",
            share: "4.1k",
            albumId: 1,
            type: "song",
            genre: "Classical Guitar",
            views: "287K"
        },
        {
            id: 10,
            name: "Distorted Dreams",
            image: "/assets/single-2.jpg",
            desc: "A raw, electric-fueled journey through the depths of the subconscious. Blending heavy distortion with haunting melodies, this song captures the feeling of chasing dreams through chaos and uncertainty",
            duration: "2:20",
            date: "13-4-2025",
            likes: "15k",
            comment: "3k",
            share: "10k",
            albumId: 2,
            type: "song",
            genre: "Smooth Jazz",
            views: "399K"
        },
        {
            id: 11,
            name: "Dusty Roads & Strings",
            image: "/assets/single-3.jpg",
            desc: "A nostalgic, blues-infused acoustic tune that paints a picture of long highways, fading sunsets, and old memories. Perfect for those who find beauty in simplicity and the open road",
            duration: "2:32",
            date: "21-8-2025",
            likes: "13k",
            comment: "990",
            share: "3k",
            albumId: 3,
            type: "song",
            genre: "Heavy Metal",
            views: "152K"
        },
        {
            id: 12,
            name: "Cosmic Strum",
            image: "/assets/single-4.jpg",
            desc: "A psychedelic rock instrumental that takes the listener on a celestial journey. The shimmering delays and spacey reverb create an out-of-this-world experience, where the guitar strings echo through the universe",
            duration: "2:50",
            date: "26-2-2025",
            likes: "20k",
            comment: "2k",
            share: "4k",
            albumId: 4,
            type: "song",
            genre: "Country & Bluegrass",
            views: "578K"
        },
        {
            id: 13,
            name: "Fretfire",
            image: "/assets/single-5.jpg",
            desc: "An adrenaline-pumping fusion of shredding solos and intricate riffs, bursting with high-energy. This track is all about pushing limits, making the guitar scream, and setting the stage on fire",
            duration: "3:10",
            date: "4-7-2025",
            likes: "9k",
            comment: "1k",
            share: "2.7k",
            albumId: 9,
            type: "song",
            genre: "Soft Rock",
            views: "236K",
        }
    ];
}

// Ensure updated data is stored
updateLocalStorage();
