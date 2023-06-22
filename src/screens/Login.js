import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useId, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigate = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState(false);

  //Check User is Available in the Firebase Database
  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs !== []) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        }
      })
      .catch(err => {
        setVisible(false);
        Alert.alert('User Not Found');
        console.log(err);
      });
  };

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('Name', name);
    await AsyncStorage.setItem('Email', email);
    await AsyncStorage.setItem('UserId', userId);
    navigate.navigate('MainScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 80}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          loginUser();
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigate.navigate('Signup');
        }}>
        Or Sign Up
      </Text>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: '50',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    alignSelf: 'center',
    paddingLeft: '30',
  },
  btn: {
    width: '90%',
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    backgroundColor: 'red',
  },
  btnText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  orLogin: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});
