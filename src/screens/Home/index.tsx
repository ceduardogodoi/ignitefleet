import { useNavigation } from '@react-navigation/native';

import { HomeHeader } from '../../components/HomeHeader';
import { CarStatus } from '../../components/CarStatus';

import { useQuery } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { Container, Content } from './styles';
import { useEffect } from 'react';

export function Home() {
  const { navigate } = useNavigation();

  const historic = useQuery(Historic);

  function handleRegisterMovement() {
    navigate('departure');
  }

  function fetchVehicle() {
    console.log(historic);
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}