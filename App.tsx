import {AppComponentsProvider} from '@/AppComponents';
import RootScreen from '@/RootScreen';
import {Color} from '@/colors';
import React from 'react';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RecoilRoot} from 'recoil';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <AppComponentsProvider>
          <StatusBar
            barStyle={
              // TODO: DarkMode 대응
              Platform.OS === 'android' && isDarkMode
                ? 'light-content'
                : 'dark-content'
            }
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <RootScreen />
        </AppComponentsProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
