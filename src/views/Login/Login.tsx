import React, { FunctionComponent } from 'react'
import { CLIENT_ID } from '../../boardgameatlas.config'
import { Button, Form, Container, Row } from 'react-bootstrap'
import './styles.scss'

const Login: FunctionComponent = () => {
    const handleConnectClick = (): void => {
        function generateUrlWithState() {
            const state = Math.random()
                .toString(36)
                .substring(7)
            return `https://www.boardgameatlas.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&state=${state}&redirect_uri=http://localhost:8080/oauth`
        }

        window.location.href = generateUrlWithState()
    }

    return (
        <Container className="login" fluid>
            <Row>
                <h1>onBoarding</h1>
            </Row>
            <Row>
                <p className="text-center">
                    Welcome! In order to use this application, you must connect to Board Game Atlas. Click the button to
                    authenticate.
                </p>
            </Row>
            <Row>
                <Button className="btn" variant="info" onClick={handleConnectClick}>
                    Connect to BGA
                </Button>
            </Row>
        </Container>
    )
}

export default Login
