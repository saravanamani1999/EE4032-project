import { Button } from "react-bootstrap"
import "./login.css"
export default function Login(props){

    const NoMetamask = () => {
        return (
            <div>
                <p>
                    No MetaMask detected. 
                    <br></br>
                    Please install METAMASK to your browser to proceed. 
                </p>
            </div>
        )
    }

    const LoginMetamask = () => {
        return (
            <div>
                <img src={"https://y.yarn.co/4d7b4db1-c6af-44e8-b31b-c14630bdceea_text.gif"}></img>
                <p>
                    Please log in to MetaMask to cast your vote
                </p>
                <Button variant="primary" onClick= {props.connectTo}>
                    Login to METAMASK
                </Button>
            </div>
        )
    }

    return (
        <div className = "login">
            <h2>
                Welcome to Blockchain Voting Station
            </h2>
            {
                props.isHaveMetamask ?
                <LoginMetamask /> :
                <NoMetamask />
            }
        </div>
    )
}