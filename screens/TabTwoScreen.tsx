import { ScrollView, StyleSheet } from 'react-native';
import CowComponent, { CowProps } from '../components/CowComponent';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import { useEffect, useState } from 'react';
import { RootTabScreenProps } from '../types';

// const arrayOfCows: CowProps[] = [{
//   name: 'Vaca1',
//   code: 1,
//   birthday: '01/12/2020',
// },
// {
//   name: 'Vaca2',
//   code: 2,
//   birthday: '01/12/2019'
// },
// {
//   name: 'Vaca3',
//   code: 33,
//   birthday: '03/10/2019'
// },
// ]

interface ICow {
  id: string,
  name: string,
  code: string,
  birthday: string,
  heat: boolean,
  ill: boolean,
  pregnant: boolean,
}

const emptyArray: CowProps[] = [];

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [arrayOfCows, setArrayOfCows] = useState(emptyArray);

  async function getData(){
    const querySnapshot = await getDocs(collection(db, "cows"));
    const tempArray: ICow[] = [];
    let tempItem: ICow;
    querySnapshot.forEach((doc) => {
      
      console.log(doc.id, " => ", doc.data());
      tempItem= {
        id: doc.id,
        name: doc.get("name"),
        code: doc.get("code"),
        birthday: doc.get("birthdayDate").toDate().toString(),
        heat: doc.get("heat"),
        ill: doc.get("ill"),
        pregnant: doc.get("pregnant"),
      }
      tempArray.push(tempItem);
    });
    setArrayOfCows(()=>tempArray);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Tab Two Focus")
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {
        arrayOfCows.map((item)=>(<CowComponent
          id={item.id}
          name={item.name}
          code={item.code}
          birthday={item.birthday}
          heat={item.heat}
          ill={item.ill}
          pregnant={item.pregnant}
        ></CowComponent>))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
  },
});
