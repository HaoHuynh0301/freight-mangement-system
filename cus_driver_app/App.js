import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AppInformation,
  Register,
  EditInformation,
  CreateOrder,
  OrderDetail,
  SignIn,
  OverViewOrder,
  OrderMap,
} from './screens';
import {ipAddress} from './contants';
import Tabs from './navigation/tab.js';
const Stack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };
  }

  async middleWare() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${ipAddress}/api/middleware/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        this.setState({
          isSignedIn: true,
        });
      })
      .catch(error => {
        this.setState({
          isSignedIn: false,
        });
      });
  }

  componentDidMount() {
    this.middleWare();
  }

  render() {
    if (this.state.isSignedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="AppInformation"
              component={AppInformation}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="EditInformation"
              component={EditInformation}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="CreateOrder"
              component={CreateOrder}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetail}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="OverViewOrder"
              component={OverViewOrder}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="OrderMap"
              component={OrderMap}
              options={{header: () => null}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="AppInformation"
              component={AppInformation}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="EditInformation"
              component={EditInformation}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="CreateOrder"
              component={CreateOrder}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetail}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="OrderMap"
              component={OrderMap}
              options={{header: () => null}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

export default App;
