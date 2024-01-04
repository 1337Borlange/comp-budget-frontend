import IconWrapper from './IconWrapper';

export const LoadingIcon: React.FC<React.HTMLAttributes<SVGElement>> = (props) => (
  <IconWrapper viewBox="0 0 38 38" {...props}>
    <path d="M36 18c0-9.94-8.06-18-18-18">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 18 18"
        to="360 18 18"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
  </IconWrapper>
);
