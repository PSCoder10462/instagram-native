import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='landing'>
          <Stack.Screen
            name='landing'
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='auth'
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='home'
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
