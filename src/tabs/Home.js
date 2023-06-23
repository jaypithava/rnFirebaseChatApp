import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
let id = '';
const Home = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    id = await AsyncStorage.getItem('UserId');
    let tempData = [];
    setVisible(true);
    const email = await AsyncStorage.getItem('Email');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != []) {
          setVisible(false);
          res.docs.map(item => {
            tempData.push(item.data());
          });
          setUsers(tempData);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Firebase Chat App</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.userItems}
              onPress={() => {
                navigation.navigate('Chat', {data: item, id: id});
              }}>
              <Image
                source={require('../Assets/user.png')}
                style={styles.userLogo}
              />
              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Loader visible={visible} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 50,
    elevation: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'purple',
    fontSize: 20,
    fontWeight: '600',
  },
  userItems: {
    width: Dimensions.get('window').width - 50,
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  userLogo: {
    width: 40,
    height: 40,
  },
  itemName: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
});
