import { HStack } from '@chakra-ui/react';

export default function DashboardSection({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <HStack width="100%" my="6" gap="4" pb="4" overflow={'auto'}>
      {children}
    </HStack>
  );
}
