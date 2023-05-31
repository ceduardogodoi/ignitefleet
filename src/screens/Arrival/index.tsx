import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import { BSON } from 'realm';

import { useObject, useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles';
import { ButtonIcon } from '../../components/ButtonIcon';

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;
  const { goBack } = useNavigation();

  const historic = useObject(Historic, new BSON.UUID(id));

  const realm = useRealm();

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  function handleRemoveVehicleUsage() {
    Alert.alert(
      'Cancelar',
      'Cancelar a utilização do veículo?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: removeVehicleUsage,
        },
      ]
    );
  }

  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.'
        )
      }

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      Alert.alert(
        'Chegada',
        'Chegada registrada com sucesso.'
      );

      goBack();
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível registrar a chegada do veículo.'
      );
    }
  }

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>
          Placa do veículo
        </Label>

        <LicensePlate>
          {historic?.license_plate}
        </LicensePlate>

        <Label>
          Finalidade
        </Label>
        <Description>
          {historic?.description}
        </Description>

        <Footer>
          <ButtonIcon
            icon={X}
            onPress={handleRemoveVehicleUsage}
          />

          <Button
            title="Registrar chegada"
            onPress={handleArrivalRegister}
          />
        </Footer>
      </Content>
    </Container>
  );
}