import {BlueColor} from './Blue';
import {GrayColor} from './Gray';
import {NavyColor} from './Navy';
import {RedColor} from './Red';

export type Color = BlueColor | GrayColor | NavyColor | RedColor;

export const Color = {
  ...BlueColor,
  ...GrayColor,
  ...NavyColor,
  ...RedColor,
};
