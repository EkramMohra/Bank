import React, { Component } from 'react';
import Button from "react-bootstrap/Button"
import './operations.css'
import { withRouter } from "react-router";
import './Transactions.css'

class Operations extends Component {

    constructor() {
        super();
        this.state = {
            amount: "",
            vendor: "",
            category: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleButton = async (event) => {
        let buttonName = event.target.name
        let state = this.state
        let transObj = {
            amount: buttonName === "deposit" ? state.amount * 1 : state.amount * -1,
            vendor: state.vendor,
            category: state.category
        }

        if (transObj.amount !== "" && transObj.category !== "" && transObj.vendor !== "") {
            this.props.addTransaction(transObj)
            this.props.history.push("/transcations")

        }
        
        else {
            alert("one or more of the input fields is empty ,fill in all the inputs")

        }
    }

    render() {

        return (

            <form >

                <div className="form-group">
                    <div >
                        <label >amount</label>
                        <input name="amount" id="input-amount" placeholder="Enter amount" className="form-control" value={this.state.amount} onChange={this.handleChange} />
                    </div>

                    <div >
                        <label >vendor</label>
                        <input name="vendor" id="input-vendor" placeholder="Enter vendor" className="form-control" value={this.state.vendor} onChange={this.handleChange} />
                    </div>

                    <div>
                        <label >category</label>
                        <input name="category" id="input-category" placeholder="Enter category" className="form-control" value={this.state.category} onChange={this.handleChange} />
                    </div>

                    <Button name="deposit" className="btn btn-success btn-md" onClick={this.handleButton}>Deposit</Button>
                    <Button name="withdraw" className="btn btn-danger btn-md" onClick={this.handleButton}>Withdraw</Button>

                </div >

            </form>

        )
    }
}

export default withRouter(Operations)
