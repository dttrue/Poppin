import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import Maps from "../Map/Maps";

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  const MapContainer = styled.div`
    position: fixed; /* Position the map absolutely within HomePage */
    width: 100%; /* Span the full viewport width */
    height: 100%; /* Occupy the full viewport height */
    z-index: 0; /* Set a low z-index to keep the map behind the blur */
  `;

  const LoremIpsum = styled.p`
  color: #f9f9f9;
  font-size: 12px;
  padding-left: 20px;
`;

  const HomePage = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-top: 55px;
  `;

  const Title = styled.h1`
  color: #f9f9f9;
    margin-bottom: 15px;
  `;

  const Column = styled.div`
    /* border: 5px solid red; */
    height: 97vh;
    width: 500px;
  `;

  const PopupBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    backdrop-filter: blur(10px); /* Apply blur effect */
    display: ${showPopup && !user
      ? "flex"
      : "none"}; /* Show only when popup is active */
    justify-content: center;
    align-items: center;
  `;

  const Popup = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    z-index: 9999;
  `;

  return (
    <HomePage>
      <Column>
        <Title>What's Poppin' Near You</Title>

        <p style={{color: 'white'}}>Created by: <a href="https://github.com/GyancarlosPinto">Gyancarlos Pinto</a>, <a href="https://github.com/Angl99">Anggel Plasencia</a> and <a href="https://github.com/athomas227">Andrew Thomas</a></p>

        <LoremIpsum>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod risus eget
          laoreet rutrum. Donec at leo nec nunc aliquam consectetur. Aenean lacinia bibendum
          nulla sed consectetur. Donec sed odio dui. Pellentesque vitae urna vel magna
          scelerisque tempor. Sed consectetur quam id augue interdum, at pulvinar urna placerat.
          Donec eu libero sit amet quam egestas blandit. Morbi leo risus, porta ac consectetur
          ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Sed posuere
          consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
          venenatis vestibulum. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio
          dui. Pellentesque vitae urna vel magna scelerisque tempor.
        </LoremIpsum>
      </Column>
      <Column>
        <MapContainer>
          <Maps />
        </MapContainer>
      </Column>

      {showPopup && !user && (
        <PopupBackground>
          <Popup>
            <p
              style={{
                color: "black",
              }}
            >
              <strong>Login</strong> or <strong>Signup</strong> to continue
            </p>

            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </Popup>
        </PopupBackground>
      )}
    </HomePage>
  );
}
