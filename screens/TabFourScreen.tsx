import { ScrollView, StyleSheet } from 'react-native';
import SheepComponent, { SheepProps } from '../components/SheepComponent';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import { useEffect, useState } from 'react';
import { RootTabScreenProps } from '../types';
interface ISheep {
  id: string,
  name: string,
  number: number,
  ill: boolean,
  heat: boolean,
  pregnant: boolean,
  birthdayDate: string,
  arrivalDate: string,
}

const emptyArray: SheepProps[] = [];

export default function TabFourScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [arrayOfSheeps, setArrayOfSheeps] = useState(emptyArray);

  async function getData(){
    const querySnapshot = await getDocs(collection(db, "sheep"));
    const tempArray: ISheep[] = [];
    let tempItem: ISheep;
    querySnapshot.forEach((doc) => {
      
      console.log(doc.id, " => ", doc.data());
      tempItem= {
        id: doc.id as string,
        name: doc.get("name"),
        number: Number(doc.get("number")),
        ill: doc.get("ill"),
        heat: doc.get("heat"),
        pregnant: doc.get("pregnant"),
        birthdayDate: doc.get("birthdayDate").toDate().toDateString(),
        arrivalDate: doc.get("birthdayDate").toDate().toDateString()
      }
      tempArray.push(tempItem);
    });
    setArrayOfSheeps(()=>tempArray);
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
        arrayOfSheeps.map((item)=>(<SheepComponent
          id={item.id}
          name={item.name}
          number={item.number}
          birthdayDate={item.birthdayDate}
          arrivalDate={item.arrivalDate}
          ill={item.ill}
          heat={item.heat}
          pregnant={item.pregnant}
        ></SheepComponent>))
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
