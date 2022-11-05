import "./error.css"
import { Button } from "react-bootstrap"

export default function Error(props){
    return (
        <div className="error">
            <img className="image" src="https://www.linkpicture.com/q/error_12.png"></img>
            <h2 className="errorMsg">
                Oooops! You have already voted!
            </h2>
            <h6>
                Each voter only gets 1 vote, thank you for voting!
            </h6>
            <Button variant="primary" onClick={props.redirect}>
                    Home
            </Button>
        </div>
    )
}