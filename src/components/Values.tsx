import { PropsWithChildren } from 'react';
import '../styles/components/values.scss';

export const ValueHeader = (props: PropsWithChildren) => {
  return <div className="value-header" {...props} />;
};
export const ValueContent: React.FunctionComponent<
  PropsWithChildren & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ className, ...rest }) => {
  return <div className={`value-content ${className}`} {...rest} />;
};
