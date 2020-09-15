import React, { FunctionComponent } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { GameObject } from '../../interfaces'

interface GameCardProps {
  game: GameObject
  key: string
}

const GameCard: FunctionComponent<GameCardProps> = (props) => {
  const { game, key } = props
  console.log(game)
  return (
    <Card key={key} style={{ width: '15rem' }}>
      <Button variant="secondary">+ Add to collection</Button>
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
