import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./voting.css"
import { Card, Button, Navbar} from "react-bootstrap"
import { parseName, parseBytes } from '../../utils';
import ReactDOM from "react-dom";


export default function Voting(props){
    const candidateNames = props.candidateNames;
    const candidateImages = props.candidateImages;
    const voteCandidate = props.voteCandidate; 
    const loading = props.loading;

    const VotingPage = () => {
        return (
        <div className="voting-background">
            <Navbar bg="dark" fixed="top" >
                <div className="homeBar">
                    <Button className="home" onClick={props.redirect}>Home</Button>
                </div>
            </Navbar>
            { loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div>
                    <header> 
                        <h1>Vote for scranton's next "Assistant (to the) regional manager"! </h1> 
                    </header>
                    <div className="cards">
                        {candidateNames.map((candidateName, index) => {
                            return (
                                <div className = "individual-card">
                                    <Card style={{ width: "18em" }}>
                                        <Card.Img className="image" variant="top" src={candidateImages[index]}/>
                                        <Card.Body>
                                            <Card.Title>{(parseBytes(candidateName))}</Card.Title>
                                            <Button variant="primary" onClick={() => voteCandidate(index)}>
                                                Vote
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
                )
            }
        </div>   
        )
    }

    return ( 
        <div>
            {    props.isConnected ?
                    <VotingPage /> :
                    <Navigate to = '/' />
            }
        </div>
    )
}