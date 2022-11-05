import "./error.css"
import { Button } from "react-bootstrap"


export default function Error2(props){
    return (
        <div className="error">
            <img className="image" src="https://www.linkpicture.com/q/error_12.png"></img>
            <h2 className="errorMsg">
                Oooops! You do not seem to have access to this voting station.
            </h2>
            <h6>
                Please request the organiser to add you to the list of registered voters for you to access the polling station.
            </h6>
            <Button variant="primary" onClick={props.redirect}>
                    Home
            </Button>
        </div>
    )
}