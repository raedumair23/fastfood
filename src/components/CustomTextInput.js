import React from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';
import theme from '../constants/theme';
import fonts from '../assests/fonts/fonts';

export default function CustomTextInput({
  label,
  value,
  onChangeText,
  style,
  error,
  ...props
}) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          style,
          error && styles.errorBorder,
          props.multiline && styles.multiline,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.placeholder}
        {...props}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: theme.colors.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.background2,
    includeFontPadding: false, 
    textAlignVertical: 'top',
  },
  multiline: {
    height: 100,
  },
  errorBorder: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    fontFamily: fonts.medium,
    marginTop: 4,
  },
});
