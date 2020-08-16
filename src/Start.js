import React, {useState} from "react";

export const Start = ({onStartGame, onEasy, onMedium, onHard}) => {
    const [val, setVal] = useState('')

    const changeHandler = (event) => {
        setVal(event.target.value)
    }


    const submitHandler = (event) => {
        event.preventDefault()
        onStartGame(val)
    }

    return (
        <div className='game-over'>
            <h3>Let's start this awesome game! :)</h3>
            <form className='start-screen' onSubmit={submitHandler}>
                <input type="text" value={val} onChange={changeHandler}
                       placeholder='player name' required/>
                <div>
                    <button className='start-btn' onClick={onEasy}>EASY</button>
                    <button className='start-btn' onClick={onMedium}>MEDIUM</button>
                    <button className='start-btn' onClick={onHard}>HARD</button>
                </div>
            </form>
        </div>
    )
}
