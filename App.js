import React, {Component} from 'react';
import { StyleSheet} from 'react-native';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import {DrawerCustomNavigator} from './Navigators/DrawerCustomNavigator.js';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from "./Screens/LoginScreen";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoggedIn:false
    };
  }

  setLogin(){
    this.setState({isLoggedIn:true});
  }

  setLogout () {
    this.setState({isLoggedIn:false});
  } 

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  
  render(){
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    let screen;
    if(this.state.isLoggedIn){
      screen = (
        <NavigationContainer>
          <DrawerCustomNavigator onLogout={() => this.setLogout()}/>
        </NavigationContainer>
      )
    }else{
      screen = (
        screen = <LoginScreen onLogin={() => this.setLogin()}/>
      )
    } 

    return screen;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
