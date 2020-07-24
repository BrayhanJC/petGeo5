import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SubSlide(props) {
	const { title, description, color } = props;
	return (
		<View style={[styles.footer, {backgroundColor: color}]}>
			<View style={{ ...StyleSheet.absoluteFillObject }} />
			<View style={styles.footerContent}>
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
        padding: 30,
        
	},
	title: {
		fontSize: 24,
		
		color: '#0C0D34',
		lineHeight: 24,
		marginBottom: 12
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: '#0C0D34',
      
        justifyContent: 'center',
	},
	footer: {
        flex: 1,
        backgroundColor: 'green',
	},
	footerContent: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderTopLeftRadius: 95
	}
});
