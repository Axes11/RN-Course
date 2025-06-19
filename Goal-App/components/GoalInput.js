import {
	View,
	TextInput,
	Button,
	StyleSheet,
	Modal,
	Image,
} from 'react-native';
import { useState } from 'react';

function GoalInput(props) {
	const [enteredGoalText, setEnteredGoalText] = useState('');

	function goalInputHandler(enteredText) {
		setEnteredGoalText(enteredText);
	}

	function addGoalHandler() {
		props.onAddGoal(enteredGoalText);
		setEnteredGoalText('');
	}

	return (
		<Modal visible={props.visible} animationType='slide'>
			<View style={styles.inputContainer}>
				<Image
					style={styles.image}
					source={require('../assets/images/goal.png')}
				/>
				<TextInput
					value={enteredGoalText}
					style={styles.textInput}
					placeholder='Your course goal!'
					onChangeText={goalInputHandler}
				/>
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button title='Close' onPress={props.onCancel} color='#f31282' />
					</View>
					<View style={styles.button}>
						<Button title='Add Goal' onPress={addGoalHandler} color='#5e0acc' />
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		padding: 16,
		backgroundColor: '#311b6b',
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#e4d0ff',
		backgroundColor: '#e4d0ff',
		width: '70%',
		borderRadius: 6,
		color: '#120438',
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	button: {
		marginTop: 8,
		width: 100,
		marginHorizontal: 8,
	},
	image: {
		width: 100,
		height: 100,
		margin: 20,
	},
});

export default GoalInput;
