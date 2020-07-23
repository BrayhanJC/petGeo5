import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {useValue} from 'react-native-redash'
import Slide, {SLIDE_HEIGHT} from './Slide';
import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
export default function SlideMain() {

	const x = useValue(0)
	return (
		<View style={styles.container}>
			<View style={styles.slider}>
				<Animated.ScrollView
					horizontal
					snapToInterval={width}
					decelerationRate="fast"
					showsHorizontalScrollIndicator={false}
					bounces={false}
				>
					<Slide label="Hola" />
					<Slide label="Noticias" right={true}/>
					<Slide label="Centros" />
					<Slide label="Comedogs" right={true}/>
					<Slide label="Mapa" />
				</Animated.ScrollView>
			</View>
			<View style={styles.footer} >
                <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'cyan'}}>
                    <View style={{flex:1, backgroundColor:'white', borderTopLeftRadius:75}}>

                    </View>
                </View>
                </View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor:'white'
	},
	slider: {
        height: SLIDE_HEIGHT,
        backgroundColor:'cyan',
        borderBottomRightRadius: 75
	},
	footer: {
		flex: 1
	}
});
