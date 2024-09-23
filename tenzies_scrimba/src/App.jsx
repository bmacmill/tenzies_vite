import React, { useState, useEffect } from "react"
import Die from "./Die"
import "./App.css"
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"

export default function App() {

  // state variables
  const [dice, setDice] = useState(allNewDiceRoll())
  const [tenzies, setTenzies] = useState(false)

  //checking if game is won
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstNumber = dice[0].value
    const allSameNumber = dice.every((die) => die.value === firstNumber)
    if (allHeld && allSameNumber) {
      setTenzies(true)
    }

  }, [dice])


  //generic roll dice function
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  //full roll of all dice
  function allNewDiceRoll() {
    const firstDiceRoll = []
    for (let i = 0; i < 10; i++) {
      firstDiceRoll.push(generateNewDie())
    }
    return firstDiceRoll
  }

  // hold the dice that are clicked on
  function holdDice(id) {
    setDice(prevDice => prevDice.map((die) => {

      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  //check which dice are held, and roll others
  //if tenzies is won, reset game
  function rollDiceAgain() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDiceRoll())
    } else {
      setDice(prevDice => prevDice.map((die) => {
        return die.isHeld === true ? { ...die } : generateNewDie()
      }))
    }
  }

  // game render
  return (
    <div className="Container">
      {tenzies && <Confetti />}
      <main>
        <h1 className="Title">Tenzies</h1>
        <p className="Instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="DieContainer">
          {dice.map((die) => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)}
        </div>
        <button onClick={rollDiceAgain} className="RollButton">{tenzies ? "NewGame" : "Roll"}</button>
      </main>
    </div>
  )
}