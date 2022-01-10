 import { View, Text, StyleSheet } from 'react-native';
 
 export type CowProps = {
   name: string,
   number: number,
   birthday: string,
 }

 const CowComponent = (props: CowProps) => {

  const {name, number, birthday} = props;

   return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{number}</Text>
      <Text style={styles.text}>{birthday}</Text>
    </View>);
 }
 
 const styles = StyleSheet.create({
  container: {
    height:60,
    width: '100%',
    backgroundColor: 'gray',
    marginVertical:5,
    flexDirection:'row',
    padding:5,
  },
  text: {
    flex:1,
    backgroundColor:'white'
  }
});
 
export default CowComponent;