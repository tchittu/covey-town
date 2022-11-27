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
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import PlayerController from '../../../classes/PlayerController';
import useTownController from '../../../hooks/useTownController';

interface ProfileModalProps {
  open: boolean;
  openPlayer: PlayerController | undefined;
  handleClick: () => void;
  updateData: (
    avatar: string | undefined,
    aboutMe: string,
    friendsList: string[] | undefined,
  ) => void;
}

export default function ProfileModal(props: ProfileModalProps): JSX.Element {
  const coveyTownController = useTownController();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    if (props.open) {
      coveyTownController.pause();
    } else {
      coveyTownController.unPause();
    }
  }, [coveyTownController, props.open]);

  const closeModal = useCallback(() => {
    coveyTownController.unPause();
    props.handleClick();
  }, [coveyTownController, props.handleClick]);
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
                        if (friend.username === coveyTownController.ourPlayer.userName) {
                          isHidden = true;
                        }
                        coveyTownController.ourPlayer.profile.friendsList.map(ourFriend => {
                          if (ourFriend.username === friend.username) {
                            isHidden = true;
                          }
                        });
                        return (
                          <HStack key={friend.username} spacing={3}>
                            <Avatar src={friend.avatar} />
                            <Heading fontSize={18} color='teal.900'>
                              {friend.username}
                            </Heading>
                            <ButtonGroup>
                              <IconButton
                                hidden={isHidden}
                                aria-label='Add to friends'
                                size='xs'
                                icon={<AddIcon />}
                                onClick={async () => {
                                  coveyTownController.ourPlayer.profile.friendsList.push(friend);
                                  const profile = {
                                    username: coveyTownController.ourPlayer.userName,
                                    avatar: coveyTownController.ourPlayer.profile.avatar,
                                    aboutMe: coveyTownController.ourPlayer.profile.aboutMe,
                                    friendsList: coveyTownController.ourPlayer.profile.friendsList,
                                  };
                                  await axios
                                    .post('http://localhost:4000/profiles/update', profile)
                                    .then(res => {
                                      console.log(profile);
                                      console.log(res.data);
                                    })
                                    .catch(error => {
                                      console.log(error);
                                    });
                                  props.handleClick();
                                }}
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
                onClick={async () => {
                  let notRepeat = true;
                  props.openPlayer?.profile.friendsList.map(friend => {
                    if (friend.username === coveyTownController.ourPlayer.userName) {
                      notRepeat = false;
                    }
                  });
                  if (notRepeat) {
                    const friendObj = {
                      username: coveyTownController.ourPlayer.userName,
                      avatar: coveyTownController.ourPlayer.profile.avatar,
                    };
                    props.openPlayer?.profile.friendsList.push(friendObj);
                    props.updateData(
                      props.openPlayer?.profile.avatar,
                      props.openPlayer?.profile.aboutMe === undefined
                        ? ''
                        : props.openPlayer?.profile.aboutMe,
                      props.openPlayer?.profile.friendsList,
                    );
                    const profile = {
                      username: props.openPlayer?.userName,
                      friendsList: props.openPlayer?.profile.friendsList,
                    };
                    await axios
                      .post('http://localhost:4000/profiles/addFriend', profile)
                      .then(res => {
                        console.log(res.data);
                      })
                      .catch(error => {
                        console.log(error);
                      });
                    props.handleClick();
                  } else {
                    toast({
                      title: 'Unable to add friend',
                      description: 'this player is already in your friendslist',
                      status: 'error',
                    });
                    return;
                  }
                }}>
                Add Friend
              </Button>
            </Stack>
          </Box>
        </Center>
      </ModalContent>
    </Modal>
  );
}
