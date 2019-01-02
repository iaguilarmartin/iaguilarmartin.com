import { rem, getValueAndUnit } from 'polished';

import fonts from '../shared/fonts';

export const pixelsToRem = value => rem(value, fonts.sizes.base);

export const sum = (value1, value2) => {
  const [amount1, unit1] = getValueAndUnit(value1);
  const [amount2, unit2] = getValueAndUnit(value2);

  if (unit1 !== unit2) return null;

  return `${amount1 + amount2}${unit1}`;
};
