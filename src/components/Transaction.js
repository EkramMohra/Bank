import React, { Component } from 'react';
import './Transaction.css'
import { BsFillDashCircleFill } from 'react-icons/bs';



class Transcation extends Component {

    delete = () => {
        const transcation = this.props.transcation
        this.props.deleteElement(transcation._id)
    }

    render() {

        const transcation = this.props.transcation

        return (
            <div className="transaction">

                <BsFillDashCircleFill className="icon" onClick={this.delete} />
                <div className="trnsCategory">  {transcation.category}</div>
                <hr></hr>
                <div className={transcation.amount > 0 ? "positive" : "Negative"}> {transcation.amount}</div>

                <div>   {transcation.vendor}</div>

            </div>
        )
    }
}

export default Transcation;
