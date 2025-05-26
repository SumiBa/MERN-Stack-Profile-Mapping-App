🌍 MERN Stack Profile Mapping App
This is a full-featured MERN (MongoDB, Express, React, Node.js) stack application that allows users to manage and explore a list of profiles with geographic mapping functionality. It is integrated with MongoDB Atlas for storing profile data and uses OpenStreetMap via Leaflet for displaying user locations on an interactive ma


🔥 Features
✅ View Profiles: List of profiles with name, photo, and description.

✅ Search & Filter: Easily search profiles by name, location, or description.

✅ Map Integration: View profile locations interactively using Leaflet and OpenStreetMap.

✅ Summary Button: Shows a profile’s exact location on a map.

✅ Profile Details View: Click a profile to see more in-depth details.

✅ Add Profile: Add new profiles via a form.

✅ Edit/Delete: Admin users can update or remove profiles.

✅ Responsive Design: Works well on desktop and mobile devices.

✅ Toast Notifications: Real-time success/error messages using react-toastify.

✅ Custom Spinner: Shows loading state while fetching data.

✅ Error Handling: Graceful handling of geocoding or API failures.

✅ MongoDB Atlas Integration: Profile data is stored remotely using MongoDB Atlas.


📁 Project Structure

MERN-Profile-Mapping-App/
├── backend/
│   ├── index.js                // Main Express server
│   ├── .env                    // MongoDB URI & server config
│   ├── uploads                    
│   ├── models/
│   │   └── Profile.js          // Mongoose schema
│   └── routes/
│       └── profileRoutes.js    // CRUD API endpoints
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/         // ProfileCard, Map, AdminPanel, etc.
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json


⚙️ Getting Started
1. Clone the repository
```
git clone https://github.com/SumiBa/MERN-Stack-Profile-Mapping-App.git
cd MERN-Stack-Profile-Mapping-App


