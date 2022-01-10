import { ScrollView, StyleSheet } from 'react-native';
import CowComponent, { CowProps } from '../components/CowComponent';

const arrayOfCows: CowProps[] = [{
  name: 'Vaca1',
  number: 1,
  birthday: '01/12/2020'
},
{
  name: 'Vaca2',
  number: 2,
  birthday: '01/12/2019'
},
{
  name: 'Vaca3',
  number: 33,
  birthday: '03/10/2019'
},
]

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      {
        arrayOfCows.map(item=>(<CowComponent
          name={item.name}
          number={item.number}
          birthday={item.birthday}
        ></CowComponent>))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
