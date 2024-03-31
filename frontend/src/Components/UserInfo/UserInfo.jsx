import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";

// component for user information
export default function UserInfo() {
    // get authentication instance and current user
    const auth = getAuth();
    const user = auth.currentUser;
    // state variables for editing mode, display name, and email
    const [editing, setEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user.displayName || "");
    const [email, setEmail] = useState(user.email || "");

    // function to handle edit button click
    const handleEdit = () => {
        setEditing(true);
    };

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName: displayName, // update user's display name
            });
            setEditing(false); // exit editing mode
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
