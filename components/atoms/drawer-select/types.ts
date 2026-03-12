export type DrawerSelectOption<T extends string = string> = {
  value: T;
  label: string;
  color?: string;
  textColor?: string;
};

export type DrawerSelectProps<T extends string = string> = {
  value: T;
  options: DrawerSelectOption<T>[];
  onChange: (value: T) => void;
  title?: string;
};
