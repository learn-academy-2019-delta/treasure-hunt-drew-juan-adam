import React, {Component} from 'react'
import Square from './square.js'
import  App from './App.css'

export default class Board extends Component{
    constructor(props){
        super(props)
        this.state = {
        spaces: [],
        gameStatus: 'unstarted',
        bombIndex: 0,
        treasureIndex: 1,
        }
    }
    
    startGame = () => {
        const{ spaces } = this.state
        const bombIndex = this.getOpenBoardNumber(9)
        const treasureIndex = this.getOpenBoardNumber(9, [bombIndex])
        this.setState({
            spaces: [
                '?', '?', '?',
                '?', '?', '?',
                '?', '?', '?'
            ],
            bombIndex: bombIndex,
            treasureIndex: treasureIndex,
            gameStatus: 'inProgress',
        })
    }
    
    getOpenBoardNumber = (max, blackList=[]) => {
        let newNumber
        do{
            newNumber = Math.floor(Math.random() * max)
            console.log(newNumber)
        }while(blackList.indexOf(newNumber) >=0)
        return newNumber
    }
    
    handleClick = (spacesIndex) => {
        console.log(this.state)
        let{ gameStatus } = this.state
        const{ bombIndex, spaces, treasureIndex} = this.state
        
        if(gameStatus != 'inProgress'){ return }
        
        if(spacesIndex === bombIndex){
            spaces[spacesIndex] = 'BOOM'
            gameStatus = 'lost'
        }else if(spacesIndex === treasureIndex){
            spaces[spacesIndex] = 'Coin'
            gameStatus = 'won'
        } else {
            spaces[spacesIndex] = 'T'
        }
        
        this.setState({ gameStatus, spaces })
    }
    render () {
        let {spaces, gameStatus} = this.state
        let square = spaces.map((value, index) => {
            return(
                <Square
                    key={index}
                    value={value}
                    index={index}
                    handleClick={this.handleClick}
                />
            )
        })
        return (
            <div>
            <h1> Treasure Hunt</h1>
            {gameStatus != 'inProgress' &&
            <button 
            onClick={this.startGame}
            >
            Start Game
            </button>
            }
            
            {gameStatus === 'won' &&
            <h2>You Won</h2>
            }
            
            {gameStatus === 'lost' &&
            <h2>You Lost</h2>
            }
            <div id="board-styles"> {square} </div>
            </div>
            )
    }
}