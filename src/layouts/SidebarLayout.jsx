import { Grid, GridItem } from '@chakra-ui/react';
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
      <GridItem colSpan={2} bg="blackAlpha.500">
        <Sidebar />
      </GridItem>
      <GridItem colSpan={10}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default SidebarLayout;
