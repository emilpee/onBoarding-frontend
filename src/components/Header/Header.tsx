import React, { FunctionComponent, useEffect, useState } from "react";
import { User } from "../../interfaces";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";

interface HeaderProps {
  user: User;
}

const Header: FunctionComponent<HeaderProps> = (props) => {
  const { user } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <Navbar expand="md" sticky="top" bg="light">
      <Navbar.Brand href="#">onBoarding</Navbar.Brand>
      <Navbar.Collapse className="justify-content-between">
        <Nav>
          <Nav.Link href="/games">Browse Games</Nav.Link>
        </Nav>
        <Nav>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <PersonFill /> {user.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
        <Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="primary">Search</Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
