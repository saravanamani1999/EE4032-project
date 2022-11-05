import "./thankyou.css"
import { Button } from "react-bootstrap"

export default function ThankRegister(props){
    return (
        <div className="thankyou">
            <h1>
                Thank you for registering!
            </h1>
            <img src="https://media.tenor.com/pyGugHcm4XcAAAAC/michael-scott-the-office.gif"></img>
            <Button variant="primary" onClick={props.redirect}>
                    Home
            </Button>
        </div>
    )
}