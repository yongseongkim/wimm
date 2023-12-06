import {BlueColor} from './Blue';
import {GrayColor} from './Gray';
import {NavyColor} from './Navy';
import {RedColor} from './Red';

export type Color =
  | BlueColor
  | GrayColor
  | NavyColor
  | RedColor
  | PrimitiveColor;

enum PrimitiveColor {
  White = '#FFFFFF',
  Black = '#000000',
  Transparent = 'transparent',
}

export const Color = {
  ...BlueColor,
  ...GrayColor,
  ...NavyColor,
  ...RedColor,
  ...PrimitiveColor,
};

export namespace ColorUtils {
  export function WithOpacity(color: Color, opacity: number) {
    return `${color}${opacity.toString(16)}`;
  }
}
