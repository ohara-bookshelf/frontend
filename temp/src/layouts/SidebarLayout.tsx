import { Box, Container, Flex, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar/Sidebar';

export default function SidebarLayout() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex w="100%" minH={'100vh'} position={'relative'}>
      <Box
        w={isOpen ? ['100%', '25rem'] : '0'}
        h="100vh"
        position={['absolute', 'relative']}
        background={'gray.700'}
        transition={'all ease 0.3s'}
        zIndex={'overlay'}
      >
        <Box
          w="8"
          h="8"
          bg={isOpen ? 'gray.800' : 'gray.700'}
          position="absolute"
          top="16"
          right={'-4'}
          transform={'rotate(45deg)'}
          onClick={onToggle}
        />
        <Container w="100%" h="100%">
          <Sidebar isOpen={isOpen} />
        </Container>
      </Box>
      <Box w="100%" h="100vh" overflow="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}
