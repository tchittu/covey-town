import { Avatar, ButtonGroup, Heading, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';

export function SelfFriendItem(props: { userName: string; onRemove: () => void }) {
  return (
    <HStack key={props.userName} spacing={3}>
      <Avatar />
      <Heading fontSize={18} color='teal.900'>
        {props.userName}
      </Heading>
      <ButtonGroup>
        <IconButton aria-label='Remove from friends' size='xs' onClick={props.onRemove} />
      </ButtonGroup>
    </HStack>
  );
}
