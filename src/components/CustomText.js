import React from 'react';
import { Text, StyleSheet } from 'react-native';
import fonts from '../assests/fonts/fonts';
import theme from '../constants/theme';

const CustomText = ({
  children,
  style,
  variant = 'body',
  ...props
}) => {
  return (
    <Text style={[styles.base, styles[variant], style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: theme.colors.text,
    textAlign: 'left',
    textTransform: 'none',
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: theme.colors.primary,
    marginBottom: 8,
    marginTop: 12,
  },
  body: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: theme.colors.text,
  },
});

export default CustomText;
