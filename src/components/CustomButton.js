import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import fonts from '../assests/fonts/fonts';
import theme from '../constants/theme';

const CustomButton = ({
  title,
  onPress,
  backgroundColor = theme.colors.primary,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#fff', // ✅ Always white text
    fontSize: 16,
    fontFamily: fonts.regular,
  },
});

export default CustomButton;
