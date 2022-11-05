import Web3 from "web3";
import React, { useEffect, useState } from "react";
import Login from "./components/Login/login";
import Voting from "./components/VotingStation/voting"
import Error from "./components/Error/error"
import ThankYou from "./components/ThankYou/thankyou";
import RegisterCandidate from "./components/Candidate/registerCandidate";
import Start from "./components/Start/start";
import End from "./components/end/End"
import Admin from "./components/admin/admin";
import AdminError from "./components/Error/adminError";
import ThankRegister from "./components/ThankYou/thankRegistering";
import Error3 from "./components/Error/error3";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router,Routes, Route, useRoutes} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {ethers} from 'ethers';
import { parseBytes } from './utils';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";

function App() {
  const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
  const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
  const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 

  const navigate = useNavigate();
  const {ethereum} = window;

  const [contract, setToken] = useState();
  const [candidateNames, setcandidateNames] = useState([]);
  const [candidateImages, setcandidateImages] = useState([]);
  const [winnerNames, setWinnerNames] = useState([]);
  const [winnerImages, setWinnerImages] = useState([]);
  const [winningVoteCount, setWinningVoteCount] = useState([]);
  const [admin, setAdmin] = useState('');
  const [loading, setLoading] = useState(false);


  async function _initialize() {
		await _intializeEthers();
	}

	const _intializeEthers = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const _contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

		const candidateNames = await _contract.methods.get_candidate_names().call();
    const candidateImages = await _contract.methods.get_candidate_images().call();

		const admin = await _contract.methods.admin().call();

		setToken(_contract);
		setcandidateNames(candidateNames);
    setcandidateImages(candidateImages);
		setAdmin(admin);

    const names = await _contract.methods.get_winner().call();
    setWinnerNames(names);
    const images = await _contract.methods.get_winner_images().call();
    setWinnerImages(images);
    const voteCount = await _contract.methods.get_winning_votes().call();
    setWinningVoteCount(voteCount);
	};

	async function init() {
		const [selectedAddress] = await window.ethereum.enable();
		_initialize(selectedAddress);
	}

	useEffect(() => {
		init();
	}, []);

  const voteCandidate = async (candidate) => {
    const voted = await contract.methods.check_voted(address).call();
    if (!voted) {
      setLoading(true);
      await contract.methods.vote(candidate).send({from: address});
      setTimeout(() => {
        setLoading(false);
        navigate("/thanks");
      }, 7000);
      
    }
    else {
      navigate("/error");
    }
	};

  const startElection = async () => {
    const isAdmin = await contract.methods.is_admin(address).call();
    if (!isAdmin) {
      navigate("/adminerror");
    } else {
      await contract.methods.start_election().send({from: address});
    }
  }

  const endElection = async () => {
    const isAdmin = await contract.methods.is_admin(address).call();
    if (!isAdmin) {
      navigate("/adminerror");
    } else {
      await contract.methods.end_election().send({from: address});
      const names = await contract.methods.get_winner().call();
      setWinnerNames(names);
      const images = await contract.methods.get_winning_images().call();
      setWinnerImages(images);
      const voteCount = await contract.methods.get_winning_votes().call();
      setWinningVoteCount(voteCount);
    }
  }

  const redirect = () => {
    navigate("/");
    window.location.reload();
  }

  const directToRegister = async () => {
    const registered = await contract.methods.check_registered(address).call();
    if (registered) {
      navigate("/thankregister");
    } else {
      navigate("/candidate");
    }
  }

  const directToVoting = () => {
    navigate("/voting");
  }

  const directToStart = () => {
    navigate("/start");
  }

  const directToEnd = () => {
    navigate("/end");
  }

  const registerCandidate = async(name, url) => {
    const parsedName = ethers.utils.formatBytes32String(name);
    setLoading(true);
    await contract.methods.register_candidates(parsedName ,url).send({from: address});
    setTimeout(() => {
      setLoading(false);
      navigate("/thankregister");
    }, 15000);
  }


  const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'. 
    try {
        if (!ethereum){
            setHaveMetamask(false);
        }
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });

        setAddress(accounts[0]);
        setIsConnected(true); 

        const started = await contract.methods.started().call();
        const ended = await contract.methods.ended().call();
        const isAdmin = await contract.methods.is_admin(accounts[0]).call();
        if (isAdmin) {
          navigate("/admin");
        } else if (!started) {
          navigate("/start");
        } else if (ended){
          navigate("/end");
        } else {
          navigate("/voting"); 
        }    
    }
    catch (error){
        setIsConnected(false);
    }
  }

  return (
    <div className="App">
        <Routes>
          <Route path = "/" element = {<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} />}></Route>
          <Route path = "/voting" element = {<Voting 
                                              isConnected = {isConnected} 
                                              candidateNames = {candidateNames} 
                                              candidateImages = {candidateImages} 
                                              voteCandidate = {voteCandidate}
                                              redirect = {redirect} 
                                              loading = {loading}
                                              />}>                         
          </Route>
          <Route path = "/error" element = {<Error redirect = {redirect}/>}></Route>
          <Route path ="/thanks" element ={<ThankYou redirect = {redirect}/>}></Route>
          <Route path="/candidate" element ={<RegisterCandidate loading = {loading} isConnected = {isConnected} redirect = {redirect} register = {registerCandidate}/>}></Route>
          <Route path="/start" element={<Start isConnected = {isConnected} candidateNames = {candidateNames} candidateImages = {candidateImages} redirect={redirect} register={directToRegister}/>}></Route>
          <Route path="/end" element={<End isConnected = {isConnected} redirect={redirect} winnerNames={winnerNames} winnerImages={winnerImages} voteCount={winningVoteCount} />}></Route>
          <Route path="/admin" element={<Admin redirect = {redirect} start={startElection} end={endElection} startPage={directToStart} endPage={directToEnd} registerPage={directToRegister} votingPage={directToVoting}/>}></Route>
          <Route path="/adminerror" element={<AdminError redirect={redirect}/>}></Route>
          <Route path="/thankregister" element={<ThankRegister redirect={redirect}/>}></Route>
          <Route path="/registrationError" element={<Error3 redirect={redirect}/>}></Route>
        </Routes>
  </div>
  );
}

export default App;
