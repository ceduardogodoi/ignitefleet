import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TopMessage } from '../components/TopMessage';

import { AppRoutes } from './app.routes';

export function Routes() {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <AppRoutes />

      <Toast
        topOffset={insets.top}
        config={{
          info({ text1 }) {
            return <TopMessage title={String(text1)} />
          }
        }}
      />
    </NavigationContainer>
  );
}
