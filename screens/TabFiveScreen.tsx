import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../types';
import _ from 'lodash'; 

export default function TabFiveScreen({ navigation }: RootTabScreenProps<'TabFive'>) {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("getBookId: ",getBookId())
    });
    return unsubscribe;
  }, [navigation]);


  function getBookId():string {
    const animalId = navigation.getState();
    console.log("animalId",animalId);
    const variableObj= navigation.getState().routes[4].params;
    if (!_.isNil(variableObj)){
      console.log("variableObj",variableObj);
      const bookIdString = Object.values(variableObj)[0];
      return bookIdString;
    } else {
      return ''
    }
  }

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
