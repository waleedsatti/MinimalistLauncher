import React from 'react';
import {AppStateProvider} from './src/context/AppStateContext';
import {IntentionProvider} from './src/context/IntentionContext';
import {BlockingProvider} from './src/context/BlockingContext';
import {AppNavigator} from './src/navigation/AppNavigator';

function App() {
  return (
    <AppStateProvider>
      <IntentionProvider>
        <BlockingProvider>
          <AppNavigator />
        </BlockingProvider>
      </IntentionProvider>
    </AppStateProvider>
  );
}

export default App;
