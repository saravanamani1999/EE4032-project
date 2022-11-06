import "./thankyou.css"
import { Button } from "react-bootstrap"

export default function ThankInterest(props){
    return (
        <div className="thankyou">
            <h1>
                Thank you for interest!
            </h1>
            <p> But unfortunately all the candidate vacancies have been filled up!</p>
            <img src="https://media.tenor.com/35hmBwYHYikAAAAC/the-office-bow.gif"></img>
            <Button variant="primary" onClick={props.redirect}>
                    Home
            </Button>
        </div>
    )
}