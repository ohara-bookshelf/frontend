import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, Link as ReachLink } from 'react-router-dom';
import * as api from '../../api';
import { GoogleLogin } from '@react-oauth/google';
import { ChevronRightIcon } from '@chakra-ui/icons';

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
    <VStack h="100%" py={8} gap={8}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <Link as={ReachLink} to="/">
            Home
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>
      {user ? (
        <Link as={ReachLink} to="/profile">
          <Card
            p="6"
            width="100%"
            alignItems="center"
            justifyContent="center"
            bg="transparent"
            transition="all 0.2s ease-in-out"
            _hover={{
              bg: 'blackAlpha.300',
            }}
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
        </Link>
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
                      <Link as={ReachLink} to={`/profile/${bookshelf.id}`}>
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
                      <Link as={ReachLink} to={`/profile/${bookshelf.id}`}>
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
                        to={`/bookshelves/${forkedShelf.bookshelf.id}`}
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
