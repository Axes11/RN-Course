import {
	TextInput,
	View,
	StyleSheet,
	Alert,
	useWindowDimensions,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Colors from '../constants/colors';
import Title from './../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
	const [enteredValue, setEnteredValue] = useState('');

	const { width, height } = useWindowDimensions();

	function numberInputHandler(input) {
		setEnteredValue(input);
	}

	function confirmInputHandler() {
		const chosenNumber = parseInt(enteredValue);

		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Invalid number!',
				'Number has to be a number between 1 and 99',
				[{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }],
			);
			return;
		}

		onPickNumber(chosenNumber);
	}

	function resetInputHandler() {
		setEnteredValue('');
	}

	const marginTopDistance = height < 380 ? 30 : 100;

	return (
		<ScrollView style={styles.}>
			<KeyboardAvoidingView style={styles.screen} behavior='position'>
				<View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
					<Title>Guess My Number !</Title>
					<Card>
						<InstructionText>Enter a Number</InstructionText>
						<TextInput
							style={styles.numberInput}
							maxLength={2}
							keyboardType='number-pad'
							autoCapitalize='none'
							onChangeText={numberInputHandler}
							autoCorrect={false}
							value={enteredValue}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmInputHandler}>
									Confirm
								</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		alignItems: 'center',
	},
	numberInput: {
		height: 60,
		width: 60,
		fontSize: 32,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		color: Colors.accent500,
		marginVertical: 8,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
});

export default StartGameScreen;
