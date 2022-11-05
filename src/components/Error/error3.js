import "./error.css"
import { Button } from "react-bootstrap"


export default function Error3(props){
    return (
        <div className="error">
            <img className="image" src="https://www.linkpicture.com/q/error_12.png"></img>
            <h2 className="errorMsg">
                Oooops! The election has already started!
            </h2>
            <h6>
                You cannot register to be a candidate after the election has started.
            </h6>
            <Button variant="primary" onClick={props.redirect}>
                    Home
            </Button>
        </div>
    )
}