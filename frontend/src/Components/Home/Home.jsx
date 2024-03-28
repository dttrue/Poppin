import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'


export default function Home() {

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

    const Column = styled.div`
        border: 5px solid red;
        height: 100vh;
        width: 520px;
    `;

    return (
        <HomePage>
            <Column>
                <h1>1</h1>
            </Column>

            <Column>
                <h1>2</h1>
            </Column>
        </HomePage>
    )
}