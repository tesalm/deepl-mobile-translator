import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme
} from 'react-native';
import { textColor, tintColor, Colors } from '../util/color-scheme';

interface TextInputAreaProps {
  input: string;
  setText(arg: string): void;
  clearText(): void;
};

const TextInputBox: React.FC<TextInputAreaProps> = ({
  input,
  setText,
  clearText
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const borderColor = {
    borderColor: isDarkMode ? Colors.lightgray : Colors.dark
  };

  return (
    <View style={[styles.container, borderColor]}>
      <TextInput
        style={[styles.textInput, textColor(isDarkMode)]}
        value={input}
        onChangeText={setText}
        placeholder="Text to translate"
        multiline={true}
        autoCorrect={false}
        numberOfLines={8}
      />
      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearText}>
        <Image
          style={[styles.clearButtonIcon, tintColor(isDarkMode)]}
          source={require('../assets/clear.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    marginRight: 4,
  },
  clearButtonIcon: {
    opacity: 0.8,
    height: 20,
    width: 20,
  },
  clearButton: {
    justifyContent: "center",
    height: 22,
    width: 22,
  },
});

export default TextInputBox;