import * as React from "react"
import {View} from "react-native"
import Svg, {Circle, Path} from "react-native-svg"

export const WalletIcon = (props: any) => (
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
                    d="M46.95 33.64v1a.5.5 0 0 1-.49.5H45c-.53 0-1.01-.39-1.05-.91-.03-.31.09-.6.29-.8a.95.95 0 0 1 .7-.29h1.51c.29.01.5.23.5.5Z"
                />
                <Path
                    fill="#386BF6"
                    d="M43.49 32.69c-.5.49-.74 1.22-.54 1.98.26.93 1.17 1.52 2.13 1.52h.87c.55 0 1 .45 1 1v.19c0 2.07-1.69 3.76-3.76 3.76H31.71c-2.07 0-3.76-1.69-3.76-3.76v-6.73c0-1.23.59-2.32 1.5-3 .63-.48 1.41-.76 2.26-.76h11.48c2.07 0 3.76 1.69 3.76 3.76v.44c0 .55-.45 1-1 1h-1.02c-.56 0-1.07.22-1.44.6ZM41.7 24.82c.27.27.04.69-.34.69l-7.68-.01c-.44 0-.67-.54-.35-.85l1.62-1.63a3.525 3.525 0 0 1 4.96 0l1.75 1.77c.01.01.03.02.04.03Z"
                />
                <Circle cx={37.5} cy={52.5} r={2.5} fill="#386BF6"/>
            </Svg>
        ) : (
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
                    d="M47.5 32v5c0 3-2 5-5 5h-10c-3 0-5-2-5-5v-5c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h10c.26 0 .51.01.75.05 2.58.3 4.25 2.21 4.25 4.95Z"
                />
                <Path
                    stroke="#9DB2CE"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M43.251 27.05c-.24-.04-.49-.05-.75-.05h-10c-.28 0-.55.02-.81.06.14-.28.34-.54.58-.78l3.25-3.26a3.525 3.525 0 0 1 4.96 0l1.75 1.77c.64.63.98 1.43 1.02 2.26ZM47.5 32.5h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3"
                />
                <Circle cx={37.5} cy={52.5} r={2.5} fill="transparent"/>
            </Svg>
        )
        }
    </View>
)