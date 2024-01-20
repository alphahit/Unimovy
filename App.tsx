import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
import DrawerNavigator from './src/navigation/DrawerNavigator';
function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
