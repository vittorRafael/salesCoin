import {  StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    mainContent: {
        width: "95%",
        height: "auto",
        marginLeft: "3%",
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    contextLeft:{
        width: "36%",
        height: "100%",
        alignItems: "flex-start"
    },
    contextRight:{
        width: "60%",
        alignItems: "flex-end"
    },
    logBitCoin: {
        width: 80,
        height: 80,
        marginLeft: 2,
    },
    boxLogo: {
        flexDirection: "row",
        alignItems: "center",
    },
    dayCotation: {
        fontSize: 16,
        paddingLeft: 2,
        fontWeight: "bold",
    },
    price: {
        fontWeight: "bold",
        fontSize: 18,
    }
})

export default styles