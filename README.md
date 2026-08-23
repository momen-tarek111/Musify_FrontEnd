# 🎵 Musify — User App (Frontend)

> **GitHub short description (About section):**
> React music streaming app with a Spotify-inspired UI — real-time player, live search, and album browsing, powered by a Spring Boot + MongoDB backend.

The user-facing web app for **Musify**, a full-stack music streaming platform. Built with React and a Spotify-themed UI, letting users browse albums, search songs, and stream music with a real-time player.

**🔗 Live Demo:** https://musify-front-end.vercel.app/

---

## ✨ Features

- ▶️ Real-time music player with working seek bar
- 🔍 Live search across songs and albums with instant filtering
- 📀 Album browsing — open an album to view all of its songs
- 🎧 Smooth playback controls integrated with the backend API
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎨 Spotify-inspired dark UI using Lucide React icons and Tailwind CSS

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Library | React.js |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| API Communication | REST (Axios / Fetch) |
| Auth | JWT (issued by Musify backend) |

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- The [Musify backend](https://github.com/momen-tarek111/Musify_Backend) running locally or deployed

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Run Locally

```bash
git clone https://github.com/momen-tarek111/Musify_FrontEnd.git
cd musify-frontend-user
npm install
npm run dev
```

## 📂 Project Structure

```
src/
├── components/     # Player, SearchBar, AlbumCard, SongList...
├── pages/          # Home, Album, Search
├── services/       # API calls to the backend
├── context/        # Auth / player state
└── assets/         # Images & icons
```

## 🔗 Related Repositories

- ⚙️ [Musify — Backend API](https://github.com/momen-tarek111/Musify_Backend)
- 🛠️ [Musify — Admin Panel](https://github.com/momen-tarek111/Musify_Admin_FrontEnd)

## 👤 Author

**Momen Tarek Nagaty** — Full Stack Developer
[LinkedIn](http://www.linkedin.com/in/momen-tarek-nagaty) · [GitHub](https://github.com/momen-tarek111)