import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Componente que permite renderizar el footer del slide
 * @param {title, description, color, next} props 
 */
export default function SubSlide(props) {
	const { title, description, color, next } = props;
	return (
		<View style={[ styles.footer, { backgroundColor: color } ]}>
			<View style={{ ...StyleSheet.absoluteFillObject }} />
			<View style={styles.footerContent}>
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
			</View>
			<View style={{ alignContent: 'flex-end', alignItems: 'flex-end', borderRadius: 90 }}>
				<Text
					style={{
						alignContent: 'flex-end',
						alignItems: 'flex-end',
						color: 'white',
						fontWeight: 'bold',
						fontSize: 17
					}}
				>
					{next}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: -20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24
	},
	title: {
		fontSize: 23,
		color: '#0C0D34',
		fontWeight: 'bold',
		marginBottom: 5,
		marginTop:10
	},
	description: {
		fontSize: 14,
		lineHeight: 15,
		color: '#0C0D34',
		justifyContent: 'center'
	},
	footer: {
		flex: 1,
		backgroundColor: 'green'
	},
	footerContent: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderTopLeftRadius: 95,
		borderBottomStartRadius: 95
	}
});
