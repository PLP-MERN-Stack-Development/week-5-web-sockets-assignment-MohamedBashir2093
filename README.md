# 💬 Real-Time Chat Application (WebSocket-Based)

This is a **real-time chat application** built with the **MERN stack** and powered by **Socket.IO** for instant bi-directional communication between users. The app supports public and private messaging, typing indicators, and dynamic user presence updates.

## 🚀 Project Overview

This project was developed as part of **Week 5 - Web Sockets Assignment** for the PLP MERN Stack Program. It demonstrates how to implement a live chat room using **React**, **Express**, **Socket.IO**, and **Node.js**, where users can send:
- 💬 Public messages
- 🔒 Private messages to specific users
- 🟢 View live online user list
- 🚪 Get notified when users join or leave

---

## 🛠️ Setup Instructions

### 📦 Requirements
- Node.js (v16+)
- pnpm or npm
- Git

### 📁 Folder Structure

```

MERN-5/
├── client/       # React frontend (Vite)
└── server/       # Express + Socket.IO backend

````

### ⚙️ Installation Steps

1. **Clone the Repository**

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-5-web-sockets-assignment-MohamedBashir2093.git
cd week-5-web-sockets-assignment
````

2. **Install Dependencies**

# Server
cd server
pnpm install

# Client
cd ../client
pnpm install
```

3. **Start the Servers**

```bash
# In one terminal - Backend
cd server
pnpm dev

# In another terminal - Frontend
cd client
pnpm dev
```


## ✨ Features Implemented

* ✅ Real-time public chat messages
* ✅ Private (1-to-1) messaging between users
* ✅ Typing indicator ("User is typing...")
* ✅ Live list of online users
* ✅ Room-based joining
* ✅ Clean and responsive UI using Tailwind CSS

---

## 📸 Screenshots

### 🔵 Join Chat

![Join Chat](./screenshots/Screenshot%202025-07-15%20073128.png)

### 🟢 Private Message Selected

![Chats](./screenshots/Screenshot%202025-07-15%20073424.png)



## 📚 Technologies Used

* Frontend: `React + Vite`, `Tailwind CSS`
* Backend: `Node.js`, `Express.js`, `Socket.IO`
* Dev Tools: `pnpm`, `Postman` (for manual testing)

---

## 🧑‍💻 Author

👤 Mohamed Bashir


## 📝 License

This project is part of an academic submission. You may fork it for educational purposes. Attribution is appreciated.


