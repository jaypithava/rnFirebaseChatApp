import {View, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const route = useRoute();
  useEffect(() => {
    const subscribe = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscribe.onSnapshot(querySnapshot => {
      const allMessages = querySnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setMessages(allMessages);
    });
    return () => subscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    let myMsg = null;
    if (imageUrl !== '') {
      const msg = messages[0];
      myMsg = {
        ...msg,
        senderId: route.params.data.myId,
        receiverId: route.params.data.userId,
        image: imageUrl,
      };
    } else {
      const msg = messages[0];
      myMsg = {
        ...msg,
        sendBy: route.params.id,
        sendTo: route.params.data.userId,
        createdAt: Date.parse(msg.createdAt),
        image: '',
      };
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
    setImageUrl('');
    setImageData(null);
  }, []);

  //Open Camera
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log(result);
    if (result.didCancel && result.didCancel == true) {
    } else {
      setImageData(result);
      uploadImage(result);
    }
  };

  //Upload Image to Firebase
  const uploadImage = async imageDataa => {
    const reference = storage().ref(imageDataa.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log('url', url);
    setImageUrl(url);
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        containerStyle={styles.inputToolbarBackground}
        messages={messages}
        onSend={messages => onSend(messages)}
        alwaysShowSend
        renderSend={props => {
          return (
            <View style={styles.sendView}>
              <TouchableOpacity
                onPress={() => {
                  openCamera();
                }}>
                <Image
                  source={require('../Assets/gallery.png')}
                  style={styles.sendImageView}
                />
              </TouchableOpacity>
              <Send {...props}>
                <Image
                  source={require('../Assets/send.png')}
                  style={styles.sendImageView}
                />
              </Send>
            </View>
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'blue',
                },
              }}
            />
          );
        }}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#397a67',
  },
  inputToolbarBackground: {
    backgroundColor: '#726451',
    borderWidth: 1,
  },
  sendView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendImageView: {
    width: 30,
    height: 20,
    padding: 20,
  },
});
