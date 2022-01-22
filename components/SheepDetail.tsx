import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Dimensions } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";
import { useEffect, useState } from "react";

export type ISheepDetail = {
  name: string;
  number: number;
  ill: boolean;
  heat: boolean;
  pregnant: boolean;
  birthdayDate: string;
  arrivalDate: string;
};

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

  async function getData() {
    const docSnapshot = await getDoc(doc(db, "sheep", props.animalId));
    let tempItem: ISheepDetail;
    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      const temporalSheep = {
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
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getData();
  }, [props.animalId]);

  const renderRow = (label: string, text: string) => {
    return (
      <View style={styles.rowContainer}>
        <Text>{label + " : "}</Text>
        <Text>{text}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "https://s3-us-west-2.amazonaws.com/melingoimages/Images/86116.jpg",
          }}
        />
        {renderRow("name", animalDetail.name)}
        {renderRow("number", animalDetail.number.toString())}
        {renderRow("ill", animalDetail.ill.toString())}
        {renderRow("heat", animalDetail.heat.toString())}
        {renderRow("pregnant", animalDetail.pregnant.toString())}
        {renderRow("birthdayDate", animalDetail.birthdayDate.toString())}
        {renderRow("arrivalDate", animalDetail.arrivalDate.toString())}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    backgroundColor: "yellow",
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
});

export default SheepDetail;
