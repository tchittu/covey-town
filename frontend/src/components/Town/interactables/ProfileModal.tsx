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
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useState } from 'react';
import PlayerController from '../../../classes/PlayerController';
import useTownController from '../../../hooks/useTownController';
import { ChatMessage } from '../../../types/CoveyTownSocket';

export interface ProfileModalProps {
  open: boolean;
  openPlayer: PlayerController | undefined;
  handleClick: () => void;
  updateData: (avatar: string | undefined, aboutMe: string, friendsList: string[]) => void;
  self: PlayerController;
}

export default function ProfileModal(props: ProfileModalProps): JSX.Element {
  const coveyTownController = useTownController();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFriend, setIsFriend] = useState<boolean>(
    props.self.profile.friendsList.some(x => x === props.openPlayer?.userName),
  );
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (props.open) {
      coveyTownController.pause();
    } else {
      coveyTownController.unPause();
    }
  }, [coveyTownController, props.open]);

  useEffect(() => {
    setIsFriend(props.self.profile.friendsList.some(x => x === props.openPlayer?.userName));
  }, [props.openPlayer?.userName, props.self.profile.friendsList]);

  const closeModal = useCallback(() => {
    coveyTownController.unPause();
    props.handleClick();
  }, [coveyTownController, props]);

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
                        let isHidden = false;
                        if (friend === coveyTownController.ourPlayer.userName) {
                          isHidden = true;
                        }
                        coveyTownController.ourPlayer.profile.friendsList.map(ourFriend => {
                          if (ourFriend === friend) {
                            isHidden = true;
                          }
                        });
                        return (
                          <HStack key={friend} spacing={3}>
                            <Avatar />
                            <Heading fontSize={18} color='teal.900'>
                              {friend}
                            </Heading>
                            <ButtonGroup>
                              <Button
                                hidden={isHidden}
                                aria-label='Add to friends'
                                size='xs'
                                onClick={async () => {
                                  coveyTownController.ourPlayer.profile.friendsList.push(friend);
                                  props.updateData(
                                    coveyTownController.ourPlayer.profile.avatar,
                                    coveyTownController.ourPlayer.profile.aboutMe,
                                    coveyTownController.ourPlayer.profile.friendsList,
                                  );
                                  const profile = {
                                    username: coveyTownController.ourPlayer.userName,
                                    avatar: coveyTownController.ourPlayer.profile.avatar,
                                    aboutMe: coveyTownController.ourPlayer.profile.aboutMe,
                                    friendsList: coveyTownController.ourPlayer.profile.friendsList,
                                  };
                                  await axios
                                    .post(
                                      `${process.env.REACT_APP_TOWNS_SERVICE_URL}/profiles/update`,
                                      profile,
                                    )
                                    .then(res => {
                                      console.log(profile);
                                      console.log(res.data);
                                    })
                                    .catch(error => {
                                      console.log(error);
                                    });
                                  props.handleClick();
                                }}>
                                Add
                              </Button>
                            </ButtonGroup>
                          </HStack>
                        );
                      })}
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>

            <Stack mt={8} direction={'column'} spacing={4}>
              <FormControl id='message' isRequired={false}>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder='message'
                  _placeholder={{ color: 'gray.500' }}
                  onChange={event => setMessage(event.target.value)}
                />
              </FormControl>
              <Stack mt={8} direction={'row'} spacing={4}>
                <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  _focus={{
                    bg: 'gray.200',
                  }}
                  onClick={() => {
                    if (props.openPlayer) {
                      const chatMess: ChatMessage = {
                        author: coveyTownController.ourPlayer.userName,
                        sid: nanoid(),
                        body: message,
                        dateCreated: new Date(),
                      };
                      console.log('create', message);
                      coveyTownController.emitDirectMessage({
                        message: chatMess,
                        toPlayer: props.openPlayer.userName,
                      });
                      props.handleClick();
                    }
                  }}>
                  Send Message
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
                  onClick={async () => {
                    const propsOpenPlayer = props.openPlayer;
                    let tempUserName = '';
                    if (propsOpenPlayer !== undefined) {
                      tempUserName = propsOpenPlayer.userName;
                    }
                    if (isFriend) {
                      props.updateData(
                        props.self.profile.avatar,
                        props.self.profile.aboutMe,
                        props.self.profile.friendsList.filter(x => x !== tempUserName),
                      );
                      const profile = {
                        username: props.self.userName,
                        friendsList: props.self.profile.friendsList.filter(x => x !== tempUserName),
                      };
                      await axios
                        .post(
                          `${process.env.REACT_APP_TOWNS_SERVICE_URL}/profiles/addFriend`,
                          profile,
                        )
                        .then(res => {
                          console.log(res.data);
                        })
                        .catch(error => {
                          console.log(error);
                        });
                      setIsFriend(false);
                      props.handleClick();
                    } else {
                      const newFriendsList = props.self.profile.friendsList;
                      if (newFriendsList.findIndex(x => x === tempUserName) == -1) {
                        newFriendsList.push(tempUserName);
                      }
                      props.updateData(
                        props.self.profile.avatar,
                        props.self.profile.aboutMe,
                        newFriendsList,
                      );
                      const profile = {
                        username: props.self.userName,
                        friendsList: newFriendsList,
                      };
                      await axios
                        .post(
                          `${process.env.REACT_APP_TOWNS_SERVICE_URL}/profiles/addFriend`,
                          profile,
                        )
                        .then(res => {
                          console.log(res.data);
                        })
                        .catch(error => {
                          console.log(error);
                        });
                      setIsFriend(true);
                      props.handleClick();
                    }
                  }}>
                  {isFriend ? 'Remove Friend' : 'Add Friend'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Center>
      </ModalContent>
    </Modal>
  );
}
