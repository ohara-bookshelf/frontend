import { Avatar, Box, Image } from '@chakra-ui/react';
import React from 'react';
import { useUserStore } from 'src/flux/store';

export default function ProfileLayout() {
  const { user } = useUserStore();
  return (
    <Box>
      <Image
        bg='teal.500'
        h='260px'
        w='100%'
        src='https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1385&q=80'
        objectFit='cover'
      />
      <Box position='relative' mb={16}>
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
        >
          <Avatar
            size='xl'
            name={`${user?.firstName} ${user?.lastName}`}
            src={user?.profileImgUrl}
            border='2px solid teal'
          />
        </Box>
      </Box>
    </Box>
  );
}
