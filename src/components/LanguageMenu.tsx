import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';


interface MenuProps {
  language: string;
  languages: {label: string; value: string}[];
  setLanguage(arg: string): void;
};

const LanguageMenu: React.FC<MenuProps> = ({
  language = null,
  languages,
  setLanguage,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropDownPicker
      style={{backgroundColor: '#E8E6E3'}}
      dropDownContainerStyle={styles.menu}
      containerStyle={styles.container}
      open={open}
      placeholder=""
      maxHeight={300}
      value={language}
      items={languages}
      setOpen={setOpen}
      setValue={setLanguage}
      zIndex={1000}
    />
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#E8E6E3',
    elevation: 1000,
    zIndex: 100,
  },
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default LanguageMenu;