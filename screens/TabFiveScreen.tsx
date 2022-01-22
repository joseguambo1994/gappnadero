import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RootTabScreenProps } from '../types';
import _ from 'lodash'; 
import { useNavigation } from '@react-navigation/native';
import SheepDetail from '../components/SheepDetail';

export default function TabFiveScreen({ navigation }: RootTabScreenProps<'TabFive'>) {

  const [animalId, setAnimalId] = useState('');
  const navHook = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("getBookId: ",getBookId())
      const tempBookId = getBookId();
      if (!_.isNil(tempBookId) && tempBookId != ''){
        setAnimalId(()=>getBookId());
      }
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
      {
        animalId != '' ? <SheepDetail animalId={animalId} ></SheepDetail> : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
