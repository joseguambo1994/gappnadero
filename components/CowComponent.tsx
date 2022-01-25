 import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
 
 export type CowProps = {
   id: string,
   name: string,
   code: string,
   birthday: string,
   heat: boolean,
   ill: boolean,
   pregnant: boolean
 }

 const CowComponent = (props: CowProps) => {

  const {id, name, code, birthday, heat, ill, pregnant} = props;
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate(
      'Root',
      { screen:'TabFive', params:{animalId:id}}
          );

  }

   return (
    <TouchableOpacity style={styles.container}
      onPress={()=>handleNavigation()}
    >
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.numberText}>{code}</Text>
      <Text style={styles.dateText}>{birthday}</Text>
      <View style={styles.buttonsContainer}>
      {ill ? <Ionicons name="md-heart" size={24} color="red" /> : null}
      {heat ?   <Ionicons name="md-medkit" size={24} color="green" />: null}
      {pregnant ?   <Ionicons name="ios-bug" size={24} color="purple" />: null}
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