import { ScrollView, StyleSheet } from 'react-native';
import CowComponent, { CowProps } from '../components/CowComponent';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import { useEffect, useState } from 'react';
import { RootTabScreenProps } from '../types';

// const arrayOfCows: CowProps[] = [{
//   name: 'Vaca1',
//   number: 1,
//   birthday: '01/12/2020',
// },
// {
//   name: 'Vaca2',
//   number: 2,
//   birthday: '01/12/2019'
// },
// {
//   name: 'Vaca3',
//   number: 33,
//   birthday: '03/10/2019'
// },
// ]

interface ICow {
  id: string,
  name: string,
  number: number,
  birthday: string,
  inseminada: boolean,
  saludable: boolean,
  ordenada: boolean,
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
        number: Number(doc.get("number")),
        birthday: doc.get("birthday").toDate().toDateString(),
        inseminada: doc.get("inseminada"),
        saludable: doc.get("saludable"),
        ordenada: doc.get("ordenada"),
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
          name={item.name}
          number={item.number}
          birthday={item.birthday}
          inseminada={item.inseminada}
          saludable={item.saludable}
          ordenada={item.ordenada}
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
