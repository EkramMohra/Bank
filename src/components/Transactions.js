import React, { Component } from 'react';
import Transcation from './Transaction'
import './Transactions.css'

class Transcations extends Component {
    render() {

        const transcations = this.props.transactions

        return (
            <div>
                <div className="Balance" >Transactions-Balance: <span className={this.props.Balance > 0 ? "positive" : "Negative"}>
                    {this.props.Balance}
                </span>
                </div>
                <div className="all-transactions">
                    {transcations.map(t => <Transcation key={Math.random() * 10} transcation={t} deleteElement={this.props.deleteElement} />)}

                </div >
            </div>
        )

    }
}

export default Transcations;
