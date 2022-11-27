/* eslint-disable */
import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import PlayerController from '../../../classes/PlayerController';
import useTownController from '../../../hooks/useTownController';
import { SelfFriendItem } from './SelfFriendItem';

const MAX_IMAGE_SIZE = 209715;
interface SelfProfileModalProps {
  open: boolean;
  openPlayer: PlayerController | undefined;
  handleClick: () => void;
  updateData: (avatar: string | undefined, aboutMe: string, friendsList: string[]) => void;
}

export default function SelfProfileModal(props: SelfProfileModalProps): JSX.Element {
  if (props.openPlayer == undefined) {
    throw new Error('Error in clicking logic!');
  }
  const [images, setImages] = useState([]);
  const [aboutMe, setAboutMe] = useState('');
  const [friendsList, setFriendsList] = useState(props.openPlayer.profile.friendsList);
  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const coveyTownController = useTownController();

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
      }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton autoFocus={false} />
        <Flex align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
          <ImageUploading
            value={images}
            onChange={onChange}
            dataURLKey='data_url'
            maxFileSize={MAX_IMAGE_SIZE}
            onError={(errors, files) => {
              console.log('Error: ', errors);
              toast({
                title: 'Error uploading image',
                description: errors && (
                  <div>
                    {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                    {errors.acceptType && <span>Your selected file type is not allow</span>}
                    {errors.maxFileSize && (
                      <span>Selected file size exceed maxFileSize: {MAX_IMAGE_SIZE} bytes</span>
                    )}
                    {errors.resolution && (
                      <span>Selected file is not match your desired resolution</span>
                    )}
                  </div>
                ),
                status: 'error',
                isClosable: true,
                duration: 4000,
              });
            }}>
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
              <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                  User Profile Edit
                </Heading>
                <FormControl id='userName'>
                  <FormLabel>User Avatar</FormLabel>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <div className='image-item'>
                        <Avatar
                          size='xl'
                          src={
                            imageList.length === 0
                              ? props.openPlayer?.profile.avatar
                              : imageList[0]['data_url']
                          }></Avatar>
                      </div>
                    </Center>
                    <Center w='full'>
                      <Button w='full' onClick={onImageUpload}>
                        Change Avatar
                      </Button>
                    </Center>
                  </Stack>
                </FormControl>
                <Text fontSize='xl' as='b'>
                  {props.openPlayer?.userName}
                </Text>
                <FormControl id='aboutMe' isRequired={false}>
                  <FormLabel>About Me</FormLabel>
                  <Textarea
                    defaultValue={props.openPlayer?.profile.aboutMe}
                    placeholder='aboutMe'
                    _placeholder={{ color: 'gray.500' }}
                    onChange={event => setAboutMe(event.target.value)}
                  />
                </FormControl>
                <Box>
                  <Center>
                    <Button colorScheme='teal' variant='ghost' onClick={onOpen}>
                      {friendsList.length === 0 ? 'No' : friendsList.length} Friends
                    </Button>
                  </Center>
                  <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerHeader>{props.openPlayer?.userName + "'s Friends"}</DrawerHeader>

                      <DrawerBody>
                        <VStack w={400} spacing={4} align='start'>
                          {friendsList.map(friend => {
                            return (
                              <SelfFriendItem
                                userName={friend}
                                onRemove={() =>
                                  setFriendsList(
                                    friendsList.filter(filteredName => filteredName !== friend),
                                  )
                                }
                              />
                            );
                          })}
                        </VStack>
                      </DrawerBody>
                      <DrawerFooter>
                        <Center>Press 'Submit' to save changes.</Center>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </Box>
                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    w='full'
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={() => {
                      //console.log('click: ', imageList[0]['data_url']);
                      props.updateData(
                        imageList.length === 0
                          ? props.openPlayer?.profile.avatar
                          : imageList[0]['data_url'],
                        aboutMe,
                        friendsList,
                      );
                      props.handleClick();
                    }}>
                    Submit
                  </Button>
                </Stack>
              </Stack>
            )}
          </ImageUploading>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
