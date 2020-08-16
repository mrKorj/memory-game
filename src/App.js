import React, {useState} from 'react';
import {Game} from "./Game";
import {Start} from "./Start";
import {stackImages} from './Stack'


function App() {
    const [playerName, setPlayerName] = useState([])
    const [play, setPlay] = useState(true)

    const StartGame = (name) => {
        setPlayerName(prevState => prevState.concat(name))
        setPlay(false)
    }
    const onExitGame = () => {
        setPlayerName([])
        setPlay(true)
    }
    const easyHandler = () => {
        images = stackImages.slice(0, 3)
    }
    const mediumHandler = () => {
        images = stackImages.slice(0, 6)
    }
    const hardHandler = () => {
        images = stackImages
    }

    return (
        <>
            {
                play
                    ? <Start onStartGame={StartGame} onEasy={easyHandler} onMedium={mediumHandler} onHard={hardHandler}/>
                    : <Game playerName={playerName} exitGame={onExitGame}/>
            }
        </>
    );
}
export let images
export default App;
