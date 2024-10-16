import * as React from "react"
import Svg, {Path, Circle} from "react-native-svg"
import {View} from "react-native";

export const HomeIcon = (props: any) => (
    <View>
        {props.focused == 'true' ? (
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={75}
                    height={75}
                    fill="none"
                    {...props}
                >
                    <Path
                        fill="#386BF6"
                        d="m45.54 26.82-5.76-4.03c-1.57-1.1-3.98-1.04-5.49.13l-5.01 3.91c-1 .78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.62 4.63h10.78c2.55 0 4.62-2.07 4.62-4.62V30.6c0-1.35-.87-3.01-1.97-3.78ZM38.25 38c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3Z"
                    />
                    <Circle cx={37.5} cy={52.5} r={2.5} fill="#386BF6"/>
                </Svg>) :
            (
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={75}
                    height={75}
                    fill="none"
                    {...props}
                >
                    <Path
                        stroke="#9DB2CE"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m45.54 26.82-5.76-4.03c-1.57-1.1-3.98-1.04-5.49.13l-5.01 3.91c-1 .78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.62 4.63h10.78c2.55 0 4.62-2.07 4.62-4.62V30.6c0-1.35-.87-3.01-1.97-3.78ZM38.25 38c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3Z"
                    />
                    <Circle cx={37.5} cy={52.5} r={2.5} fill="transparent"/>
                </Svg>
            )
        }
    </View>
)
