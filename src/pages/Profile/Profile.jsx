import React from 'react';
import { useQuery } from 'react-query';
import {
  Avatar,
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import BookshelfTable from './components/Table/BookshelfTable';
import ForkedshelfTable from './components/Table/ForkedshelfTable';

import * as api from '../../api';

const Profile = () => {
  const { data: user, isLoading } = useQuery('user', api.getUserDetail);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box bg="teal.500" h="260px" w="100%" />
      <Box position="relative" mb={16}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Avatar
            size="xl"
            name={`${user?.firstName} ${user?.lastName}`}
            src={user?.profileImgUrl}
          />
        </Box>
      </Box>
      <Container maxW="100%" pl={10}>
        <Text
          as={'h1'}
          fontSize="2xl"
          fontWeight="bold"
          mt="4"
          textAlign="center"
          mb={6}
        >
          {`${user?.firstName} ${user?.lastName}`}
        </Text>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Public</Tab>
            <Tab>Private</Tab>
            <Tab>Forked</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {user?.bookshelves?.public?.length === 0 ? (
                <Text textAlign="center" mt={6}>
                  No bookshelf found
                </Text>
              ) : (
                <BookshelfTable
                  data={
                    user?.bookshelves?.public?.length
                      ? user?.bookshelves?.public
                      : []
                  }
                  onDeleteClick={() => {}}
                />
              )}
            </TabPanel>
            <TabPanel>
              <BookshelfTable
                data={
                  user?.bookshelves?.private?.length
                    ? user?.bookshelves?.private
                    : []
                }
                onDeleteClick={() => {}}
              />
            </TabPanel>
            <TabPanel>
              <ForkedshelfTable
                data={user?.forkedshelves || []}
                onDeleteClick={() => {}}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default Profile;
