import {
  Container,
  Flex,
  HStack,
  Text,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { IoMoonSharp } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { FiPlusSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={'1140px'} px={'4px'}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={{ base: 'column', sm: 'row' }}
      >
        <Text
          fontSize={{ base: '22', sm: '28' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip={'text'}
        >
          <Link to={'/'}>Product Store</Link>
        </Text>
        <HStack>
          <Link to={'/create'}>
            <Button>
              <FiPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMoonSharp /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
