import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useUser } from '@realm/react';
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync
} from 'expo-location';
import { Car } from 'phosphor-react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Loading } from '../../components/Loading';
import { LocationInfo } from '../../components/LocationInfo';
import { Map } from '../../components/Map';

import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { licensePlateValidate } from '../../utils/licensePlateValidate';
import { getAddressLocation } from '../../utils/getAddressLocation';

import { Container, Content, Message } from './styles';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null);

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const [
    locationForegroundPermission,
    requestLocationForegroundPermission,
  ] = useForegroundPermissions();

  const { goBack } = useNavigation();

  const realm = useRealm();
  const user = useUser();

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();

        return Alert.alert(
          'Place inválida',
          'A placa é inválida. Por favor, informe a placa correta do veículo.'
        );
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();

        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo.'
        );
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate.toUpperCase(),
          description,
        }))
      });

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso.');

      goBack();
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível registrar a saída do veículo.'
      );

      setIsRegistering(false);
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermission?.granted) return;

    let subscription: LocationSubscription | null | undefined;

    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000,
    }, location => {
      setCurrentCoords(location.coords);

      getAddressLocation(location.coords)
        .then(address => {
          if (address) {
            setCurrentAddress(address);
          }
        })
        .finally(() => setIsLoadingLocation(false));
    }).then(response => {
      subscription = response
    });

    return () => {
      subscription?.remove();
    };
  }, [locationForegroundPermission]);

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />

        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para utilizar essa funcionalidade.
          Por favor, acesse as configurações do seu dispositivo para conceder essa permissão ao aplicativo.
        </Message>
      </Container>
    )
  }

  if (isLoadingLocation) {
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={150}>
        <ScrollView>
          {currentCoords && <Map coordinates={[
            { latitude: -23.5657, longitude: -46.6515 },
            { latitude: -23.5694, longitude: -46.6467 },
          ]} />}

          <Content>
            {currentAddress && (
              <LocationInfo
                label="Localização atual"
                description={currentAddress}
                icon={Car}
              />
            )}

            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              returnKeyType="send"
              onSubmitEditing={handleDepartureRegister}
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title="Registrar saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
