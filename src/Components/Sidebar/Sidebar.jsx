import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, Link as ReachLink } from 'react-router-dom';
import logo from '../../shared/assets/images/bookshelf.png';
import * as api from '../../api';
import { GoogleLogin } from '@react-oauth/google';

const Sidebar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, refetch: refetchUser } = useQuery(
    'user',
    api.getUserDetail,
    {
      onError: () => {
        localStorage.removeItem('access_token');
        navigate('/', { replace: true });
        queryClient.setQueryData('user', () => null);
      },
    }
  );

  const onLoginSuccess = async ({ credential }) => {
    localStorage.setItem('access_token', credential);

    try {
      const { data } = await api.login();

      localStorage.setItem('access_token', data.access_token);
      refetchUser();
    } catch (error) {
      localStorage.removeItem('access_token');
      queryClient.setQueryData('user', () => null);
      navigate('/', { replace: true });
    }
  };

  const onLoginFailed = () => {
    localStorage.removeItem('access_token');
    queryClient.setQueryData('user', () => null);
    navigate('/', { replace: true });
  };

  // check if user is logged in previously
  useState(() => {
    refetchUser();
  }, []);

  return (
    <VStack p="6" gap={6} height="100%">
      mb={4}
      <Link as={ReachLink} to="/" width="100%" mb={4}>
        <HStack
          gap={2}
          p={2}
          transition="all 0.2s ease-in-out"
          _hover={{
            cursor: 'pointer',
            bg: 'blackAlpha.300',
            borderRadius: 'md',
          }}
        >
          <Image
            borderRadius="full"
            boxSize="50px"
            src={logo}
            alt="Bookshelf"
          />
          <Text as="h1">Bookshelf</Text>
        </HStack>
      </Link>
      {user ? (
        <ReachLink to="/profile">
          <Card
            p="6"
            bg="blackAlpha.300"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              size="lg"
              name={`${user.firstName} ${user.lastName}`}
              src={user.profileImgUrl}
              mb="4"
            />
            <Text
              as="h3"
              fontSize="lg"
              fontWeight="bold"
            >{`${user.firstName} ${user.lastName}`}</Text>
            <Text
              fontSize="sm"
              fontWeight="semibold"
            >{`${user.totalFork} Fork`}</Text>
          </Card>
        </ReachLink>
      ) : (
        <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailed} />
      )}
      {user && (
        <>
          <Accordion allowToggle width="100%">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Public Bookshelf
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {user?.bookshelves?.public ? (
                  user?.bookshelves?.public?.map((bookshelf) => (
                    <Text key={bookshelf.id}>
                      <Link as={ReachLink} to={`/bookshelf/${bookshelf.id}`}>
                        {bookshelf.name}
                      </Link>
                    </Text>
                  ))
                ) : (
                  <Text>Empty</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Private Bookshelf
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {user?.bookshelves?.private ? (
                  user?.bookshelves?.private?.map((bookshelf) => (
                    <Text key={bookshelf.id}>
                      <Link as={ReachLink} to={`/bookshelf/${bookshelf.id}`}>
                        {bookshelf.name}
                      </Link>
                    </Text>
                  ))
                ) : (
                  <Text>Empty</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Forked Bookshelf
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {user?.forkedshelves.length ? (
                  user.forkedshelves.map((forkedShelf) => (
                    <Text key={forkedShelf.id}>
                      <Link
                        as={ReachLink}
                        to={`/bookshelf/${forkedShelf.bookshelf.id}`}
                      >
                        {forkedShelf.bookshelf.name}
                      </Link>
                    </Text>
                  ))
                ) : (
                  <Text>Empty</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button
            onClick={onLoginFailed}
            mt="auto !important"
            colorScheme="red"
          >
            logout
          </Button>
        </>
      )}
    </VStack>
  );
};

export default Sidebar;
