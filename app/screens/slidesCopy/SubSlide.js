import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SubSlide(props) {
	const { title, description, last, x } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
        padding: 44,
	},
	title: {
        fontSize: 24,
        alignItems: 'center',
        color: '#0C0D34',
        lineHeight: 24,
        marginBottom: 12,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
        color: '#0C0D34',
        alignItems: 'center',
	}
});
