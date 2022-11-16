import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Owner,
  OwnerDetail,
  
} from '../screens';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="owner">
      <Stack.Screen
        name="owner"
        component={Owner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ownerDetail"
        component={OwnerDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
