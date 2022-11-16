import React from "react"
import { StyleSheet, Text, View } from "react-native"

export default function Header(props) {
  const data = props.data.filter(item => item.id_user === props.master);
  
  return (
    data.length > 0 ?
    <View style={styles.GroupHeader}>
      <View style={styles.GroupLeft}>
        <View style={styles.Avatar}>
          <Text style={styles.InitialLabel}>{data[0].first_name.substring(0,1) + data[0].last_name.substring(0,1)}</Text>
        </View>
      </View>
      <View style={styles.GroupName}>
        <Text style={styles.LabelName}>Master: {data[0].first_name + ' ' + data[0].last_name}</Text>
      </View>
    </View>
    :
    <View style={styles.GroupHeader}>
      <View style={styles.GroupLeft}>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  GroupHeader: {
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    // marginBottom: '5%',
    justifyContent: 'center',
  },
  GroupLeft: {
    marginRight: '5%',
    width: 40,
    height: 40,
  },
  Avatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    /*  linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)), linear-gradient(0deg, rgba(251,231,198,0.9) 0%, rgba(251,231,198,0.6) 100%, )  */
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(54,163,136,1)",
    backdropFilter: "blur(12px)",
    width: 40,
    height: 40,
  },
  InitialLabel: {
    fontSize: 15,
    fontFamily: "SFProText-Regular",
    fontWeight: "600",
    letterSpacing: 0.3,
    color: "rgba(54,163,136,1)",
    textAlign: "center",
    justifyContent: "center",
  },

  GroupName: {
    // borderWidth: 2
  },
  LabelName: {
    fontSize: 14,
    fontFamily: "CircularStd-Medium",
    fontWeight: "500",
    letterSpacing: 0.28,
    color: "rgba(64,64,64,1)",
  },
})
