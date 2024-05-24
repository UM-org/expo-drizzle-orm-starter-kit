import { ImageBackground, StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import bg from '@/assets/images/bg2.png';
import questions from '@/db/quiz.json';
import Question from '../../components/quiz-components/Question';
import React from 'react';
import { GameContext } from '../../contexts/GameContext';
import { Redirect, router } from 'expo-router';

export default function IntroScreen() {
  const { player, updatePlayerData } = React.useContext(GameContext)
  const [activeQuestion, setActiveQuestion] = React.useState(0)
  const [answers, setAnswers] = React.useState<IAnswer>({});

  const onNext = React.useCallback(() => {
    setActiveQuestion((v) => v + 1)
  }, [])

  const onSubmit = React.useCallback((q: string, r: string) => {
    let _answers = answers
    _answers[q] = r
    setAnswers(_answers)
  }, [answers])

  React.useEffect(() => {
    if (activeQuestion == (questions.length - 1)) {
      updatePlayerData?.({ answers })
        .then(() => {
          router.push("/game/outro")
        })
        .catch((e) => console.log(e))
    }
  }, [activeQuestion])
  
  if (player && player.answers) {
    return <Redirect href="/game/outro" />;
  }
  return (
    <ImageBackground style={styles.container} resizeMode='stretch' source={bg}>
      <View style={{ flex: 1 }}>
        {questions.map((q, i) => (
          <Question key={i} onClickNext={onNext} onSubmit={onSubmit} data={q} activeQuestion={activeQuestion} />
        ))}
      </View>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3%"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
