import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RootTabScreenProps } from "../types";
import _ from "lodash";
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import db from '../firebase';

export default function TabSixScreen({ navigation }: RootTabScreenProps<'TabSix'>) {

const [name, setName] = useState('');
const [code, setCode] = useState('');

async function handleSubmit(){
  console.log("Submited value", name + ' : '  + code);

  await addDoc(collection(db, "cows"), {
    name: name,
    code: code,
    heat: true,
    ill: true,
    pregnant: true,
    birthdayDate: Timestamp.now(),
    arrivalDate: Timestamp.now(),
  });
}

  return (
  <View style={styles.container}>
    <TextInput style={styles.input} value={name} onChangeText={e=>setName(e)} />
    <TextInput style={styles.input} value={code} onChangeText={e=>setCode(e)} />
    <TouchableOpacity style={styles.button} onPress={handleSubmit} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  input: {
    height: 100,
    width: "100%",
    backgroundColor: "purple",
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: "red",
  },
});
