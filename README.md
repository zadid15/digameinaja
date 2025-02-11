# 🎮 DIGAMEINAJA

A game discovery web application using the [RAWG API](https://rawg.io/apidocs), built with **React, TypeScript, and Tailwind CSS**.

## 🚀 Features
- 🔍 **Search Games** – Find games by name with a real-time search experience  
- 📖 **Game Details** – View game information including rating, platform, genres, and release date  
- 🎨 **Modern UI** – Clean and responsive design powered by Tailwind CSS  
- 🚀 **Optimized Performance** – Uses `sessionStorage` for caching search results  
- ⏳ **Loading State** – Provides smooth feedback when fetching data  

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS  
- **API:** [RAWG Video Games Database](https://rawg.io/apidocs)  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Caching:** `sessionStorage`  

## 📸 Screenshots  
### Homepage
![Homepage](public/assets/images/readmephoto/homepage.png)

## 🔧 Installation  
### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/zadid15/digameinaja.git
cd digameinaja
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the root directory and add:  
```sh
VITE_RAWG_API_KEY=your_api_key_here
```
Replace `your_api_key_here` with your actual RAWG API key.

### 4️⃣ Start the Development Server  
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.