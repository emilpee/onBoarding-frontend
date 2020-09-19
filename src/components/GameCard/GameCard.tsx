import axios from 'axios'
import React, { FunctionComponent } from 'react'
import { Button, Card } from 'react-bootstrap'
import { GameObject } from '../../interfaces'

interface GameCardProps {
  game: GameObject
  cardKey: string
}

const GameCard: FunctionComponent<GameCardProps> = (props) => {
  const { game, cardKey } = props

  const addGameToCollection = async (id: string): Promise<void> => {
    await axios
      .post('http://localhost:8080/collection', { gameId: id })
      .then((res) => console.log(res))
  }

  return (
    <Card key={cardKey} style={{ width: '15rem' }}>
      <Button
        onClick={(): Promise<void> => addGameToCollection(game.id)}
        variant="secondary"
      >
        + Add to collection
      </Button>
      <Card.Img variant="top" src={game.image_url} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>{game.description_preview.slice(0, 150)}...</Card.Text>
        <Button variant="primary">View more</Button>
      </Card.Body>
    </Card>
  )
}

export default GameCard
