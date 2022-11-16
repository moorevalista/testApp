import React from "react"
import { StyleSheet, Image, Text, View } from "react-native"

export default function BoxCatList(props) {
  const data = props.data;
  // console.log('DATA : ', data);

  // untuk icon
  const Icons = ({name, color}) => {
    return (
      <Icon
        style={{
          backgroundColor: 'transparent',
          color: color ? color : 'rgba(0,0,0,1)',
          fontSize: 18,
          opacity: 0.8,
          fontWeight: 'bold',
        }}
        name={name}
      />
    );
  };

  return (
    <View style={[styles.TilePet, styles.shadow]}>
      <View style={styles.BoxDetail}>
        <View style={styles.GroupFrame}>
          <Text style={styles.TopLabel}>{data.cat_name}</Text>
          <Text style={styles.BottomLabel}>Age: {data.cat_age}</Text>
        </View>
      </View>
      <Image
        style={styles.ArrowLeft}
        source={require('../assets/icons/right-arrow.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    backdropFilter: "blur(12px)",
    shadowColor: "rgba(110,113,145,0.22)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 0,
  },

  TilePet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    marginBottom: '2%',
    marginHorizontal: '2%',
    borderRadius: 12,
    backgroundColor: "white",
  },
  BoxDetail: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  
  TopLabel: {
    fontSize: 14,
    fontFamily: "CircularStd-Medium",
    fontWeight: "700",
    lineHeight: 22,
    color: "rgba(64,64,64,1)",
    marginBottom: 8,
  },
  BottomLabel: {
    fontSize: 12,
    fontFamily: "CircularStd-Medium",
    
    letterSpacing: 0.24,
    color: "rgba(161,175,195,1)",
  },
  ArrowLeft: {
    width: 24,
    height: 24,
  },

})
