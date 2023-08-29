import { Expense, GoogleJWTProfile } from './types';
import jwt_decode from 'jwt-decode';

export const getExpenseType = (exp: Expense): string =>
  exp.isHardware ? 'hardware' : exp.type;

const isNumber = (val: unknown) => {
  const pattern = /^\d+\.?\d*$/;
  return pattern.test(val as string);
};

export const getFormValue = (
  val: FormDataEntryValue
): string | boolean | number | FormDataEntryValue => {
  // if (isNumber(val)) {
  //   return Number(val);
  // } else
  if (val === 'on') {
    return true;
  } else if (val === 'off') {
    return false;
  }
  return val;
};

export const apiFetch = async (
  token: string,
  url: string,
  options: RequestInit = { headers: {} }
): Promise<Response> => {
  const _options = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  };
  return fetch(url, _options);
};

export const getUserId = (id_token: string) => {
  const dec = jwt_decode(id_token) as GoogleJWTProfile;
  return dec?.sub;
};

export const getPercentage = (max: number, current: number): number => {
  const percentage = Math.floor((current / max) * 100);
  return percentage;
};
export const getValueStatus = (max: number, current: number): string => {
  const percentage = getPercentage(max, current);
  if (percentage <= 10) {
    return 'low';
  } else if (percentage <= 25) {
    return 'warn';
  }

  return 'normal';
};

export const barColors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];
