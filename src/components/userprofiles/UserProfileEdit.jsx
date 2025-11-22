import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";

export default function UserProfileEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [selectedRole, setSelectedRole] = useState("user");

    useEffect(() => {
        getProfile(id).then((data) => {
            setUserProfile(data);
            setSelectedRole(data.roles.includes("Admin") ? "admin" : "user");
        });
    }, [id]);

    const handleSave = (e) => {
        e.preventDefault();

        // determine if we need to promote or demote
        const currentlyAdmin = userProfile.roles.includes("Admin");
        const shouldBeAdmin = selectedRole === "admin";

        // only make API call if role is actually changing
        if (currentlyAdmin === shouldBeAdmin) {
            // no change needed, just redirect
            navigate("/userprofiles");
            return;
        }

        // choose endpoint based on desired role
        const endpoint = shouldBeAdmin
            ? `/api/userprofile/promote/${userProfile.identityUserId}`
            : `/api/userprofile/demote/${userProfile.identityUserId}`;

        fetch(endpoint, {
            method: "POST"
        }).then(() => {
            navigate("/userprofiles");
        });
    };

    const handleCancel = () => {
        navigate("/userprofiles");
    };

    if (!userProfile) {
        return <div className="container mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Edit User Profile</h2>
            <form onSubmit={handleSave}>
                <div className="mb-3">
                    <label className="form-label">
                        <strong>User:</strong> {userProfile.firstName} {userProfile.lastName} ({userProfile.userName})
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="userType" className="form-label">
                        User Type
                    </label>
                    <select 
                        id="userType" 
                        className="form-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary me-2">
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}