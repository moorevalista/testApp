import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, Image, Text, View, ScrollView, Pressable, TouchableWithoutFeedback } from "react-native"
import Header from "../components/Header"
import BoxUser from "../components/BoxUser"
import DataSet from "../DataSet"
import ContextMenu from '../components/ContextMenu'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

export default function OwnersList(props) {
  const {dataFavorite} = useSelector(state => state); //retrieve default data user favorite from redux
  const {dataMaster} = useSelector(state => state); //retrieve default data user master from redux
  
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [master, setMaster] = useState(''); //to set user master
  const [defDataFav, setDefDataFav] = useState(dataFavorite.state !== undefined ? dataFavorite.state : DataSet); //dataset to set data favorite on first load
  const [dataOwner, setDataOwner] = useState(''); //container data Owner

  const [visible, setVisible] = useState(false); //state to show/hide 'Sort By' (ContextMenu component)
  const [measure, setMeasure] = useState(null); //to set ContextMenu position
  const containerRef = useRef(null); //top view ref
  const itemRef = useRef(null);  //sort by menu ref to set default position based on container dimension
  const [sort, setSort] = useState(0); //state Sort By
  const [sortLabel, setSortLabel] = useState('Name'); //Sort By label based on selected Sort Menu

  const [startIndex, setStartIndex] = useState(1); //start index rows that will be load
  const [rowsLimit, setRowsLimit] = useState(10); //limit rows when first load

  //fetch data Owner from dataset based on startIndex & rowsLimit
  async function setData() {
    const data = [];
    let res = DataSet;
    res = [...res].sort((a, b) => a.first_name + ' ' + a.last_name > b.first_name + ' ' + b.last_name ? 1 : -1); //sort by Name
    res.map((item, index) => {
      if(index >= (startIndex * rowsLimit)-rowsLimit) {
        if(data.length < rowsLimit) {
          data.push(res[index]);
        }
      }
    });
    setDataOwner(oldData => [...oldData, ...data]);
    setStartIndex(startIndex + 1);
  }

  //defined item for Sort By ContextMenu
  const menu = [
    {index: 0, menu: 'Name'},
    {index: 1, menu: 'Number of cats'}
  ];

  //set screen dimension
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDataMaster(); //set data master state on first load
    setDataFav(); //set data favorite state on first load
    setData();  //set data Owner on first load
    setLoading(false);
  },[]);

  useEffect(() => {
    setMaster(parseInt(dataMaster.state)); //set current data master everytime dataMaster value changed
  },[dataMaster]);

  async function setDataMaster() {
    const success = await AsyncStorage.getItem('master_owner'); //check if there is current data master setted

    if(success !== null) { //if not empty
      dispatch({type: 'setDataMaster', payload: success}); //set data master to dataMaster redux
    }
  }
  
  //set favorite state at first load based on prev favorite state
  async function setDataFav() {
    const success = await AsyncStorage.getItem('favorites'); //check if there is current data favorite setted
    const data = JSON.parse(success);

    if(data !== null) { //if not empty then replace 'Favorite' state inside dataOwner container so we can set the color of star favorite icon
      let newArray = defDataFav.slice();
      data.map((val) => {
        if(newArray.length > 0) {
          const index = newArray.findIndex((item) => item.id_user === val);
          if(index > -1) {
            newArray[index].favorite = true;
          }
        }
      })

      dispatch({type: 'setData', payload: newArray}); //set data favorite to dataFavorite redux
    }
    // setDataOwner(newArray);
    // console.log('reduxData : ', dataFavorite);
  }

  //change dataFavorite redux state everytime user change favorite state of any data Owner
  function setFavState(val, type) {
    let newArray = dataOwner.slice();

      if(newArray.length > 0) {
        const index = newArray.findIndex((item) => item.id_user === val);
        if(index > -1) {
          if(type === 'add') {
            newArray[index].favorite = true;  
          }else if(type === 'remove') {
            newArray[index].favorite = false;
          }
        }
      }
      dispatch({type: 'setData', payload: newArray}); //set data favorite to dataFavorite redux
      // setDataOwner(newArray);
      // console.log('Data Fav : ', dataFavorite);
  }

  //change favorite state on star icon press event
  async function addFavorite(e, fav) {
    let favorites = [];
    try{
      let storedFav = await AsyncStorage.getItem('favorites');
      if (storedFav !== null) {
        favorites = JSON.parse(storedFav);

        const index = favorites.indexOf(e);
        if(index < 0) {
          favorites.push(e);
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
          setFavState(e, 'add'); //trigger setFavState to update dataFavorite redux
        }else {
          favorites.splice(index, 1);
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
          setFavState(e, 'remove'); //trigger setFavState to update dataFavorite redux
        }
      }else {
        favorites.push(e);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        setFavState(e, 'add'); //trigger setFavState to update dataFavorite redux
      }
    }catch(error){
      alert(error);
    }
  }

  //to show/hide ContextMenu
  function openMenu() {
    setVisible(!visible);

    if(itemRef.current) {
      itemRef.current.measureLayout(
        containerRef.current,
        (left, top, width, height) => {
          setMeasure({ left, top, width, height });
        }
      );
    }
  }

  //actions for ContextMenu
  function actions(e) {
    const label = menu.filter(item => item.index === e);
    setSort(e);
    setSortLabel(label[0].menu);
    setVisible(!visible);
  }

  //Render data Owner
  function RenderOwner() {
    let data = dataOwner;

    switch(sort) {
      case 0:
        data = [...data].sort((a, b) => a.first_name + ' ' + a.last_name > b.first_name + ' ' + b.last_name ? 1 : -1); //sort by Name
        break;
      case 1:
        data = [...data].sort((a, b) => a.cats.length - b.cats.length); //sort by Number of Cats
        break;
    }

    if(data.length > 0) {
      return data.map((item) => {
        return (
          <BoxUser key={item.id_user} data={item} addFavorite={addFavorite} openDetail={openDetail} />
        )
      })
    }
  }

  //navigate to subView
  function openDetail(e) {
    setVisible(false);
    const data = dataOwner.filter(item => item.id_user === e);
    props.navigation.navigate('ownerDetail', {data: data, addFavorite: addFavorite});
  }

  return (
    !loading ? //load View if data has been loaded
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <View style={styles.container} onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
        <ContextMenu visible={visible} setVisible={setVisible} pos={measure} menu={menu} action={(e) => actions(e)} rightOffset={4} topOffset={20} />
        <View style={styles.OwnersListV3}>
          <Header master={master} data={DataSet}/>

          <View style={styles.GroupBody}>
            <View style={styles.SortGroup}>
              <Text style={styles.SortLabelUser}>Owners List</Text>
              <Pressable style={styles.GroupSorter} onPress={() => openMenu()} ref={itemRef} testID='sortBtn'>
                <Text style={styles.SortLabelList}>Sort By: {sortLabel}</Text>
                <Image
                  style={styles.Ic_dropdown}
                  source={require('../assets/icons/down-arrow.png')}
                />
              </Pressable>
            </View>

            <ScrollView
              nestedScrollEnabled={true}
              persistentScrollbar={true}
              showsVerticalScrollIndicator={false}
              horizontal={false}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
              onScrollEndDrag={setData} >

              <View style={styles.GroupUserList}>
                <RenderOwner />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    paddingTop: '2%'
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
    paddingVertical: '2%'
  },
  SortLabelUser: {
    fontSize: 14,
    fontFamily: "CircularStd-Medium",
    lineHeight: 20,
    color: "rgba(161,175,195,1)",
  },
  GroupSorter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  SortLabelList: {
    main: "Txt150",
    seg1: "[object Object]",
    seg2: "[object Object]",
  },
  Ic_dropdown: {
    width: 16,
    height: 16,
  },

  GroupUserList: {
    paddingHorizontal: '5%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  
})
