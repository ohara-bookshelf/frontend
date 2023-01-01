import { Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';

const SidebarLayout = () => {
  return (
    <Grid
      minH={'100vh'}
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem h="100vh" colSpan={2} bg="blackAlpha.500">
        <Container h="100%">
          <Sidebar />
        </Container>
      </GridItem>
      <GridItem colSpan={10} h="100vh" overflow="auto">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default SidebarLayout;
