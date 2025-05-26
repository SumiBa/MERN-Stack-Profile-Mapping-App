import React, { useState, useEffect, useRef } from "react";

const API_BASE = "http://localhost:5000/api";

export default function AdminPanel({ onAddProfile, editingProfile, onUpdateProfile, onCancelEdit }) {
  const [form, setForm] = useState({
    name: "",
    photo: null,
    preview: "",
    description: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingProfile) {
      setForm({
        name: editingProfile.name || "",
        photo: null,
        preview: editingProfile.photo || "",
        description: editingProfile.description || "",
        address: editingProfile.address || "",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      resetForm();
    }
  }, [editingProfile]);

  const resetForm = () => {
    setForm({
      name: "",
      photo: null,
      preview: "",
      description: "",
      address: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      photo: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || (!form.photo && !form.preview) || !form.address) {
    alert("Name, photo, and address are required");
    return;
  }

  setLoading(true);

  try {
    // Geocode address
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.address)}`,
      { headers: { "User-Agent": "BynryProfileApp/1.0" } }
    );
    const geoData = await geoRes.json();

    if (!geoData.length) {
      setLoading(false);
      alert("Invalid address");
      return;
    }

    const lat = parseFloat(geoData[0].lat);
    const lng = parseFloat(geoData[0].lon);

    // Upload photo if new photo selected
    let imageUrl = form.preview;
    if (form.photo) {
      const formData = new FormData();
      formData.append("photo", form.photo);

      const uploadRes = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setLoading(false);
        alert("Photo upload failed");
        return;
      }

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    const profilePayload = {
      name: form.name,
      photo: imageUrl,
      description: form.description,
      address: form.address,
      lat,
      lng,
    };

    if (editingProfile) {
      // Pass updated profile data to parent for PUT request
      onUpdateProfile({ ...profilePayload, _id: editingProfile._id });
    } else {
      // Pass new profile data to parent for POST request
      onAddProfile(profilePayload);
    }

    resetForm();
  } catch (error) {
    alert("Something went wrong: " + error.message);
  }

  setLoading(false);
};

  return (
    <form onSubmit={handleSubmit} className="admin-panel p-4 border rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{editingProfile ? "Edit Profile" : "Add Profile"}</h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="border p-2 mb-3 w-full"
        required
      />

      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="border p-2 mb-3 w-full"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="border p-2 mb-3 w-full"
        rows={3}
      />

      <input type="file" accept="image/*" onChange={handlePhotoChange} ref={fileInputRef} />

      {form.preview && (
        <img src={form.preview} alt="Preview" className="mt-3 max-w-full h-auto rounded" />
      )}

      <div className="mt-4 flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving..." : editingProfile ? "Update" : "Add"}
        </button>

        {editingProfile && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              onCancelEdit();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
