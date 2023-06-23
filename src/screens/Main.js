import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Home from '../tabs/Home';
import Users from '../tabs/Users';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? <Home /> : <Users /> }
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabStyle}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../Assets/Group.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 0 ? 'white' : 'black'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabStyle}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../Assets/user.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 1 ? 'white' : 'black'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    borderRadius: 40,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 3,
  },
  tabStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 60,
    height: 30,
    resizeMode: 'center',
  },
});
