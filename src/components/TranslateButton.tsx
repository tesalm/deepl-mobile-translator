import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../util/color-scheme';

interface TranslateButtonProps {
  disabled: boolean;
  loading: boolean;
  getTranslation(): void;
};

const TranslateButton: React.FC<TranslateButtonProps> = ({
  disabled,
  loading,
  getTranslation,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const mutableStyle = {
    backgroundColor: isDarkMode ? Colors.twitchpurple : Colors.blue,
    opacity: disabled ? 0.6 : 1
  };

  const ButtonStateIndicator = () => {
    if (loading)
      return <ActivityIndicator size="small" color="#E8E6E3" />
    return <Text style={styles.translateButtonText}>Translate</Text>
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.translateButton, mutableStyle]}
      onPress={getTranslation}>
      <ButtonStateIndicator />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  translateButton: {
    height: 55,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  translateButtonText: {
    color: "#DCDCDC",
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TranslateButton;