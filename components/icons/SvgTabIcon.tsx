import { SvgUri } from 'react-native-svg';

type SvgTabIconProps = {
  focused: boolean;
  size?: number;
  inactiveUri: string;
  activeUri: string;
};

export function SvgTabIcon({ focused, size = 26, inactiveUri, activeUri }: SvgTabIconProps) {
  return <SvgUri uri={focused ? activeUri : inactiveUri} width={size} height={size} />;
}
