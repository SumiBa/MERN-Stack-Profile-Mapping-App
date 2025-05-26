import { useState, useEffect } from 'react';
import ProfileList from './components/ProfileList';
import Map from './components/Map';
import ProfileDetails from './components/ProfileDetails';
import AdminPanel from './components/AdminPanel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [detailedProfile, setDetailedProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');

  const API_URL = "http://localhost:5000/api/profiles";

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      toast.error("Failed to load profiles");
    }
  };

  const handleAddProfile = async (newProfile) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile),
      });
      const data = await res.json();
      if (res.ok) {
        setProfiles(prev => [...prev, data]);
        toast.success("Profile added");
      } else {
        toast.error(data.message || "Failed to add profile");
      }
    } catch (err) {
      toast.error("Error adding profile");
    }
  };

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const res = await fetch(`${API_URL}/${updatedProfile._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      const data = await res.json();
      if (res.ok) {
        setProfiles(prev => prev.map(p => (p._id === data._id ? data : p)));
        setEditingProfile(null);
        toast.success("Profile updated");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  const handleDeleteProfile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setProfiles(prev => prev.filter(p => p._id !== id));
        setSelectedProfile(null);
        setDetailedProfile(null);
        setEditingProfile(null);
        toast.success("Profile deleted");
      } else {
        toast.error(data.message || "Failed to delete profile");
      }
    } catch (err) {
      toast.error("Error deleting profile");
    }
  };

  const handleSummaryClick = (profile) => {
    setSelectedProfile(profile);
    setDetailedProfile(null);
  };

  const handleViewDetails = (profile) => {
    setDetailedProfile(profile);
    setSelectedProfile(null);
  };

  const handleBackToList = () => {
    setDetailedProfile(null);
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
  };

  const handleCancelEdit = () => {
    setEditingProfile(null);
  };

  const uniqueLocations = [...new Set(profiles.map(p => p.address))];

  const filteredProfiles = profiles.filter(profile => {
    const matchesName = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter ? profile.address === locationFilter : true;
    const matchesDescription = descriptionFilter
      ? profile.description.toLowerCase().includes(descriptionFilter.toLowerCase())
      : true;
    return matchesName && matchesLocation && matchesDescription;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Bynry Profile Mapping App
      </h1>

      {!detailedProfile && (
        <>
          <div className="max-w-md mx-auto mb-6 space-y-4">
            <input
              type="text"
              placeholder="Search profiles by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filter by description keyword..."
              value={descriptionFilter}
              onChange={(e) => setDescriptionFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <AdminPanel
            onAddProfile={handleAddProfile}
            editingProfile={editingProfile}
            onUpdateProfile={handleUpdateProfile}
            onCancelEdit={handleCancelEdit}
          />
        </>
      )}

      {detailedProfile ? (
        <ProfileDetails profile={detailedProfile} onBack={handleBackToList} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileList
            profiles={filteredProfiles}
            onSummaryClick={handleSummaryClick}
            onViewDetails={handleViewDetails}
            onEditClick={handleEditProfile}
            onDeleteClick={handleDeleteProfile}
          />
          <div className="bg-white rounded-lg shadow-md p-4 min-h-[300px]">
            {selectedProfile ? (
              <Map
                key={selectedProfile._id}
                address={selectedProfile.address}
                name={selectedProfile.name}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Click "Summary" on a profile to see the map here.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
