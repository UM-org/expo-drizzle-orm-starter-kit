/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput, TextInputProps, TouchableOpacityProps, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import React from 'react';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: "transparent", dark: "transparent" }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function InputGroup(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return <DefaultView style={[{ backgroundColor, borderColor, borderWidth: 1, borderRadius: 4, alignItems: "center", flexDirection: "row", minHeight: 50, padding: 8 }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: "light", dark: "dark" }, 'background');
  const color = useThemeColor({ light: "light", dark: "dark" }, "text");
  return <DefaultTextInput style={[{ backgroundColor, color }, style]} {...otherProps} />;
}

export function Button(props: TouchableOpacityProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: "light", dark: "dark" }, 'background');

  return <TouchableOpacity style={[{ backgroundColor, borderRadius: 46, borderWidth: 1, paddingVertical: 12, alignItems: "center" }, style]} {...otherProps} />;
}

export function PrimaryButton(props: TouchableOpacityProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = Colors.light.primary;

  return <TouchableOpacity style={[{ backgroundColor, borderRadius: 4, borderWidth: 1, paddingVertical: 12, alignItems: "center" }, style]} {...otherProps} />;
}

export function Label(props: TextProps) {
  const { style, ...otherProps } = props;
  return <DefaultText style={[{
    marginBottom: 5,
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: "700",
  }, style]} {...otherProps} />;
}

export const FormInput = React.forwardRef<DefaultTextInput, TextInputProps>(function FormInput(props, ref) {
  const { style, ...otherProps } = props;
  return <DefaultTextInput style={[{
    flex: 1,
    borderRadius: 6,
    padding: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.62,
    elevation: 2,
  }, style]} {...otherProps} ref={ref} />;
})