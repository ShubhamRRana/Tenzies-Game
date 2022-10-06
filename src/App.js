// Future Enchancements

// Put real dots on the dice
// Track th number of rolls
// Track the time it took to win 
// Save your best time to loaclStorage

import React from "react";
import { useState } from "react";
import "./App.css"
import Die from "./Component/Die";
import {nanoid} from "nanoid"
import { useEffect } from "react";
import Confetti from "react-confetti";

export default function App(){

  let [dice, setDice] = useState(allNewDice())
  let [tenzies, setTenzies] = useState(false)

  useEffect(() => {
  let allHeld = dice.every(die => die.isHeld) 
  let firstValue = dice[0].value
  let allSameValue = dice.every(die => die.value === firstValue)
  if(allHeld && allSameValue){
    setTenzies(true)
  }
  })

  function generateNewDie(){
    return{
      id: nanoid(),
      value: Math.ceil(Math.random() * 6), 
      isHeld: false
    }
  }

  function allNewDice(){
    let newDice=[]
    for(let i=0 ; i<10 ; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }  

  function rollDice(id){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie() 
      }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die =>{
     return die.id === id ? {...die, isHeld : !die.isHeld} : die
    }))
   }

  let diceElements = dice.map( 
    item => <Die 
      key={item.id}
      value={item.value} 
      isHeld={item.isHeld} 
      holdDice={() => holdDice(item.id)}
    />
  )

  return(
    <main>
    {tenzies && <Confetti />}
    <h1 className="title"> Tenzies </h1>
    <p className="instructions"> Roll unitl all dice are the same. Click each die to freeze it at its current value between rolls. </p>
      <div className="dice-container">
        {diceElements}
      </div> 
      <button className="dice-button" onClick={rollDice}> 
          {tenzies ? "New Game" : "Roll"} 
      </button>
    </main>
  )
}