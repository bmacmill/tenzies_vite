import React from "react"

//a die component with inline ternary style if clicked on/isHeld
//destructuring props as per WDBC way of doing props
export default function Die({ value, isHeld, holdDice }) {
    const styles = { 
        backgroundColor: isHeld ? "#59E391" : "white" 
    }
    return (
        <div onClick={holdDice} className="Die" style={styles} >
            <h2 className="DieNumber">{value}</h2>
        </div>
    )
}

