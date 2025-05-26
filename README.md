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


⚙️ Getting Started
1. Clone the repository
```
git clone https://github.com/SumiBa/MERN-Stack-Profile-Mapping-App.git
cd MERN-Stack-Profile-Mapping-App
```

2. Setup the Backend
```
cd backend
npm install
```

Create an .env file
```
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri
```

Run the backend server
```
node index.js
```

3. Setup the Frontend
```
cd ../frontend
npm install
```

Start the development server
```
npm run dev
```

🔑 Key Frontend Dependencies

react and react-dom: Frontend UI
vite: Fast dev server and build tool
tailwindcss: Utility-first CSS framework
leaflet and react-leaflet: Interactive maps
react-toastify: Toast notifications
axios: For API calls
@vitejs/plugin-react: Vite React support

🧩 Key Backend Dependencies

express: Web server
mongoose: MongoDB object modeling
cors: Cross-origin resource sharing
dotenv: Manage environment variables
multer (if photo upload used): Handling form-data/image uploads

🚀 How to Use

View profiles: See all profiles on the home page.
Search: Filter profiles based on keywords.
Summary button: Opens an interactive map showing the profile's location.
View Details: See additional profile info in a detailed view.
Add Profile: Use the form to create a new profile.
Edit/Delete: Modify or remove profiles via buttons.
Admin Panel: All CRUD operations are handled here.
Notifications: Real-time toasts for actions.
Map Rendering: Map fetches location from address using OpenStreetMap geocoding.
