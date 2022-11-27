import { AddIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import PlayerController from '../../../classes/PlayerController';
import useTownController from '../../../hooks/useTownController';

interface ProfileModalProps {
  open: boolean;
  openPlayer: PlayerController | undefined;
  handleClick: () => void;
  updateData: (avatar: string | undefined, aboutMe: string, friendsList: string[]) => void;
  self: PlayerController;
}

export default function ProfileModal(props: ProfileModalProps): JSX.Element {
  const coveyTownController = useTownController();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    if (props.open) {
      coveyTownController.pause();
    } else {
      coveyTownController.unPause();
    }
    setIsFriend(props.self.profile.friendsList.some(x => x === props.openPlayer?.userName));
  }, [coveyTownController, props.open]);

  const closeModal = useCallback(() => {
    coveyTownController.unPause();
    props.handleClick();
  }, [coveyTownController, props.handleClick]);
  console.log(
    'self: ',
    props.self.userName,
    ' selfFriends: ',
    props.self.profile.friendsList,
    ' openPlayer: ',
    props.openPlayer?.userName,
    isFriend,
  );
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.open}
      onClose={() => {
        closeModal();
        coveyTownController.unPause();
      }}
      useInert={true}>
      <ModalOverlay />
      <ModalContent maxW={'400px'}>
        <ModalCloseButton autoFocus={false} />
        <Center>
          <Box
            maxW={'400px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Avatar
              size={'xl'}
              src={props.openPlayer?.profile.avatar}
              mb={4}
              pos={'relative'}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {props.openPlayer?.userName}
            </Heading>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
              mt={6}>
              {props.openPlayer?.profile.aboutMe}
            </Text>
            <Box>
              <Button colorScheme='teal' variant='ghost' onClick={onOpen}>
                {props.openPlayer?.profile.friendsList.length === 0
                  ? 'No'
                  : props.openPlayer?.profile.friendsList.length}{' '}
                Friends
              </Button>
              <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>{props.openPlayer?.userName + "'s Friends"}</DrawerHeader>

                  <DrawerBody>
                    <VStack w={400} spacing={4} align='start'>
                      {props.openPlayer?.profile.friendsList.map(friend => {
                        return (
                          <HStack key={friend} spacing={3}>
                            <Avatar />
                            <Heading fontSize={18} color='teal.900'>
                              {friend}
                            </Heading>
                            <ButtonGroup>
                              <IconButton
                                aria-label='Add to friends'
                                size='xs'
                                icon={<AddIcon />}
                              />
                            </ButtonGroup>
                          </HStack>
                        );
                      })}
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>

            <Stack mt={8} direction={'row'} spacing={4}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}>
                Message
              </Button>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                onClick={() => {
                  if (isFriend) {
                    props.updateData(
                      props.self.profile.avatar,
                      props.self.profile.aboutMe,
                      props.self.profile.friendsList.filter(x => x !== props.openPlayer!.userName),
                    );
                    setIsFriend(false);
                  } else {
                    const newFriendsList = props.self.profile.friendsList;
                    if (newFriendsList.findIndex(x => x === props.openPlayer!.userName) == -1) {
                      newFriendsList.push(props.openPlayer!.userName);
                    }
                    props.updateData(
                      props.self.profile.avatar,
                      props.self.profile.aboutMe,
                      newFriendsList,
                    );
                    setIsFriend(true);
                  }
                }}>
                {isFriend ? 'Remove Friend' : 'Add Friend'}
              </Button>
            </Stack>
          </Box>
        </Center>
      </ModalContent>
    </Modal>
  );
}
