import {AppComponentsProvider} from '@/AppComponents';
import RootScreen from '@/RootScreen';
import {TransactionModel} from '@/models/Transaction';
import {RealmProvider} from '@realm/react';
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
      <RealmProvider schema={[TransactionModel]}>
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
      </RealmProvider>
    </RecoilRoot>
  );
}

export default App;
