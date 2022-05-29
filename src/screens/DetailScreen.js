import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import PlanetHeader from '../components/PlanetHeader';
import Text from '../components/text/text';
import { EarthIcon, JupiterIcon, MarsIcon, MecuryIcon, NeptuneIcon, UranusIcon, VenusIcon } from '../svg';
import SaturanIcon from '../svg/Saturn';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const PlanetSection = ({title,value})=>{
  return (
    <View style={styles.planetSection}>
      <Text preset='small' style={styles.titlestyle}>{title}</Text>
      <Text preset="h2">{value}</Text>
    </View>
  )
}



export default function DetailScreen({navigation,route}) {
  const {name,description, wikiLink,rotationTime,revolutionTime,radius,avgTemp} = route.params.planet;

  const renderImage = (name) =>{
    switch(name){
      case 'mercury':
        return <MecuryIcon />
      case 'neptune':
        return <NeptuneIcon />
      case 'venus':
        return <VenusIcon />
      case 'earth':
        return <EarthIcon />
      case 'mars':
        return <MarsIcon />
      case 'jupiter':
        return <JupiterIcon />
      case 'saturn':
        return <SaturanIcon />
      case 'uranus':
        return <UranusIcon />
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <PlanetHeader backBtn={true}/>
      <ScrollView>
        <View style={styles.imageView}>
          {renderImage(name)}
        </View>
        <View style={styles.detailsView}>
          <Text preset='h1' style={styles.name}>{name}</Text>
          <Text  style={styles.description}>{description}</Text>
          <Pressable style={styles.source} onPress={()=>Linking.openURL(wikiLink)}>
            <Text>Source: </Text>
            <View style={styles.wikiContainer}>
              <Text preset='h4' style={styles.wikipidea}>Wikipedia</Text>
              <MaterialCommunityIcons style={styles.icon} name="arrow-top-right-bold-box" size={16} color="white" />
            </View>
            
          </Pressable>
        </View>
        <View style={styles.topPlanetSection}></View>
        <PlanetSection title={"ROTATION TIME"} value={rotationTime}/>
        <PlanetSection title={"REVOLUTION TIME"} value={revolutionTime}/>
        <PlanetSection title={"RADIUS"} value={radius}/>
        <PlanetSection title={"AVERAGE TEMP."} value={avgTemp}/>
      </ScrollView>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.black,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  imageView:{
    marginTop:spacing[10],
    alignItems:'center',
    justifyContent:'center',
    height:250,
  },
  detailsView:{
    marginTop:spacing[8],
    marginHorizontal:spacing[6],
    alignItems:'center',
  },
  name:{
    textTransform:"uppercase",
    textAlign:'center',
  },
  description:{
    textAlign:'center',
    marginTop:spacing[5],
  },
  source:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:spacing[5],
  },
  wikipidea:{
    textDecorationLine:"underline",
    fontWeight:'bold'
  },
  wikiContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  icon:{
    marginTop:spacing[1]
  },
  planetSection:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:spacing[5],
    paddingVertical:spacing[4],
    borderWidth:1,
    borderColor:colors.gray,
    marginHorizontal:spacing[6],
    marginBottom:spacing[4],
  },
  titleStyle:{
    textTransform:"uppercase"
  },
  topPlanetSection:{
    height:spacing[8]
  }
});