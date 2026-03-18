# 📰 News Explorer — Frontend
A full-stack news discovery app where users search real-time headlines by keyword, browse results from the past week, and save articles to a personal account — backed by a custom REST API with JWT authentication.

🔗 [Live Site](https://olivcamj.github.io/news-explorer-frontend/) • [Backend Repo](https://github.com/olivcamj/news-explorer-api) 


![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)
![BEM](https://img.shields.io/badge/BEM-CSS_Methodology-blue?style=flat)

## About

News Explorer lets authenticated users search live news headlines via the NewsAPI 
and curate a personal reading list. The frontend is a React SPA with protected 
routes, JWT-based auth, and a fully custom component library styled with BEM.

<img width="751" alt="News Explorer Landing Page" src="https://user-images.githubusercontent.com/34360644/131021774-bce81694-4a85-48b8-b4fc-593783fd2cc6.png">


## ✨ Features
- 🔍 **Keyword search** — fetches articles published within the past 7 days via NewsAPI
- 🔐 **Authentication** — JWT-based sign up / sign in with tokens persisted in localStorage
- 🛡️ **Protected routes** — unauthenticated users are redirected away from saved articles
- 💾 **Save & delete articles** — authenticated users manage a personal article collection via the custom backend API
- 📱 **Responsive UI** — adapts across mobile, tablet, and desktop viewports
- ✅ **Controlled form validation** — inline error feedback on all auth and search inputs



## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React (Vite) |
| Routing | React Router v6 |
| Global State | Context API (`CurrentUserContext`) |
| Styling | CSS Modules + BEM methodology |
| External API | [NewsAPI](https://newsapi.org/) |
| Auth | JWT (stored in localStorage) |
| Code Quality | ESLint, Prettier, EditorConfig |



## Architecture Highlights

- **Separation of API concerns** — `NewsApi.js` and `MainApi.js` are isolated utility 
  classes, keeping component logic clean and API endpoints easy to swap or extend.
- **Context-driven auth state** — `CurrentUserContext` provides user data globally, 
  avoiding prop drilling across the component tree.
- **Reusable modal pattern** — `PopupWithForm` is a generic modal wrapper used for 
  both sign-in and sign-up flows, keeping form logic DRY.
- **Protected route HOC** — a dedicated `ProtectedRoute` component guards 
  authenticated views declaratively at the router level.


  

## Getting Started

### Prerequisites
- Node.js v16+
- A free [NewsAPI key](https://newsapi.org/register)

### Installation
```bash
git clone https://github.com/olivcamj/news-explorer-frontend.git
cd news-explorer-frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root:
```
REACT_APP_NEWS_API_KEY=your_newsapi_key_here
REACT_APP_BASE_URL=https://your-backend-url.com
```

### Run Locally
```bash
npm start
# Runs at http://localhost:3000
```

### Build for Production
```bash
npm run build
```



## Project Structure
```
src/
├── components/        # Feature and UI components (each in own folder with CSS)
│   ├── NewsCard/
│   ├── SearchForm/
│   ├── ProtectedRoute/
│   └── ...
├── contexts/
│   └── CurrentUserContext.js   # Global auth/user state
├── utils/
│   ├── MainApi.js     # Custom backend API calls (save/delete articles, auth)
│   ├── NewsApi.js     # NewsAPI integration
│   └── constants.js   # Base URLs and shared config
└── App/
    └── App.js         # Root component, routing, top-level state
```

## Roadmap

- [ ] Migrate from localStorage to httpOnly cookies for more secure token storage
- [ ] Add pagination or infinite scroll for search results
- [ ] Display article categories/tags on saved articles
- [ ] Add loading skeletons for improved perceived performance



## Related

- 🔗 [News Explorer Backend](https://github.com/olivcamj/news-explorer-api) — 
  Express + MongoDB REST API handling auth and saved articles
