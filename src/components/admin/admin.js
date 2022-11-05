import "./admin.css"
import { Button, Navbar} from "react-bootstrap"


export default function Admin(props){
    
    return (
        <div className="voting-background">
            <Navbar bg="dark" fixed="top" >
                <div className="homeBar">
                    <Button className="home" onClick={props.redirect}>Home</Button>
                </div>
                <div className="bar">
                    <Button className="navButtons" onClick={props.start}>Start election</Button>
                    <Button className="navButtons" onClick={props.end}>End election</Button>
                    <Button className="navButtons" onClick={props.votingPage}>Vote</Button>
                    <Button className="navButtons" onClick={props.registerPage}>Register</Button>
                    <Button className="navButtons" onClick={props.startPage}>Start Page</Button>
                    <Button className="navButtons" onClick={props.endPage}>End Page</Button>

                </div>
            </Navbar>
            <div>
                <header> 
                    <h3>Welcome back admin!</h3>
                    <img src={"https://y.yarn.co/08d97b30-09c2-4b22-b60e-d1198f17c08e_text.gif"}></img>
                </header>
            </div>
        </div>   
    )
}