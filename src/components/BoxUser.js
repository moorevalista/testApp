import React from "react"
import { StyleSheet, Image, Text, View, Pressable } from "react-native"

export default function BoxUser(props) {
  const data = props.data;
  // console.log('DATA : ', data);

  return (
    <Pressable style={[styles.BoxUser, styles.shadow]} onPress={() => props.openDetail(data.id_user)}>
      <View style={styles.LeftFrame}>
        <View style={styles.GroupAvatar}>
          <View style={styles.CircleAvatar}>
            <View style={styles.AvatarDog}>
              <Text style={styles.InitialText}>{data.first_name.substring(0,1) + data.last_name.substring(0,1)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.VisitorDetails}>
          <Text style={styles.TextName} numberOfLines={1}>{data.first_name + ' ' + data.last_name}</Text>
        </View>
      </View>
      <View style={styles.RightFrame}>
        <Pressable onPress={() => props.addFavorite(data.id_user, data.favorite)} testID='btn'>
          <Image
            style={styles.StarOutline}
            source={data.favorite ? require('../assets/icons/star-fill.png') : require('../assets/icons/star.png')}
          />
        </Pressable>
        <Image
          style={styles.NavArrowRight}
          source={require('../assets/icons/right-arrow.png')}
        />
      </View>
    </Pressable>
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

  BoxUser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    marginBottom: '4%',
    borderRadius: 12,
    backgroundColor: "white",
  },
  LeftFrame: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  RightFrame: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  GroupAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: '5%',
  },
  CircleAvatar: {
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    /* url(image unavailable) */
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(12px)",
    width: 40,
    height: 40,
  },
  AvatarDog: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(12px)",
    width: 38,
    height: 38,
  },
  InitialText: {
    fontSize: 15,
    fontFamily: "SFProText-Regular",
    fontWeight: "600",
    letterSpacing: 0.3,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
  },

  VisitorDetails: {
    flex: 1,
    paddingRight: '2%',
  },
  TextName: {
    fontSize: 14,
    fontFamily: "CircularStd-Medium",
    // fontWeight: "undefined",
    lineHeight: 20,
    color: "rgba(64,64,64,1)",
  },

  StarOutline: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  NavArrowRight: {
    width: 24,
    height: 24,
  },

  
})
