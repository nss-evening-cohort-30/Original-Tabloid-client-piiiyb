import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then((profiles) => {
      // Sort alphabetically by username
      const sortedProfiles = profiles.sort((a, b) => 
        (a.userName || '').localeCompare(b.userName || '')
      );
      setUserProfiles(sortedProfiles);
    });
  };

  useEffect(() => {
    getUserProfiles();
  }, []);

  const isAdmin = (profile) => {
    return profile.roles && profile.roles.includes("Admin");
  };

  return (
    <div className="container mt-5">
      <h2>User Profiles</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Admin Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userprofiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.firstName} {profile.lastName}</td>
              <td>{profile.userName}</td>
              <td>
                {isAdmin(profile) ? (
                  <span className="badge bg-success">Admin</span>
                ) : (
                  <span className="badge bg-info">User</span>
                )}
              </td>
              <td>
                <Link 
                  to={`/userprofiles/${profile.id}`} 
                  className="btn btn-sm btn-outline-primary"
                >
                  Details
                </Link>
                <Link 
                  to={`/userprofiles/${profile.id}/edit`} 
                  className="btn btn-sm btn-warning mx-2"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}