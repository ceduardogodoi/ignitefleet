import { useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';
import { BSON } from 'realm';

import { useObject } from '../../libs/realm';
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

  const historic = useObject(Historic, new BSON.UUID(id));

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
          />

          <Button
            title="Registrar chegada"
          />
        </Footer>
      </Content>
    </Container>
  );
}
