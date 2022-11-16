import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, } from "react-native"
import Header from "../components/Header"
import BoxUser from "../components/BoxUserDetail"
import BoxCat from "../components/BoxCatList"
import Button from "../components/Button"
import DataSet from "../DataSet"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import RNShake from 'react-native-shake';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function OwnerDetail(props) {
  const {dataMaster} = useSelector(state => state); //dataMaster from redux
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [master, setMaster] = useState(''); //to set user master
  const [dataOwner, setDataOwner] = useState(''); //dataset Owner
  const [dataDetail, setDataDetail] = useState(props.route.params.data); //data detail Owner

  const containerRef = useRef(null);

  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const subscription = RNShake.addListener(() => { //set data master using shake gesture
      setDataMaster();
    })

    setData();

    return () => {
      subscription.remove()
    }
  },[]);

  function setData() {
    setMaster(parseInt(dataMaster.state)); //set master state based on dataMaster redux
    const data = DataSet.filter(item => item.id_user === parseInt(dataMaster.state)); //get master user data based on current user master
    setDataOwner(data);
    setLoading(false);
  }

  useEffect(() => {
    setDataDetail(props.route.params.data); //set detail data based on props value
  },[props.route.params.data]);

  useEffect(() => {
    setData(); //trigger setData everytime dataMaster value has changed
  },[dataMaster]);

  //change dataMaster function
  async function setDataMaster() {
    await AsyncStorage.setItem('master_owner', JSON.stringify(dataDetail[0].id_user));
    dispatch({type: 'setDataMaster', payload: dataDetail[0].id_user});
  }

  //change favorite user state
  async function addFavorite(e, fav) {
    props.route.params.addFavorite(e, fav);
  }

  //render data Owner
  function RenderOwner() {
    let data = dataDetail;

    if(data.length > 0) {
      return data.map((item) => {
        return (
          <BoxUser key={item.id_user} data={item} addFavorite={addFavorite} />
        )
      })
    }
  }

  //render data Cats
  function RenderCat() {
    let data = dataDetail[0].cats;

    if(data.length > 0) {
      return data.map((item, index) => {
        return (
          <BoxCat key={index} data={item} />
        )
      })
    }
  }

  return (
    !loading ?
    <View style={styles.container} onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
      <View style={styles.OwnersListV3}>
        <TouchableOpacity style={styles.BtnBack} onPress={() => props.navigation.goBack()}>
          <Image
            style={styles.NavArrowBack}
            source={require('../assets/icons/left-arrow.png')}
          />
        </TouchableOpacity>
        <Header master={master} data={dataOwner}/>
        <View style={styles.GroupBody}>
          <View style={styles.SortGroup}>
            <Text style={styles.SortLabelUser}>Owner Card</Text>
          </View>
          <View style={styles.GroupUserList}>
            <RenderOwner />
            <View style={styles.GroupFrame}>
              <Text style={styles.Title}>Cats</Text>
            
              <ScrollView
                showsVerticalScrollIndicator={false}
                horizontal={false}
                contentContainerStyle={styles.scrollArea_contentContainerStyle}>
                <RenderCat />
              </ScrollView>

            </View>
          </View>
          <Button setDataMaster={setDataMaster} />
        </View>
      </View>
    </View>
    :
    <></>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollArea_contentContainerStyle: {
    height: 'auto',
    paddingBottom: '10%',
    paddingTop: '2%',
  },
  
  OwnersListV3: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(248,248,255,1)",
  },

  GroupBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },

  SortGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: '2%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
  SortLabelUser: {
    fontSize: 14,
    fontFamily: "CircularStd-Medium",
    lineHeight: 20,
    color: "rgba(161,175,195,1)",
  },

  GroupUserList: {
    paddingHorizontal: '5%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },

  GroupFrame: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginHorizontal: '-2%'
  },
  Title: {
    fontSize: 14,
    fontFamily: "CircularStd-Medium",
    lineHeight: 20,
    color: "rgba(161,175,195,1)",
    marginBottom: '2%',
    marginHorizontal: '2%'
  },

  BtnBack: {
    paddingVertical: '4%',
    paddingHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1
  },
  NavArrowBack: {
    width: 24,
    height: 24,
  },
  
})
