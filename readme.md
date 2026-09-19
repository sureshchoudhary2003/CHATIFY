# CHATIFY - Real-Time Chat Application

CHATIFY is a full-stack real-time messaging web application that enables users to connect, chat instantly, and track online presence seamlessly. Built using the MERN stack with Socket.io, it features secure cookie-based JWT authentication, media storage, and optimistic UI updates for a fast, responsive user experience.

---

### Live Demo & Links

* **Deployed Web Service:** [https://chatify-36hb.onrender.com/](https://chatify-36hb.onrender.com/)
* **GitHub Repository:** [https://github.com/sureshchoudhary2003/chatify.git](https://github.com/sureshchoudhary2003/chatify.git)

---

### About the Project

CHATIFY was developed to provide an end-to-end communication platform with low-latency messaging and modern security standards.

**Key Features:**
* **Real-Time Communication:** Instant bidirectional messaging and live online/offline user status tracking powered by Socket.io.
* **Robust Security:** Custom authentication using JSON Web Tokens (JWT) stored in HTTP-only cookies and bcrypt password hashing.
* **Protected REST APIs:** Secure endpoints managing user profiles, chat conversations, and message histories[cite: 1].
* **State Management & UI:** Built with React and Zustand for predictable state handling, featuring optimistic UI updates for zero-lag chat interactions[cite: 1].
* **Media & Automation:** Cloudinary integration for profile picture uploads and automated email triggers to welcome new users[cite: 1].

**Tech Stack:**
* **Frontend:** React.js, Zustand[cite: 1]
* **Backend:** Node.js, Express.js[cite: 1]
* **Database:** MongoDB, Mongoose[cite: 1]
* **Real-Time Engine:** Socket.io[cite: 1]
* **Cloud & Tools:** Cloudinary, JWT, bcrypt[cite: 1]

---

### Getting Started & Installation

Follow these steps to set up and run the project locally.

#### Prerequisites
* Node.js (v16+ recommended)
* MongoDB installed locally or a MongoDB Atlas URI
* Cloudinary account credentials

#### 1. Clone the Repository
```bash
git clone [https://github.com/sureshchoudhary2003/chatify.git](https://github.com/sureshchoudhary2003/chatify.git)
cd chatify
