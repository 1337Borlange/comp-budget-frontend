import '../../styles/components/label.scss';

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label = (props: LabelProps) => {
  return <label {...props} />;
};
