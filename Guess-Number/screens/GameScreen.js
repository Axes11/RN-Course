import {
	Text,
	View,
	StyleSheet,
	Alert,
	FlatList,
	useWindowDimensions,
} from 'react-native';
import Title from '../components/ui/Title';
import { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ pickedNumber, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, pickedNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	const { width, height } = useWindowDimensions();

	useEffect(() => {
		(minBoundary = 1), (maxBoundary = 100);
	}, []);

	useEffect(() => {
		if (currentGuess === pickedNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, pickedNumber, onGameOver]);

	function nextGuessHandler(direction) {
		if (
			(direction === 'lower' && currentGuess < pickedNumber) ||
			(direction === 'greater' && currentGuess > pickedNumber)
		) {
			Alert.alert('Dont lie!', 'You know that this is wrong...', [
				{ text: 'Sorry!', style: 'cancel' },
			]);
			return;
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess,
		);
		setCurrentGuess(newRndNumber);
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
	}

	let guessRoundsListLength = guessRounds.length;

	let content = (
		<>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<View style={styles.buttonsContainer}></View>
			</Card>
		</>
	);

	if (width > 500) {
		content = (
			<>
				<View style={styles.buttonContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
							<Ionicons name='remove' size={24} />
						</PrimaryButton>
					</View>
					<NumberContainer>{currentGuess}</NumberContainer>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
							<Ionicons name='add' size={24} />
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}

	return (
		<View style={styles.screen}>
			<Title>Opponents Guess</Title>
			{content}
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - itemData.index}
							guess={itemData.item}
						/>
					)}
					keyExtractor={(item) => item}></FlatList>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		alignItems: 'center',
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
	buttonContainerWide: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});

export default GameScreen;
