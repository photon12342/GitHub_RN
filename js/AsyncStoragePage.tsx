import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'test';
export default () => {
  const [msg, onChangeText] = useState('');
  const [showText, onGetText] = useState('');
  const onSave = async () => {
    try {
      await AsyncStorage.setItem(KEY, msg);
    } catch (e) {
      console.log(e);
    }
  };
  const onGet = async () => {
    try {
      const value = await AsyncStorage.getItem(KEY);
      onGetText(value || '');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <TextInput
          style={styles.input}
          value={msg}
          onChangeText={onChangeText}
        />
      </View>
      <Button title="Save" onPress={onSave} />
      <Button title="Get" onPress={onGet} />
      <Text>result: {showText}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
