import React, {useEffect, useRef, useState} from 'react';
import {AdEventType, InterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import {ProgressBarAndroid, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useProgress} from "./useProgress";
import 'expo-dev-client'

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

export default function App() {
    const [isLoading, setLoading] = useState(true);
    let {current: timeOutId} = useRef(setTimeout(() => setLoading(false), 5000));
    const progress = useProgress()

    useEffect(() => {
        const unsubscribeArr = [
            interstitial.addAdEventListener(AdEventType.LOADED, showAdvertising),
            interstitial.addAdEventListener(AdEventType.CLOSED, closeAdvertising),
            interstitial.addAdEventListener(AdEventType.ERROR, errorAdvertising),
        ];
        interstitial.load();

        //todo при условии что роутинга нет, отписка не сработает но, +- как-то так должно работать
        return unsubscribeArr.forEach((subscribe) => subscribe);
    }, []);

    const showAdvertising = () => {
        interstitial.show()
        clearTimeout(timeOutId)
    }

    const closeAdvertising = () => setLoading(false)

    const errorAdvertising = (e) => {
        console.error(e)
        clearTimeout(timeOutId)
        closeAdvertising()
    }


    return (
        <View style={styles.container}>
            {isLoading ? <>
                <Text>loading: {progress} %</Text>
                <ProgressBarAndroid
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={progress / 100}
                />
            </> : <>
                <Text>Welcome to my app!..</Text>
            </>}
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
