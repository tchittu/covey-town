import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { ProfileModalProps } from './ProfileModalProps';
import React from 'react';
import TwoPlayerChat, { inboxToText } from './TwoPlayerChat';

export default function ProfileModal(props: ProfileModalProps): JSX.Element {
  return (
    <Modal closeOnOverlayClick={false} isOpen={props.open} onClose={props.handleClick}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton autoFocus={false} />
        <Flex align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
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
                  <Avatar size='xl' src={props.openPlayer?.profile.avatar}></Avatar>
                </Center>
                <Center w='full'>
                  <Button w='full'>Change Avatar</Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id='userName' isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                defaultValue={props.openPlayer?.userName}
                placeholder='UserName'
                _placeholder={{ color: 'gray.500' }}
                type='text'
              />
            </FormControl>
            <FormControl id='aboutMe' isRequired={false}>
              <FormLabel>About Me</FormLabel>
              <Textarea
                defaultValue={props.openPlayer?.profile.aboutMe}
                placeholder='aboutMe'
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <Input placeholder='password' _placeholder={{ color: 'gray.500' }} type='password' />
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg={'blue.400'}
                color={'white'}
                w='full'
                _hover={{
                  bg: 'blue.500',
                }}>
                Submit
              </Button>
            </Stack>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
              Inbox
            </Heading>
            <div style={{ whiteSpace: 'pre-wrap' }}>{inboxToText(props.openPlayer?.profile)}</div>
          </Stack>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
