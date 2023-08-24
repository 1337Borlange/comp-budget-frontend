import { PropsWithChildren } from 'react';
import '../styles/components/values.scss';

export const ValueHeader = (props: PropsWithChildren) => {
  return <div className="value-header" {...props} />;
};
export const ValueContent = (props: PropsWithChildren) => {
  return <div className="value-content" {...props} />;
};
