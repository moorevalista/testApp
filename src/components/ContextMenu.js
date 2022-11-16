import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, Animated, Pressable } from "react-native"

export default function ContextMenu(props) {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
        if(props.visible) {
            Animated.timing(
            fadeAnim,
            {
                useNativeDriver: true,
                toValue: 1,
                duration: 500,
            }
            ).start();
        }else {
            Animated.timing(
                fadeAnim,
                {
                    useNativeDriver: true,
                    toValue: 0,
                    duration: 500,
                }
                ).start();
        }
    }, [props.visible]);

    const RenderMenu = () => {
        return props.menu.map((item) => {
            return (
                <Pressable key={item.index} style={styles.ItemMenu} onPress={() => props.action(item.index)}>
                    <Text style={styles.Label}>{item.menu}</Text>
                </Pressable>
            )
        })
    }

    // console.log(props);
    return (
       (props.visible && props.pos !== null) ?
        <Animated.View style={[styles.container(props.pos, props.rightOffset, props.topOffset), styles.shadow, {opacity: fadeAnim}]}>
            <RenderMenu />
        </Animated.View>
        :
        <></>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    centeredView: {
        borderWidth: 3
    },
    container: (layout, rightOffset, topOffset) => ({
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        right: layout !== null ? layout.width / rightOffset : 0,
        top: layout !== null ? layout.top + topOffset : 0,
        zIndex: 1
    }),
    ItemMenu: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
    },
    Label: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: "400",
        color: "rgba(90,90,90,1)",
    }
})