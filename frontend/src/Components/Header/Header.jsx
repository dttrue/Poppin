import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/AuthContext/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();

  const NavBar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px; 
    background-color: #141e30; 
    color: white; 
    justify-content: space-between;
    z-index: 3;
  `;

  const NavBarItems = styled.div`
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0 10px; 
      color: inherit; 
      display: flex;
      align-items: center;
      font-size: 16px; 
    }

    a {
      text-decoration: none; 
      color: inherit; 
      font-size: 16px; 
      margin-right: 15px; 
    }
  `;

  const Logo = styled.a`
    position: relative; 
    width: 80px;
    display: inline-block;
    text-align: center; 

    img {
      display: block;
      width: 100%; 
      border-radius: 50%; 
    }
  `;
  const StyledInput = styled.input`
    color: #333; 
    background-color: #fff; 
    border: 1px solid lightblue; 
    border-radius: 4px; 
    padding: 2px 5px;
    margin-left: 10px;
`;

  return (
    <NavBar>
      <Logo>
        <Link to="/">
          <img src="src/assets/poppin-logo.png" />
        </Link>
      </Logo>

      <NavBarItems>
        <form>
          <label>Search:</label>
          <StyledInput
            type="text"
            name="act-search"
            placeholder="What's Poppin'"
          />
          {/* <input type="text" name="loc-search" placeholder="enter a location" /> */}
          
          <input type="submit" name="search-button" />
        </form>
      </NavBarItems>

      <NavBarItems>
        {currentUser && (
          <Link to="/users">
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
  );
}
