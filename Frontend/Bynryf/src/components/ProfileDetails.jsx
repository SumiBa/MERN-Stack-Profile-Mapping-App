import React from "react";

function ProfileDetails({ profile, onBack }) {
  if (!profile) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:underline"
        aria-label="Back to profile list"
      >
        ← Back to list
      </button>

      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h2 className="text-3xl font-bold mb-3">{profile.name}</h2>
      <p className="text-gray-700 mb-4">{profile.description}</p>

      <p className="text-gray-600 mb-2">
        <strong>Address:</strong> {profile.address || "N/A"}
      </p>

      {/* Uncomment and add these fields as needed */}
      {/* <p className="text-gray-600 mb-2">
        <strong>Email:</strong> {profile.email || "N/A"}
      </p> */}
      {/* <p className="text-gray-600 mb-2">
        <strong>Interests:</strong> {profile.interests?.join(", ") || "N/A"}
      </p> */}
    </div>
  );
}

export default ProfileDetails;
