import "./error.css"
import { Button } from "react-bootstrap"


export default function AdminError(props){
    return (
        <div className="error">
            <img className="image" src="https://www.linkpicture.com/q/LPic6363f00868c39663903440.gif"></img>
            <h2 className="errorMsg">
                You're not the admin!
            </h2>
            <h6>The functions which you clicked on is only for the admin's use.</h6>
            <Button variant="primary" onClick={props.redirect}>
                    Home
            </Button>
        </div>
    )
}