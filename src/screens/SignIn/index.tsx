import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { Button } from '../../components/Button';

import { Container, Slogan, Title } from './styles';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

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
        console.log('token::', response.authentication.idToken);
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

