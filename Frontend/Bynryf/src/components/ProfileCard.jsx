import React from 'react';

function ProfileCard({ profile, onSummaryClick, onViewDetails, onEditClick, onDeleteClick }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Image Wrapper to prevent cropping */}
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
        <img
          src={profile.photo}
          alt={profile.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h2 className="text-xl font-semibold mt-2">{profile.name}</h2>
      <p className="text-gray-600 text-sm">{profile.description}</p>

      <div className="mt-3 space-x-2">
        <button
          onClick={() => onSummaryClick(profile)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          aria-label={`Show summary for ${profile.name}`}
        >
          Summary
        </button>

        <button
          onClick={() => onViewDetails(profile)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          aria-label={`View details for ${profile.name}`}
        >
          View Details
        </button>

        <button
          onClick={() => onEditClick(profile)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          aria-label={`Edit profile of ${profile.name}`}
        >
          Edit
        </button>

        <button
          onClick={() => onDeleteClick(profile._id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          aria-label={`Delete profile of ${profile.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
