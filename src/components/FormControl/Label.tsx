import '../../styles/components/label.scss';

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export const Label = (props: LabelProps) => {
  return <label {...props} />;
};

// export const Label = styled.label`
//   display: inline-flex;
//   align-items: center;
//   font-size: 1rem;
//   line-height: 1rem;
//   font-weight: bold;
//   margin-bottom: var(--spacing-2xs);

//   > span.required-symbol {
//     margin-left: var(--spacing-2xs);
//   }
// `;
