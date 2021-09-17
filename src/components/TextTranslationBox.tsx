import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  useColorScheme,
  TouchableOpacity
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import TextToSpeechButton from './TtsButton';
import { Colors, textColor, tintColor } from '../util/color-scheme';

interface TranslationProps {
  translation: string;
  langCode: string;
};

const TextTranslationBox: React.FC<TranslationProps> = ({
  translation,
  langCode,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const borderColor = {
    borderColor: isDarkMode ? Colors.lightgray : Colors.dark
  };
  const opacity = { opacity: translation ? 1 : 0.4 };

  const copyToClipboard = () => {
    Clipboard.setString(translation);
  };

  const Toolbar = () => {
    return (
      <View style={styles.toolbar}>
        {translation ? (
          <>
            <TouchableOpacity
              style={styles.clipboardButton}
              onPress={copyToClipboard}>
              <Image
                style={[styles.clipboardButtonIcon, tintColor(isDarkMode)]}
                source={require('../assets/clipboard.png')}
              />
            </TouchableOpacity>
            <TextToSpeechButton text={translation} langCode={langCode} />
          </>
        ) : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, borderColor]}>
      <Text style={[styles.text, textColor(isDarkMode), opacity]}>
        {translation ? translation : 'Translation'}
      </Text>
      <Toolbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    minHeight: 160,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "column",
  },
  text: {
    flex: 1,
    textAlignVertical: 'center',
  },
  clipboardButtonIcon: {
    opacity: 0.8,
    height: 22,
    width: 22,
  },
  clipboardButton: {
    height: 22,
    width: 22,
    marginRight: 20,
  },
  toolbar: {
    height: 22,
    justifyContent: 'flex-end',
    flexDirection: "row"
  }
});

export default TextTranslationBox;