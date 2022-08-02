import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./style"

export default function HistoryGraphic(props){
    return (
       <View style={styles.contentGraphic}>
            <LineChart 
                data={{
                    datasets: [
                        {
                            data: props.infoData
                        },

                    ]
                }}
                width={Dimensions.get("window").width}
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                withVerticalLines={false}
                chartConfig={{
                    backgroundColor: "#ced4da",
                    backgroundGradientFrom: "#232323",
                    backgroundGradientTo: "#3f3f3f",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
                    propsForDots: {
                        r: "1",
                        strokeWidth: "1",
                        stroke: "#144d93"
                    }
                }}
                bezier
            />
       </View> 
    )
}