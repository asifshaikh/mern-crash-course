import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../src/store/Product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProduct, products } = useProductStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  console.log(products);
  return (
    <Container maxW={'container.lg'} py={12}>
      <VStack spacing={4}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          bgGradient={[
            'linear(to-tr, teal.300, yellow.400)',
            'linear(to-t, blue.200, teal.500)',
            'linear(to-b, orange.100, purple.300)',
          ]}
          bgClip='text'
          textAlign={'center'}
        >
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={8}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray'}
          >
            No Products Found{' '}
            <Link to={'/create'}>
              <Text
                as={'span'}
                color='blue.500'
                _hover={{ textDecoration: 'underline' }}
              >
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
