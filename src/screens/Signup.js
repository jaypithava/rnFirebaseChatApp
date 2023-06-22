import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        placeholder="Enter Name"
        style={[styles.input, {marginTop: 50}]}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        keyboardType="number-pad"
        style={[styles.input, {marginTop: 20}]}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={[styles.input, {marginTop: 20}]}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => {}}>
        <Text style={styles.btnText}>SignUp</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Or Login
      </Text>
    </View>
  );
};

export default Signup;

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
    borderColor: 'white',
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
