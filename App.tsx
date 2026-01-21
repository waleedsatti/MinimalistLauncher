import React from 'react';
import {AppStateProvider} from './src/context/AppStateContext';
import {IntentionProvider} from './src/context/IntentionContext';
import {AppNavigator} from './src/navigation/AppNavigator';

function App() {
  return (
    <AppStateProvider>
      <IntentionProvider>
        <AppNavigator />
      </IntentionProvider>
    </AppStateProvider>
  );
}

export default App;
