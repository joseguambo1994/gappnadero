 import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
 
 export type CowProps = {
   name: string,
   number: number,
   birthday: string,
   inseminada: boolean,
   saludable: boolean,
   ordenada: boolean
 }

 const CowComponent = (props: CowProps) => {

  const {name, number, birthday, inseminada, saludable, ordenada} = props;

   return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.numberText}>{number}</Text>
      <Text style={styles.dateText}>{birthday}</Text>
      <View style={styles.buttonsContainer}>
      {saludable ? <Ionicons name="md-heart" size={24} color="red" /> : null}
      {inseminada ?   <Ionicons name="md-medkit" size={24} color="green" />: null}
      {ordenada ?   <Ionicons name="ios-bug" size={24} color="purple" />: null}
    </View>
    </TouchableOpacity>);
 }

 const styles = StyleSheet.create({
  container: {
    height:40,
    width: '100%',
    flexDirection:'row',
    borderWidth:1,
    borderColor:'purple',
    marginVertical:2,
    borderRadius:10,
    alignItems:'center',
    paddingHorizontal:10,
  },
  nameText: {
    flex:1,
    fontSize:20,
  },
  numberText: {
    flex:0.5,
  },
  dateText: {
    flex:1.5,
  },
  buttonsContainer:{
    flex:1,
    flexDirection:'row-reverse',
    justifyContent:'space-evenly'
  }
});
 
export default CowComponent;