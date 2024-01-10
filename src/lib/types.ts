export type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type Justify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

export type Spacings =
  | 'none'
  | '3xs'
  | '2xs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'caption'
  | 'breadcrumbs'
  | 'body-text'
  | 'body-text-special';

export type TypographyAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export type FontWeight =
  | 'normal'
  | 'bold'
  | 'heavy'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800';

export type ColumnSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export type Severity = 'success' | 'warning' | 'error' | 'info';

export type FlexGrow = '1' | '0';

export type Budget = {
  name: string;
  userId: string;
  id: string;
  start: string;
  image: string;
  openingBalanceMoney: number;
  openingBalanceTime: number;
  yearlyRefill: number;
  comment: string;
  hardwareBudget: number;
  currentMoneyBalance: number;
  currentTimeBalance: number;
  currentHardwareBalance: number;
};

// New stuff

export enum ExpenseTypes {
  Expense,
  Refill,
  YearlyRefill,
  Start,
}

export enum CategoryUnit {
  Monetary,
  Time,
}

export interface ExpenseDTO {
  id: number;
  sum: number;
  comment: string;
  expenseType: ExpenseTypes;
  categoryId: number;
  userId: string;
  date: string;
}

export interface CategoryDTO {
  id: number;
  name: string;
  unit: CategoryUnit;
  isHardware: boolean;
}

export interface ExpenseWithCategory extends ExpenseDTO {
  category: CategoryDTO;
}

//

export type GoogleProfile = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd: string;
};

export type CreateUpdateDeleteType = 'create' | 'update' | 'delete';

export type GoogleUser = {
  email: string;
  name: string;
  picture: string;
  exp: number;
  sub: string;
};

export type CookieSettings = {
  darkTheme: boolean;
};
export type CookieOptions = {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
};

export type GoogleJWTProfile = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  employeeNumber?: string;
  departmentNumber?: string;
  personalNumber?: string;
  phoneNumber?: string;
  address?: string;
  shirtSize?: string;
  allergies?: string;
  office?: string;
  manager?: string;
  isAdmin?: boolean;
  isManager?: boolean;
};

export interface formDataType {
  [key: string]: FormDataEntryValue | FormDataEntryValue[];
}
