# 🌟 Celestial Sneaker Studio

**A futuristic 3D sneaker customization platform** where users can design, visualize, and purchase custom sneakers in an immersive web experience.

🔗 **[Live Demo](https://celestial-studio.vercel.app/)**

---

## ✨ Features

### 🎨 **3D Customization Studio**
- Real-time 3D sneaker visualization using Three.js
- Interactive color picker with 6+ premium color options
- Material selection (Cotton, Nylon, Leather, Synthetic)
- Size selection (US 6-12)
- Orbit controls for 360° product viewing
- Auto-rotating showcase mode

### 🛒 **E-Commerce Functionality**
- Persistent shopping cart (survives page refreshes)
- Add/remove items with quantity controls
- Real-time price calculations
- Smooth cart sidebar with animations
- Checkout flow with order success page

### 🔐 **User Authentication**
- Sign up and sign in functionality
- Secure password hashing with bcrypt
- MongoDB Atlas integration
- User session management
- Form validation and error handling

### 🎭 **Immersive UI/UX**
- Custom animated cursor (desktop)
- Background music with toggle control
- Loading screen with audio preference
- Parallax scrolling effects
- Smooth page transitions with Framer Motion
- Holographic borders and neon glow effects
- Grain texture overlay for depth
- Responsive design (mobile, tablet, desktop)

### 🚀 **Performance & Optimization**
- Code splitting and lazy loading
- Optimized 3D model rendering
- Serverless architecture on Vercel
- Persistent state with localStorage
- Fast build times with Vite

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Three.js** - 3D graphics engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components for Three.js
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Tailwind CSS** - Utility-first styling
- **PostCSS & Autoprefixer** - CSS processing

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Bcrypt.js** - Password hashing
- **Vercel Serverless Functions** - API endpoints

### **Deployment**
- **Vercel** - Hosting platform
- **GitHub** - Version control

---

## 📂 Project Structure

```
Celestial_sneakers/
├── api/                          # Serverless API functions
│   ├── _lib/
│   │   ├── db.js                # MongoDB connection
│   │   └── http.js              # HTTP utilities
│   ├── auth/
│   │   ├── signin.js            # Login endpoint
│   │   ├── signup.js            # Registration endpoint
│   │   └── user/
│   │       └── [id].js          # Get user by ID
│   └── health.js                # Health check endpoint
├── src/
│   ├── components/              # Reusable components
│   │   ├── 3d/
│   │   │   ├── HolographicShoe.jsx
│   │   │   ├── ParticleField.jsx
│   │   │   └── SneakerModel.jsx
│   │   ├── AudioManager.jsx     # Background music control
│   │   ├── CartSidebar.jsx      # Shopping cart UI
│   │   ├── Cursor.jsx           # Custom cursor
│   │   ├── LoadingScreen.jsx    # Splash screen
│   │   ├── Navbar.jsx           # Navigation bar
│   │   └── ProductCard.jsx      # Product display
│   ├── pages/                   # Route pages
│   │   ├── Home.jsx             # Landing page
│   │   ├── Studio.jsx           # 3D customization
│   │   ├── Gallery.jsx          # Product gallery
│   │   ├── About.jsx            # About page
│   │   ├── SignIn.jsx           # Authentication
│   │   ├── Checkout.jsx         # Checkout flow
│   │   └── OrderSuccess.jsx     # Order confirmation
│   ├── store/                   # State management
│   │   ├── cartStore.jsx        # Shopping cart state
│   │   └── uiStore.js           # UI state
│   ├── config/
│   │   └── api.js               # API endpoints
│   ├── styles/
│   │   └── globals.css          # Global styles
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Base styles
├── public/                      # Static assets
│   ├── assets/                  # 3D models and textures
│   └── music/                   # Background audio
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── vercel.json                  # Vercel deployment config
└── package.json                 # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lifeisperpetual/Celestial_studio.git
   cd Celestial_studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   ATLAS_URI=your_mongodb_connection_string
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the development server**
   
   **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

   **Terminal 2 - Backend (optional for local API):**
   ```bash
   npm run server
   ```
   Runs at `http://localhost:5000`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment

This project is deployed on **Vercel** with automatic deployments from the `master` branch.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lifeisperpetual/Celestial_studio)

1. Fork this repository
2. Connect to Vercel
3. Add environment variables:
   - `ATLAS_URI` - Your MongoDB connection string
4. Deploy!

---

## 🎯 Key Features Explained

### **State Management with Zustand**
- Lightweight state management (1KB)
- Persistent cart storage with localStorage
- No prop drilling or context providers needed
- Selective component re-renders for optimal performance

### **3D Rendering Pipeline**
- Three.js for WebGL rendering
- React Three Fiber for declarative 3D
- Drei helpers for lighting and controls
- Dynamic material and color application
- Environment mapping for realistic reflections

### **Serverless Architecture**
- Each API file becomes a serverless function
- Automatic scaling and zero server management
- MongoDB connection pooling for efficiency
- Secure password hashing with bcrypt

### **Animation System**
- Framer Motion for UI animations
- Custom cursor with blend modes
- Parallax scrolling effects
- Page transition animations
- Loading sequences

---

## 📱 Responsive Design

- **Mobile (< 768px)**: Touch-optimized, stacked layouts, simplified 3D
- **Tablet (768px - 1024px)**: Adaptive grids, touch navigation
- **Desktop (> 1024px)**: Full 3D experience, custom cursor, advanced effects

---

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- Input validation on client and server
- SQL injection prevention (MongoDB)
- CORS configuration
- Environment variable protection
- Request body size limits

---

## 🎨 Design Philosophy

- **Futuristic Aesthetic**: Gradient overlays, holographic borders, neon effects
- **Performance First**: Code splitting, lazy loading, optimized assets
- **User Experience**: Smooth animations, intuitive navigation, instant feedback
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new user account |
| POST | `/api/auth/signin` | Authenticate user |
| GET | `/api/auth/user/:id` | Get user by ID |
| GET | `/api/health` | Health check |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**lifeisperpetual**
- GitHub: [@lifeisperpetual](https://github.com/lifeisperpetual)
- Project: [Celestial Studio](https://github.com/lifeisperpetual/Celestial_studio)

---

## 🙏 Acknowledgments

- Three.js community for amazing 3D tools
- Vercel for seamless deployment
- MongoDB Atlas for reliable database hosting
- React ecosystem for powerful libraries

---

## 📸 Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f16020d9-2256-4199-9bde-1fa88d391ff4" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/734bc617-18bf-48ce-bd29-256a9b2afc95" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1007d843-a842-4bd4-b0ed-af3b27bf2be4" />

---

**Built with ❤️ and lots of ☕**

[🌐 Visit Live Site](https://celestial-studio.vercel.app/) | [🐛 Report Bug](https://github.com/lifeisperpetual/Celestial_studio/issues) | [✨ Request Feature](https://github.com/lifeisperpetual/Celestial_studio/issues)

</div>
