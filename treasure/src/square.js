import React, { Component } from 'react'
import './App.css'

export default class Square extends Component {
    handleClick = () => {
        const{index} = this.props
   this.props.handleClick(index)
}
    render(){
    let{ value } = this.props
        return(
        <div>
        <div
            id= "square-styles"
            onClick={this.handleClick}
          >
          {value}
        </div>
        </div>
            )
        
    }
    }