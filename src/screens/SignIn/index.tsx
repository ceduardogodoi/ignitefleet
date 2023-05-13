import { Container, Slogan, Title } from './styles';

import backgroundImage from '../../assets/background.png';

export function SignIn() {
  return (
    <Container source={backgroundImage}>
      <Title>Ignite Fleet</Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>
    </Container>
  );
}

