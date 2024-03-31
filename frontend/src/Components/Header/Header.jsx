import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useAuth } from "../../Context/AuthContext/AuthContext";

export default function Header() {
    const { currentUser, logout } = useAuth();

    const NavBar = styled.nav`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 70px;
        background-color: gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
        justify-content: space-between;
        z-index: 3;
    `;

    const NavBarItems = styled.div`
        align-items: center;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin: 0 0 0 25px;
        padding: 0;
        height: 100%;

        button {     
            width: 50px;
            height: 50px;
            color: white;
            background-color: Transparent;
            background-repeat:no-repeat;
            border: none;
            cursor:pointer;
            overflow: hidden;        
        }

        label {
            margin-right: 5px;
            color: white;
        }
    `;

    const Logo = styled.a`
        position: left;
        width: 90px;
        display: inline-block;
        
        img {
            display: block;
            border-radius: 25px;
            width: 100%;
        }
    `;

    return (
        <NavBar>
            <Logo>
                <Link to="/">
                    <img src="src/assets/poppin-logo.jpg"/>
                </Link>
            </Logo>

            <NavBarItems>
                <form>
                    <label>
                        Search:
                    </label>

                    <input 
                        type="text"
                        name="act-search"
                        placeholder="enter an activity"
                    />

                    <input 
                        type="text"
                        name="loc-search"
                        placeholder="enter a location"
                    />

                    <input 
                        type="submit"
                        name="search-button"
                    />
                </form>

            </NavBarItems>

            <NavBarItems>
                {currentUser && (
                    <Link to="/userinfo">
                        <button>User Info</button>
                    </Link>
                )}

                {currentUser ? (
                    <button onClick={logout}>Sign out</button>
                ) : (
                    <>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button>Signup</button>
                        </Link>
                    </>
                )}
            </NavBarItems>
        </NavBar>
    )
}
