import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./start.css"
import { Card, Button, Navbar} from "react-bootstrap"
import { parseName, parseBytes } from '../../utils';


export default function Start(props){
    const candidateNames = props.candidateNames;
    const candidateImages = props.candidateImages;
    const StartPage = () => {
        return (
            <div className="voting-background">
                <Navbar bg="dark" fixed="top" >
                    <div className="homeBar">
                        <Button className="home" onClick={props.redirect}>Home</Button>
                        <Button className="registerBtn" onClick={props.register}> Register </Button>
                    </div>
                </Navbar>
                <div>
                    <header> 
                        <h3>The scranton branch's "Assistant (to the) regional manager" election has yet to begin...</h3>
                        <h6>These are the candidates thus far! If you are interested in participating in the election, please register using the link above before the election starts!</h6>
                    </header>
                    <div className="cards">
                        {candidateNames.map((candidateName, index) => {
                            return (
                                <div className = "individual-card">
                                    <Card style={{ width: "18em" }}>
                                        <Card.Img className="image" variant="top" src={candidateImages[index]}/>
                                        <Card.Body>
                                            <Card.Title>{(parseBytes(candidateName))}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>   
        )
    }

    return ( 
        <div>
            {    props.isConnected ?
                    <StartPage /> :
                    <Navigate to = '/' />
            }
        </div>
    )
}