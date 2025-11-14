import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState();

  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setUserProfile);
  }, [id]);

  // Format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  // Check if user is admin
  const getUserType = (profile) => {
    return profile.roles && profile.roles.includes("Admin") ? "Admin" : "User";
  };

  if (!userProfile) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5 text-center">
      {/* Avatar Image */}
      {(!userProfile.imageLocation || userProfile.imageLocation.trim() === "") ? (
      <div 
        className="rounded-circle mb-3 d-flex align-items-center justify-content-center"
        style={{
          width: '200px',
          height: '200px',
          backgroundImage: 'url(/images/default-avatar.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontSize: '72px',
          fontWeight: 'bold',
          color: '#333', 
          margin: '0 auto'
        }}
      >
        {userProfile.firstName?.charAt(0) || 'U'}
      </div>
    ) : (
      <img 
        src={userProfile.imageLocation}
        alt={`${userProfile.firstName} ${userProfile.lastName}`}
        width={200}
        height={200}
        className="rounded-circle mb-3"
        style={{ objectFit: 'cover' }}
      />
    )}
      
      {/* Full Name */}
      <h2>{userProfile.firstName} {userProfile.lastName}</h2>
      
      {/* Profile Details */}
      <p><strong>Display Name:</strong> {userProfile.userName}</p>
      <p><strong>Email:</strong> {userProfile.email}</p>
      <p><strong>Member Since:</strong> {formatDate(userProfile.createDateTime)}</p>
      <p>
        <strong>User Type:</strong> 
        <span className={`badge ms-2 ${getUserType(userProfile) === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
          {getUserType(userProfile)}
        </span>
      </p>
    </div>
  );
}