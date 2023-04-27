import { HStack } from '@chakra-ui/react';
import React from 'react';

export default function DashboardSection({
  children,
}: {
  children: JSX.Element[];
}) {
  return (
    <HStack width="100%" my="6" gap="4" pb="4" overflow={'auto'}>
      {children}
    </HStack>
  );
}
