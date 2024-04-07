import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import styled from "styled-components";
import userHelpers from "../../Helpers/userHelpers";

// component for user information
export default function UserInfo() {
    const Popup = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 9999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  `;

    // get authentication instance and current user
    const auth = getAuth();
    const user = auth.currentUser;

    // state variables for editing mode, display name, and email
    const [editing, setEditing] = useState(false);
    const [displayName, setDisplayName] = useState(user.displayName || "");
    const [email, setEmail] = useState(user.email || "");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [streetAddress1, setStreetAddress1] = useState("");
    const [streetAddress2, setStreetAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    // state variable for user data
    const [info, setInfo] = useState({});

    // function to handle edit button click
    const handleEdit = async () => {
        setEditing(true);

        // TESTING //
        // populate the form fields with the current user information
        const userData = await userHelpers.index();
        const currentUserData = userData.find((u) => u.email === user.email);
        console.log(currentUserData);
        setFirstName(currentUserData.first_name);
        setLastName(currentUserData.last_name);
        setDateOfBirth(currentUserData.date_of_birth);
        setStreetAddress1(currentUserData.street_address_1);
        setStreetAddress2(currentUserData.street_address_2);
        setCity(currentUserData.city);
        setState(currentUserData.state);
        setZipCode(currentUserData.zip_code);
        // TESTING //
    };

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(user, {
                displayName: displayName, // update user's display name
            });

            // update the user information in the backend
            const response = await userHelpers.updateByid( info.id, {
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                street_address_1: streetAddress1,
                street_address_2: streetAddress2,
                city: city,
                state: state,
                zip_code: zipCode,
            });
            setInfo(response);

            setEditing(false); // exit editing mode
            console.log("User information updated successfully!", info);
        } catch (error) {
            console.error("Error updating user information:", error.message);
        }
    };

    // TESTING //
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const data = await userHelpers.index();
            const currentUserData = data.find((u) => u.email === user.email);
            setInfo(currentUserData);
            console.log(data);
          } catch (error) {
            console.error("Error fetching user data:", error.message);
          }
        };
        fetchUserData();
      }, []);
      // TESTING //

    return (
        <div>
            <Popup>
            <h1>User Info</h1>
            {!editing ? (
                <>
                    <p>Email: {user.email}</p>
                    <p>Email Verified: {user.emailVerified ? "Yes" : "No"}</p>

                    {/* TESTING */}
                    <div>
                                <p>First Name: {info.first_name}</p>
                                <p>Last Name: {info.last_name}</p>
                                <p>Date of Birth: {info.date_of_birth}</p>
                                <p>Street Address 1: {info.street_address_1}</p>
                                <p>Street Address 2: {info.street_address_2}</p>
                                <p>City: {info.city}</p>
                                <p>State: {info.state}</p>
                                <p>Zip Code: {info.zip_code}</p>
                            </div>
                    {/* TESTING */}

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
                    <label>First Name:</label>
                    <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last Name:</label>
                    <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Date of Birth:</label>
                    <input
                    type="text"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                    <label>Street Address 1:</label>
                    <input
                    type="text"
                    value={streetAddress1}
                    onChange={(e) => setStreetAddress1(e.target.value)}
                    />
                    <label>Street Address 2:</label>
                    <input
                    type="text"
                    value={streetAddress2}
                    onChange={(e) => setStreetAddress2(e.target.value)}
                    />
                    <label>City:</label>
                    <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                    <label>State:</label>
                    <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    />
                    <label>Zip Code:</label>
                    <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>
            )}
            
            <Link to="/">
                <button>Home</button>
            </Link>
            </Popup>
        </div>
    );
}
