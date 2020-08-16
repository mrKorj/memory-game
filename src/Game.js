import React, {useEffect, useMemo, useState} from "react";
import {Card} from "./Card";
import shuffle from 'lodash.shuffle';
import {images} from './App'

function shuffleCards() {
    const cards = images.reduce((cards, image) => cards.concat([image, image]), []);
    const stackImg = shuffle(cards);
    return stackImg.map((card, index) => {
        return {img: card, id: index + 'a', isFlipped: false}
    })
}

let intervalID

export const Game = ({playerName, exitGame}) => {
    const stack = shuffleCards()

    const [card, setCard] = useState(stack)
    const [flippedCards, setFlippedCards] = useState([])
    const [currentFlippedCard, setCurrentFlippedCard] = useState(0)
    const [timer, setTimer] = useState(0)
    const [playerScore, setPlayerScore] = useState(0)
    const [failures, setFailures] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [startGame, setStartGame] = useState(false)

    const [player, setPlayer] = useState([])

    useMemo(() => {
        const players = []
        playerName.forEach((player, index) => {
            if (index === 0) {
                players.push({name: player, score: 0, failures: 0, isActive: true})
            } else {
                players.push({name: player, score: 0, failures: 0, isActive: false})
            }
        })
        setPlayer(players)
    }, [playerName])

    useEffect(() => {
        intervalID = setInterval(() => {
            setTimer(prevState => prevState + 1)
        }, 1000)
    }, [startGame])


    const newGame = () => {
        const stack = shuffleCards()
        setCard(stack)
        setGameOver(false)
        setPlayerScore(0)
        setTimer(0)
        setStartGame(prevState => !prevState)
    }

    useEffect(() => {
        const isGameOver = card.every(card => card.isFlipped === true)
        if (isGameOver) {
            setGameOver(true)
            clearInterval(intervalID)
        }
    }, [card])

    useEffect(() => {
        if (currentFlippedCard === 2) {
            if (flippedCards[0].img === flippedCards[1].img) {
                setPlayerScore(prevState => prevState + 1)
            } else {
                setTimeout(() => {
                    setCard(prevState => prevState.map(card => {
                        if (flippedCards[0].id === card.id) {
                            card.isFlipped = false
                        }
                        if (flippedCards[1].id === card.id) {
                            card.isFlipped = false
                        }
                        return card
                    }))
                    setFailures(prevState => prevState + 1)

                }, 1000)
            }
            setCurrentFlippedCard(0)
            setFlippedCards([])
        }
    }, [currentFlippedCard, flippedCards])

    const onFlipped = (id) => {
        // eslint-disable-next-line array-callback-return
        card.find(item => {
                if (item.id === id && item.isFlipped !== true) {

                    setCurrentFlippedCard(prevState => prevState + 1)

                    if (currentFlippedCard < 2) {
                        card.forEach(card => {
                            if (card.id === id) {
                                setFlippedCards(prevState => prevState.concat(card))
                            }
                        })

                        setCard(prevState => prevState.map(card => {
                            if (id === card.id) {
                                card.isFlipped = true
                            }
                            return card
                        }))
                    }
                }
            }
        )
    }


    return (
        <div className='container'>
            <div className='score'>
                <div>
                    {player.map((player, index) => {
                        return (<div className='player-section' key={index}>
                            <p>Player {index + 1}: <strong>{player.name}</strong>.</p>
                            <p>Success: {playerScore}.</p>
                            <p>Failures: {failures}.</p>
                        </div>)
                    })}
                </div>
                <div style={{borderBottom: '1px solid #ccc'}}>
                    <p>Timer: {timer} s.</p>
                </div>
            </div>
            <div className='game'>
                {
                    card.map(card => <Card card={card} onFlip={onFlipped} key={card.id}/>)
                }
                <div>
                    {
                        gameOver
                            ? (<div className='game-over'>
                                <div>Well Done <span>{playerName}</span>!</div>
                                <div>you did it in <span>{timer}</span> seconds
                                    and <span>{failures + playerScore}</span> attempts.
                                </div>
                                <div>But You can better! :)</div>
                                <div>
                                    <button className='start-btn' onClick={newGame}>START NEW GAME</button>
                                </div>
                                <button className='exit-btn' onClick={exitGame}>EXIT</button>
                            </div>)
                            : null
                    }
                </div>
            </div>
        </div>
    )
}


