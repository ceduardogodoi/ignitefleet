import { TouchableOpacity } from 'react-native';
import { Power } from 'phosphor-react-native';

import theme from '../../theme';

import { Container, Greeting, Message, Name, Picture } from './styles';

export function HomeHeader() {
  return (
    <Container>
      <Picture
        source={{ uri: 'https://github.com/ceduardogodoi.png' }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <Greeting>
        <Message>Olá</Message>

        <Name>Carlos</Name>
      </Greeting>

      <TouchableOpacity>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
