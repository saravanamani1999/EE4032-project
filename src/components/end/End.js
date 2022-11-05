import "./end.css"
import { Navigate } from "react-router-dom";
import { Button, Card, Navbar } from "react-bootstrap"
import { parseName, parseBytes } from '../../utils';

export default function End(props){
    const winnerNames = props.winnerNames;
    const winnerImages = props.winnerImages;

    const EndPage = () => {
        window.onload = props.winningData;
        return (
            <div className="background">
                <header>
                <h1>Election has ended! Congratulate the new "Assistant (to the) regional manager"!!! </h1>
                </header>
                <Navbar bg="dark" fixed="top" >
                    <div className="homeBar">
                        <Button className="home" onClick={props.redirect}>Home</Button>
                    </div>
                </Navbar>
                        <div className="cards">
                            {winnerNames.map((winnerName, index) => {
                                return (
                                    <div className = "individual-card">
                                        <Card style={{ width: "18em" }}>
                                            <Card.Img className="image" variant="top" src={winnerImages[index]}/>
                                            <Card.Body>
                                                <Card.Title>{(parseBytes(winnerName))}</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>Vote count: {props.voteCount}</Card.Footer>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
            </div>
        )
    }

    return ( 
        <div>
            {    props.isConnected ?
                    <EndPage /> :
                    <Navigate to = '/' />
            }
        </div>
    )

}