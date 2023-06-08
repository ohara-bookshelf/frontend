import { HStack, Text } from '@chakra-ui/react';

export default function Rating({
  code,
  length,
  ...rest
}: {
  code: string;
  length: number;
}) {
  const renderStarRating = () =>
    Array.from({ length }, (_, index) => (
      <Text key={`${code}-star-${index}`}>&#9733;</Text>
    ));
  return <HStack {...rest}>{renderStarRating()}</HStack>;
}
