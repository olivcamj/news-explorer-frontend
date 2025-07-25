# 📰 News Explorer — Frontend
The News Explorer application allows users to search for news articles using a keyword, view results from the past week, and save articles to their account. It integrates with an external News API and features user authentication, responsive UI components, and protected routes.

→ [Live Site]() • [Backend Repo](https://github.com/olivcamj/news-explorer-api) 



<img width="751" alt="News Explorer Landing Page" src="https://user-images.githubusercontent.com/34360644/131021774-bce81694-4a85-48b8-b4fc-593783fd2cc6.png">


## ✨ Features
🔍 Search for recent news by keyword

👤 Sign up / Sign in functionality with protected routes

💾 Save and delete favorite articles

⚛️ Built with React and custom components

💅🏿 Styled with reusable BEM


## 🚀 Getting Started

Clone the repo:

```bash
git clone https://github.com/olivcamj/news-explorer-frontend.git
cd news-explorer-frontend
```
Install dependencies:

```bash
npm install
```
Run the app locally:

```bash
npm start
#Runs in development mode on http://localhost:3000
```

## 📁 Project Structure
<pre>
public/
│   ├── index.html
│   └── manifest.json
│
src/
│
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── About/
│   ├── Main/
│   ├── NewsCard/
│   ├── NewsCardList/
│   ├── SearchForm/
│   ├── SavedNews/
│   ├── PopupWithForm/
│   ├── Signin/
│   ├── Signup/
│   ├── Success/
│   ├── ProtectedRoute/
│   ├── Navigation/
│   ├── NotFound/
│   └── Preloader/
│
├── contexts/
│   └── CurrentUserContext.js
│
├── images/
│   └── (SVGs, PNGs, Icons)
│
├── utils/
│   ├── MainApi.js
│   ├── NewsApi.js
│   └── constants.js
│
├── vendors/
│   └── index.css
│
├── App/
│   ├── App.js
│   └── App.css
│
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js

.eslintrc  
.prettierrc  
.editorconfig  
</pre>

## 🧠 Tech Stack
- React (CRA)
  
- JavaScript (ES6+)
  
- BEM
  
- React Router
  
- Context API for global state
  
- News API integration
  
- Frontend form validation
  
- RESTful API integration with NewsAPI & custom backend
  
- Protected Routes


## 🔐 Authentication
Frontend authentication is implemented using:

- JWT tokens are stored in localStorage

- Protected routes with React Router

- Controlled login/signup modals

## 🔗 Related Projects
🔙 [Backend Repository](https://github.com/olivcamj/news-explorer-api) 

