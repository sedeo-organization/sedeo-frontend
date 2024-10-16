import * as React from "react"
import Svg, {Path, Circle} from "react-native-svg"
import {View} from "react-native";

export const FriendIcon = (props: any) => (
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
                        d="M37.5 32a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM37.5 34.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"
                    />
                    <Circle cx={37.5} cy={52.5} r={2.5} fill="#386BF6" />
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
                        d="M37.5 32a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM46.09 42c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
                    />
                    <Circle cx={37.5} cy={52.5} r={2.5} fill="transparent" />
                </Svg>
            )
        }
    </View>
)
