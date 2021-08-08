import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Transcations from './components/Transactions';
import Operations from './components/Operations';
import Breakdown from './components/BreakDown';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { RiBankLine } from 'react-icons/ri';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions: [],
      Balance: 0
    }
  }

  deleteElement = async (id) => {
    await this.deleteFromDB(id)
    const transactionsTemp = [...this.state.transactions]
    let index = this.state.transactions.findIndex(t => t._id === id)
    transactionsTemp.splice(index, 1)
    this.setState({
      transactions: transactionsTemp
    })
    this.getBalance()
  }

  addTransaction = async (obj) => {
    await this.addToDB(obj)
    const transactionsTemp = [...this.state.transactions]
    transactionsTemp.push(obj)
    this.setState({
      transactions: transactionsTemp
    })
    this.getBalance()

  }

  addToDB = (obj) => {
    axios.post('http://localhost:8080/transactions', obj)
      .then((response) => {
        console.log(response.data);
      }, (error) => {
        console.log(error);
      })
  }

  deleteFromDB = async (id) => {
    axios.delete(`http://localhost:8080/transactions/${id}`)
      .then((response) => {
        console.log(response.data);
      }, (error) => {
        console.log(error);
      })
  }

  getTransaction = async () => {
    await axios.get(`http://localhost:8080/transactions`)
      .then(res => {
        const trans = res.data;
        this.setState({ transactions: trans })
      })
    this.getBalance()
 
  }

  componentDidMount() {
    this.getTransaction()
  }

  getBalance = () => {
    let transactions = this.state.transactions
    let balance = 0
    transactions.map(t => { return balance += t.amount })
    this.setState({ Balance: balance })
  }

  render() {

    return (
      <div>

        <Router>

          <div className="App">

            <div id="main-links">
              <Navbar bg="dark" variant="dark">
                <Nav className="me-auto">
                  <RiBankLine size={50} color="white" />BANK
                  <Nav.Link href="/transcations">transcations</Nav.Link>
                  <Nav.Link href="/">Operations</Nav.Link>
                  <Nav.Link href="/breakdown">Categories</Nav.Link>
                </Nav>
              </Navbar>
            </div>

         

            <Route exact path="/" render={() =>
              <Operations addTransaction={this.addTransaction} />} />

            <Route exact path="/transcations" render={() =>
              <Transcations Balance={this.state.Balance} transactions={this.state.transactions} deleteElement={this.deleteElement} />} />

            <Route path="/breakdown" exact render={() =>
              <Breakdown />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
