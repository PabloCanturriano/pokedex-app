import type { ComponentProps } from 'react';

export type DrawerSelectOption<T extends string = string> = {
  value: T;
  label: string;
  color?: string;
  textColor?: string;
};

export type DrawerSelectIconName = ComponentProps<
  typeof import('@expo/vector-icons').Ionicons
>['name'];

export type DrawerSelectProps<T extends string = string> = {
  value: T;
  options: DrawerSelectOption<T>[];
  onChange: (value: T) => void;
  title?: string;
  type?: 'default' | 'icon';
  icon?: DrawerSelectIconName;
};
