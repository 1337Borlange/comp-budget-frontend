import { getClasses } from '@/lib/style-helpers';
import '../../styles/components/formcontrol.scss';
import { PropsWithChildren } from 'react';

interface FormControlProps extends PropsWithChildren {
  fullWidth?: boolean;
  inlineControl?: boolean;
}

export const FormControl = ({
  fullWidth = false,
  inlineControl = true,
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & FormControlProps) => {
  const classes = getClasses({
    'full-width': fullWidth,
    [`icon-${inlineControl ? 'row' : 'column'}`]: true,
  });
  return (
    <div className={`form-control ${classes} ${className}`} {...rest}>
      {children}
    </div>
  );
};
