import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

import { Button } from '../../components/Button';

import { Container, Slogan, Title } from './styles';
import backgroundImage from '../../assets/background.png';

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  async function handleGoogleSignIn() {
    setIsAuthenticating(true);

    const signInResponse = await googleSignIn();
    if (signInResponse.type !== 'success') {
      setIsAuthenticating(false);
    }
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        fetch(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`
        )
          .then(response => response.json())
          .then(data => console.log(JSON.stringify(data, null, 2)));
      } else {
        setIsAuthenticating(false);
        Alert.alert('Entrar', 'Não foi possível conectar a sua conta Google.');
      }
    }
  }, [response]);

  return (
    <Container source={backgroundImage}>
      <Title>Ignite Fleet</Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}

