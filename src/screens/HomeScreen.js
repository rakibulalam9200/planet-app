import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import PlanetHeader from '../components/PlanetHeader';
import Text from '../components/text/text';
import { PLANET_LIST } from '../data/planet-list';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';


const PlaentItem = ({item}) =>{
    const {name,color} = item;
    const navigation = useNavigation();
    return(
        <Pressable style={styles.item} onPress={()=>navigation.navigate('Detail',{planet:item})}>
            <View style={styles.space}>
            <View style={[styles.circle,{backgroundColor:color}]}></View>
                <Text preset='h3' style={styles.itemName}>{item.name}</Text>
            </View>
            <AntDesign name="right" size={18} color="white" />
        </Pressable>    
    )
    
   
}



export default function HomeScreen({navigation}) {
    const [list,setList] = useState(PLANET_LIST);

    const searchFilter = (text) =>{
        const filteredList = PLANET_LIST.filter(item => {
            const itemName = item.name.toLowerCase();
            const userTypedText = text.toLowerCase();
            return itemName.indexOf(userTypedText) > -1;
        })
        setList(filteredList);
    }
  return (
      <SafeAreaView style={styles.container}>
           <PlanetHeader/>
           <TextInput
            placeholder='Type the planet name'
            placeholderTextColor={colors.white}
            outoCorrect={false}
            style={styles.searchInput}
            onChangeText={(text)=>searchFilter(text)}
            />
           <FlatList
            contentContainerStyle={styles.list}
            data={list}
            keyExtractor={(item) => item.name}
            renderItem={({item})=>{
                return  <PlaentItem item={item}/>
            }}
            ItemSeparatorComponent={()=><View style={styles.separator}/>}
        />
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.black,
      paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    list:{
        padding:spacing[5]
    },
    item:{
        flexDirection:"row",
        alignItems:"center",
        padding:spacing[4],
        justifyContent:"space-between",
    },
    space:{
        flexDirection:'row',
        alignItems:'center',
    },
    circle:{
        width:30,
        height:30,
        borderRadius:15,
    },
    itemName:{
        textTransform:'capitalize',
        marginLeft:spacing[4],
    },
    separator:{
        borderBottomColor:colors.white,
        borderWidth:0.5,
    },
    searchInput:{
        padding:spacing[4],
        color:colors.white,
        borderBottomColor:colors.white,
        borderBottomWidth:1,
        margin:spacing[5],
    }
  });
  