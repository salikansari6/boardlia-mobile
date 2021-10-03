import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';

const Kanban = () => {
  const getToken = useCallback(async () => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    console.log(token);
    fetch('https://boardlia.pagekite.me/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(JSON.stringify(data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <View>
      <Text>Kanban</Text>
    </View>
  );
};

export default Kanban;
