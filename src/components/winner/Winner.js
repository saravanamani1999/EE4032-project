export default function Winner(props){
    // const handleNewVoter = (e) => {
	// 	props.setNewVoter(e.target.value);
	// };
    return (
        <div className="rights">
            <h4>Announce Winnner</h4>
            <p>(only organiser can announce winner)</p>
            <div>
                <button onClick={props.announceWinner}>Announce Winner!</button>
            </div>
        </div>
    )
}