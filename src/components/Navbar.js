import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

export default function Navbar() {
  return (
    <Menu inverted>
        <Container>
            <Menu.Item name="navs"></Menu.Item>
            <Menu.Item name="peoples"></Menu.Item>
        </Container>
    </Menu>    

    
  );
}
