import React from "react"
import { StyleSheet, Image, Text, View, Pressable } from "react-native"

export default function BoxUserDetail(props) {
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
    <Pressable style={[styles.BoxUser, styles.shadow]}>
      <View style={styles.LeftFrame}>
        <View style={styles.GroupAvatar}>
          <View style={styles.CircleAvatar}>
            <View style={styles.AvatarDog}>
              <Text style={styles.InitialText}>{data.first_name.substring(0,1) + data.last_name.substring(0,1)}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.RightFrame}>
        <View style={styles.GroupName}>
          <View style={styles.GroupSubName}>
            <View style={styles.BoxName}>
              <View style={styles.LabelName}>
                <Text style={styles.TextName}>First Name</Text>
              </View>
              <Text style={styles.UserName}>{data.first_name}</Text>
            </View>
          </View>
          <View style={styles.GroupSubName}>
            <View style={styles.BoxName}>
              <View style={styles.LabelName}>
                <Text style={styles.TextName}>Last Name</Text>
              </View>
              <Text style={styles.UserName}>{data.last_name}</Text>
            </View>
          </View>
        </View>

        <Pressable onPress={() => props.addFavorite(data.id_user, data.favorite)} testID='btn'>
          <Image
            style={styles.StarOutline}
            source={data.favorite ? require('../assets/icons/star-fill.png') : require('../assets/icons/star.png')}
          />
        </Pressable>
        {/* <Image
          style={styles.NavArrowRight}
          source={require('../assets/icons/right-arrow.png')}
        /> */}
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
    marginBottom: '7%',
    borderRadius: 12,
    backgroundColor: "white",
  },
  LeftFrame: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  RightFrame: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  GroupName: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  GroupSubName: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: '2%',
    paddingHorizontal: '4%',
  },
  BoxName: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  LabelName: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    marginBottom: 2,
  },
  TextName: {
    fontSize: 12,
    fontFamily: "CircularStd-Medium",
    lineHeight: 22,
    color: "rgba(161,175,195,1)",
  },

  UserName: {
    fontSize: 14,
    fontFamily: "CircularStd-Medium",
    lineHeight: 22,
    color: "rgba(64,64,64,1)",
  },

  GroupAvatar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: '5%',
  },
  CircleAvatar: {
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    /* url(image unavailable) */
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(12px)",
    width: 56,
    height: 56,
  },
  AvatarDog: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255,255,255,0.3)",
    backdropFilter: "blur(12px)",
    width: 54,
    height: 54,
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
  StarOutline: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

})
