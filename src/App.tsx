import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import { deepL_TranslationRequest } from './util/api';
import { source_languages, target_languages } from './util/languages';
import LanguageMenu from './components/LanguageMenu';
import TextInputBox from './components/TextInputBox';
import TranslateButton from './components/TranslateButton';
import TextTranslationBox from './components/TextTranslationBox';
import { Colors } from './util/color-scheme';


const App = () => {
  const [translation, setTranslation] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [target, setTargetLang] = useState<string>('EN-US');
  const [source, setSourceLang] = useState<string>('DTC');
  const [loading, setLoading] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.light,
    flex: 1,
    padding: 8
  };

  const getTranslation = async () => {
    try {
      setLoading(true);
      const sourceLang = source !== 'DTC' ? source : '';
      const res = await deepL_TranslationRequest(text, target, sourceLang);
      if (res.message) throw res;
      if (source === 'DTC')
        setSourceLang(res.translations[0].detected_source_language);
      setTranslation(res.translations[0].text);
    }
    catch(err: any) {
      Alert.alert("Translation request failed", err.message)
    }
    finally {
      setLoading(false);
    }
  };

  const clearTextHandler = () => {
    setText('');
    setTranslation('');
  };

  const languageSwitchHandler = () => {
    if (source !== 'DTC') {
      const target_ = target;
      source === 'EN'
        ? setTargetLang('EN-US')
        : source === 'PT'
        ? setTargetLang('PT-PT')
        : setTargetLang(source);
      target_ === 'EN-US' || target_ === 'EN-GB'
        ? setSourceLang('EN')
        : target_ === 'PT-PT' || target_ === 'PT-BR'
        ? setSourceLang('PT')
        : setSourceLang(target_);
      if (text && translation) {
        setText(translation);
        setTranslation(text);
      }
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.langSelectionSection}>
        <LanguageMenu
          setLanguage={setSourceLang}
          language={source}
          languages={source_languages}
        />
        <TouchableOpacity
          style={styles.langSwapButton}
          onPress={languageSwitchHandler}>
          <Image
            source={require('./assets/swap.png')}
            style={styles.langSwapButtonIcon}
          />
        </TouchableOpacity>
        <LanguageMenu
          setLanguage={setTargetLang}
          language={target}
          languages={target_languages}
        />
      </View>
      <TextInputBox
        input={text}
        setText={setText}
        clearText={clearTextHandler}
      />
      <TextTranslationBox translation={translation} langCode={target} />
      <TranslateButton
        disabled={text ? false : true}
        loading={loading}
        getTranslation={getTranslation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  langSwapButton: {
    width: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  langSwapButtonIcon: {
    width: 40,
    height: 40,
    tintColor: "#006494",
  },
  langSelectionSection: {
    marginVertical: 12,
    flexDirection: 'row',
  },
});

export default App;
