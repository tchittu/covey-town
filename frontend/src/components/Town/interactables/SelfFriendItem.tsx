<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { SmallCloseIcon } from '@chakra-ui/icons';
>>>>>>> 2b118449246807fbd2d0c452ea52637b4c7967cc
>>>>>>> 922cfeef0616a0a9d44ddff9539802597e39bb47
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
<<<<<<< HEAD
        <IconButton aria-label='Remove from friends' size='xs' onClick={props.onRemove} />
=======
        <IconButton
          aria-label='Remove from friends'
          size='xs'
<<<<<<< HEAD
=======
          icon={<SmallCloseIcon />}
>>>>>>> 2b118449246807fbd2d0c452ea52637b4c7967cc
          onClick={props.onRemove}
        />
>>>>>>> 922cfeef0616a0a9d44ddff9539802597e39bb47
      </ButtonGroup>
    </HStack>
  );
}
