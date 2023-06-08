import { Avatar, AvatarProps, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { EMOTION_COLOR, EMOTION_LABELS } from 'src/shared/constants';
import { Expression } from 'src/shared/interfaces';

interface ProfileAvatarProps extends AvatarProps {
  name: string;
  src?: string;
  expression?: Expression;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  src,
  expression,
  ...rest
}) => {
  return (
    <Box position="relative">
      <Avatar
        name={name}
        src={src}
        borderWidth="4px"
        borderStyle="solid"
        borderColor={EMOTION_COLOR[expression ?? 'neutral']}
        {...rest}
      />
      <Flex
        position="absolute"
        bottom="0"
        right="0"
        bg={EMOTION_COLOR[expression ?? 'neutral']}
        borderRadius="full"
        w="1.5rem"
        h="1.5rem"
        justifyContent="center"
        alignItems="center"
      >
        <Text as="small">{EMOTION_LABELS[expression ?? 'neutral']}</Text>
      </Flex>
    </Box>
  );
};

export default ProfileAvatar;
