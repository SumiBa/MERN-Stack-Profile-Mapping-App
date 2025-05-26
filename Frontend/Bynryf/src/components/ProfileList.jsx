import React from "react";
import ProfileCard from "./ProfileCard";

function ProfileList({ profiles, onSummaryClick, onViewDetails, onEditClick, onDeleteClick }) {
  return (
    <div className="space-y-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile._id}              // use _id, not id
          profile={profile}
          onSummaryClick={() => onSummaryClick(profile)}
          onViewDetails={() => onViewDetails(profile)}
          onEditClick={() => onEditClick(profile)}
          onDeleteClick={() => onDeleteClick(profile._id)} // pass id for delete
        />
      ))}
    </div>
  );
}

export default ProfileList;
