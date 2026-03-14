import { Ionicons } from '@expo/vector-icons';

type Props = {
  focused: boolean;
  size?: number;
  color: string;
};

export function ItemsTabIcon({ focused, size = 26, color }: Props) {
  return <Ionicons name={focused ? 'bag' : 'bag-outline'} size={size} color={color} />;
}