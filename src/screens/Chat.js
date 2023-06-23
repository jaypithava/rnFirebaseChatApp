import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);

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
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
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
  }, []);
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        containerStyle={styles.inputToolbarBackground}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputToolbarBackground: {
    backgroundColor: 'black',
  },
});
