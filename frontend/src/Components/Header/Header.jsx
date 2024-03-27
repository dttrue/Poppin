import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'

export default function Header() {
    const NavBar = styled.nav`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 70px;
        background-color: gray;
        display: flex;
        align-items: center;
        padding: 0 36px;
        z-index: 3;
    `;

    const NavBarItems = styled.div`
        align-items: center;
        display: flex;
        flex-flow: row nowrap;
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
                <img src="src/assets/poppin-logo.jpg"/>
            </Logo>

            <NavBarItems>
                <form>
                    <label>
                        Search
                    </label>

                    <input 
                        type="text"
                        name="act-search"
                        placeholder="enter an activity"
                        // value={actSearch}
                        // onChange={}
                    />

                    <input 
                        type="text"
                        name="loc-search"
                        placeholder="enter a location"
                        // value={actSearch}
                        // onChange={}
                    />
                </form>
            </NavBarItems>
        </NavBar>
    )
}
