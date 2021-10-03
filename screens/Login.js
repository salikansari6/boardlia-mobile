/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  Linking,
  Button,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const Login = ({navigation}) => {
  const [data, setData] = useState('');

  const handleOpenURL = useCallback(
    async ({url}) => {
      if (url.indexOf('?token') !== -1) {
        if (url) {
          const token = url.split('?token=')[1].slice(0, -1);
          try {
            await AsyncStorage.setItem('token', JSON.stringify(token));
            navigation.navigate('Kanban');
          } catch (e) {
            console.log(e);
          }
          setData(url);
        }
      }
    },
    [navigation],
  );

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleOpenURL);

    Linking.getInitialURL().then(url => {
      if (url) {
        handleOpenURL({url});
      }
    });

    return () => {
      subscription.remove();
    };
  }, [handleOpenURL]);

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.containerStyle}>
        <Text>{data === '' ? null : data}</Text>
        <Button
          title="Click Me"
          onPress={() => {
            Linking.openURL('https://boardlia.pagekite.me/auth/google');
          }}
        />
        <Text>{data === '' ? 'Login Pending' : 'You are logged in'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    // flex: 1,
  },
  containerStyle: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
