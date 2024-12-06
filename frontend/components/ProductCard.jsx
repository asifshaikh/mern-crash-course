/* eslint-disable react/prop-types */
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../src/store/Product';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: 'Product updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overlay='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w='full'
        objectFit='cover'
      />
      <Box p={5}>
        <Heading as={'h3'} size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={4}>
          <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme='red'
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Update Product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <Input
                    placeholder='Enter Product Name'
                    name='name'
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  ></Input>
                  <Input
                    placeholder='Enter Product Price'
                    name='price'
                    type='number'
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  ></Input>
                  <Input
                    placeholder='Enter Product Image'
                    name='image'
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  ></Input>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={() => {
                    handleUpdateProduct(product._id, updatedProduct);
                  }}
                >
                  Update
                </Button>
                <Button variant='ghost' onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Box>
    </Box>
  );
};

export default ProductCard;
