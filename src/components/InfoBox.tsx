import { InfoIcon } from './Icons/InfoIcon';
import '../styles/components/infobox.scss';

type InfoBoxProps = {
  children: React.ReactNode;
};

export const InfoBox: React.FunctionComponent<InfoBoxProps> = ({
  children,
}) => {
  return (
    <div className="info-box">
      <InfoIcon />
      {children}
    </div>
  );
};
