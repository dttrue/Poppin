import { getAuth } from "firebase/auth";

export default function UserInfo() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user)

    return (
        <div>
            <h1>User Info</h1>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}