import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";

export default function UserInfo() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [editing, setEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user.displayName || "");
    const [email, setEmail] = useState(user.email || "");

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName: displayName,
            });
            setEditing(false);
            console.log("User information updated successfully!");
        } catch (error) {
            console.error("Error updating user information:", error.message);
        }
    };

    return (
        <div>
            <h1>User Info</h1>
            {!editing ? (
                <>
                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>Email Verified: {user.emailVerified ? "Yes" : "No"}</p>
                    <button onClick={handleEdit}>Edit</button>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            )}
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    );
}
