import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { AuthContextProvider } from './src/contexts/AuthContext';
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import { THEME } from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar 
          backgroundColor='transparent'
          barStyle='light-content'
          translucent
        />

        { fontsLoaded ? <Routes /> : <Loading /> }
        
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

