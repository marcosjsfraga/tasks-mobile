import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from "../commonStyles";
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
	const doneOrNotStyle =
		props.doneAt != null ? { textDecorationLine: "line-through" } : {};
	const formatedDate = moment(props.estimateAt)
		.locale("pt-br")
		.format('ddd, D [de] MMMM');

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onPress={() => props.toggleTask(props.id)}>
				<View style={styles.checkContainer}>
					{getCheckView(props.doneAt)}
				</View>
			</TouchableWithoutFeedback>
			<View>
				<Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
				<Text style={styles.date}>{formatedDate}</Text>
			</View>
		</View>
	);
};

function getCheckView(doneAt) {
	if (doneAt != null) {
		return (
			<View style={styles.done}>
				<Icon name="check" size={20} color="#fff" />
			</View>
		);
	} else {
		return <View style={styles.pending} />;
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderColor: '#aaa',
		borderBottomWidth: 1,
		alignItems: 'center',
		paddingVertical: 5,
	},
	checkContainer: {
		width: '20%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	pending: {
		height: 25,
		width: 25,
		borderRadius: 13,
		borderWidth: 1,
		borderColor: '#555'
	},
	done: {
		height: 25,
		width: 25,
		borderRadius: 13,
		borderColor: '#555',
		backgroundColor: '#4d7031',
		alignItems: 'center',
		justifyContent: 'center'
	},
	desc: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.mainText,
		fontSize: 15,
	},
	date: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.sub
	},
});