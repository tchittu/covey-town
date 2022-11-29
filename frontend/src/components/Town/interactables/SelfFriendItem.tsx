<<<<<<< HEAD
=======
import { SmallCloseIcon } from '@chakra-ui/icons';
>>>>>>> 2b118449246807fbd2d0c452ea52637b4c7967cc
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
        <IconButton
          aria-label='Remove from friends'
          size='xs'
<<<<<<< HEAD
=======
          icon={<SmallCloseIcon />}
>>>>>>> 2b118449246807fbd2d0c452ea52637b4c7967cc
          onClick={props.onRemove}
        />
      </ButtonGroup>
    </HStack>
  );
}
