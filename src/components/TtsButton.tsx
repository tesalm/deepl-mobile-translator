import Tts from 'react-native-tts';
import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme
} from 'react-native';
import { tintColor } from '../util/color-scheme';


interface TtsProps {
  text: string;
  langCode: string;
};

const TextToSpeechButton: React.FC<TtsProps> = ({
  text,
  langCode,
}) => {
  //Tts.addEventListener('tts-start', e => console.log('start', e));
  //Tts.addEventListener('tts-finish', e => console.log('finish', e));
  //Tts.addEventListener('tts-cancel', e => console.log('cancel', e));
  Tts.setDefaultLanguage(langCode);
  const disabled = text ? false : true;
  const isDarkMode = useColorScheme() === 'dark';

  const onPressSpeech = () => {
    Tts.stop();
    Tts.speak(text);
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.speechButton}
      onPress={onPressSpeech}>
      <Image
        style={[styles.speechButtonIcon, tintColor(isDarkMode)]}
        source={require('../assets/audio.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  speechButtonIcon: {
    opacity: 0.8,
    height: 22,
    width: 22,
  },
  speechButton: {
    height: 22,
    width: 22,
  },
});

export default TextToSpeechButton;