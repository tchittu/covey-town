import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
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
} from '@chakra-ui/react';
import React from 'react';
import { ProfileModalProps } from './ProfileModalProps';

export default function ProfileModal(props: ProfileModalProps): JSX.Element {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.open}
      onClose={props.handleClick}
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
              src={
                props.openPlayer?.profile.avatar
                //'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              //alt={'Avatar Alt'}
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
            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
                #art
              </Badge>
              <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
                #photography
              </Badge>
              <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
                #music
              </Badge>
            </Stack>

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
