import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default function Button(props) {

  return (
    <TouchableOpacity style={styles.ButtonPrimaryDefault} onPress={props.setDataMaster} testID='btn'>
      <Text style={styles.Txt745}>Make Master</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ButtonPrimaryDefault: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    position: 'absolute',
    bottom: '2%',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 8,
    backgroundColor: "rgba(54,163,136,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(252,252,252,0.5)",
    backdropFilter: "blur(12px)",
    shadowColor: "rgba(160,163,189,0.16)",
    elevation: 2,
    shadowOffset: { width: 0, height: 16 },
    marginHorizontal: '15%'
  },
  Txt745: {
    flex: 1,
    fontSize: 18,
    fontFamily: "CircularStd-Medium",
    fontWeight: "500",
    lineHeight: 24,
    color: "rgba(252,252,252,1)",
    textAlign: "center",
    justifyContent: "center"
  },

})
