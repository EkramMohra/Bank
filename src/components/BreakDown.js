import React, { Component } from 'react'
import axios from 'axios'
import './category.css'

class Breakdown extends Component {

  constructor() {
    super()
    this.state = {
      arrOfBalance: []
    }
  }

  async componentDidMount() {
    const response = await this.getBalance()
    this.setState({ arrOfBalance: response.data })
  }

  getBalance = async () => {
    return axios.get(`http://localhost:8080/transactions/categories`)
  }

  render() {
    const list = this.state.arrOfBalance
    return (

      <div >
        <div className="categories">
          <p>Categories</p>
          {list
            .map(item =>
              <div className="category" key={item._id}> <p>{item._id} </p>
                <p className={item.total > 0 ? "positive" : "Negative"}>
                  {item.total}
                </p>
              </div>
            )}
        </div>
      </div>

    )
  }
}
export default Breakdown;