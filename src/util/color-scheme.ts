const Colors = {
  dark : '#222222',
  light: '#F3F3F3',
  whitesmoke: '#E8E6E3',
  lightgray: '#A9A297',
  twitchpurple: '#6441A5',
  blue: '#006494',
};

const textColor = (isDarkMode: boolean) => {
  if (isDarkMode) return { color: '#E8E6E3' };
  return { color: '#222222' };
};

const tintColor = (isDarkMode: boolean) => {
  if (isDarkMode) return { tintColor: '#A9A297' };
  return { tintColor: '#222222' };
};

export { Colors, textColor, tintColor };