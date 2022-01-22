import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export type ISheepDetail = {
  name: string;
  number: number;
  ill: boolean;
  heat: boolean;
  pregnant: boolean;
  birthdayDate: string;
  arrivalDate: string;
};

type ISheepWeight = {
  date: string,
  weight: number,
}

type SheepDetailProps = {
  animalId: string;
};
const windowHeight = Dimensions.get("window").height;

const SheepDetail = (props: SheepDetailProps) => {
  const emptySheep: ISheepDetail = {
    name: "",
    number: 0,
    ill: false,
    heat: false,
    pregnant: false,
    birthdayDate: "",
    arrivalDate: "",
  };
  const [animalDetail, setAnimalDetail] = useState(emptySheep);

  const emptyArrayOfWeights: ISheepWeight[] = [];
  const [arrayOfWeights, setArrayOfWeights] = useState(emptyArrayOfWeights);
  const [showWeights, setShowWeights] = useState(false);

  async function getData() {
    const docSnapshot = await getDoc(doc(db, "sheep", props.animalId));
    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      const temporalSheep:ISheepDetail = {
        name: docSnapshot.data()["name"],
        number: docSnapshot.data()["number"],
        ill: docSnapshot.data()["ill"],
        heat: docSnapshot.data()["heat"],
        pregnant: docSnapshot.data()["pregnant"],
        birthdayDate: docSnapshot
          .data()
          ["birthdayDate"].toDate()
          .toDateString(),
        arrivalDate: docSnapshot.data()["arrivalDate"].toDate().toDateString(),
      };
      setAnimalDetail(() => temporalSheep);
    } else {
      console.log("No such document!");
    }
  }

  async function getWeighing(){
   // const citiesRef = (await getDocs(collection(db, "sheep",props.animalId))).docs;
    const querySnapshot = await getDocs(collection(db, "sheep", props.animalId, "weighing"));
    const tempArray: ISheepWeight[] = [];
    let tempItem: ISheepWeight;
    querySnapshot.forEach((doc) => {
      
      console.log(doc.id, " => ", doc.data());
      tempItem= {
        date: doc.get("date").toDate().toDateString(),
        weight: Number(doc.get("weight")),
      }
      tempArray.push(tempItem);
    });
    setArrayOfWeights(()=>tempArray);
  }

  const storage = getStorage();
  const [image, setImage] = useState('');

useEffect(() => {
  // let imageRef = firebase.storage().ref('/ankit/');
  // imageRef
  //   .getDownloadURL()
  let imagePath = 'sheep/'+props.animalId+'/image.JPG'
  const storage = getStorage();
getDownloadURL(ref(storage, imagePath))
    .then((url) => {
       setImage(url);
      console.log("URL1111111111111111: ",url)
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));
},[props.animalId])


  useEffect(() => {
    getData();
    getWeighing();
    setShowWeights(()=>false);
  }, [props.animalId]);

  const renderRow = (label: string, text: string) => {
    return (
      <View style={styles.rowContainer}>
        <Text>{label}</Text>
        <Text>{text}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Image
          style={styles.image}
          source={{
            uri: "https://s3-us-west-2.amazonaws.com/melingoimages/Images/86116.jpg",
          }}
        /> */}
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
        {renderRow("Número: ", animalDetail.number.toString())}
        {renderRow("Nombre: ", animalDetail.name)}
        {renderRow("Enferma: ", animalDetail.ill.toString())}
        {renderRow("En celo: ", animalDetail.heat.toString())}
        {renderRow("Preñada: ", animalDetail.pregnant.toString())}
        {renderRow("Fecha de nacimiento: ", animalDetail.birthdayDate.toString())}
        {renderRow("Fecha de llegada: ", animalDetail.arrivalDate.toString())}
        <TouchableOpacity style={[styles.rowContainer, styles.buttonContainer]} onPress={()=> setShowWeights(!showWeights)}>
          <Text style={styles.buttonText}>{'Pesajes'}</Text>
        </TouchableOpacity>
        {
          showWeights === true ? arrayOfWeights.map(item => renderRow('Peso: ' +item.weight.toString() + 'Kg ', 'Fecha: '+ item.date)) : null
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    alignItems: "center",
  },
  image: {
    width: windowHeight / 3,
    height: windowHeight / 3,
  },
  rowContainer: {
    width:'100%',
    flexDirection: "row",
    padding: 20,
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor:'blue',
  },
  buttonText:{
    color:'white',
  }

});

export default SheepDetail;
