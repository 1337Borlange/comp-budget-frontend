import Image from 'next/image';
import '../styles/components/userimage.scss';
import { UserIcon } from './Icons/UserIcon';

type UserImageProps = {
  url: string;
  size?: number;
  alt: string;
  width?: number;
  height?: number;
};

const UserImage: React.FunctionComponent<UserImageProps> = ({
  url,
  size = 50,
  alt,
  width,
  height,
}) => {
  const style = { '--user-image-size': `${size}px` } as React.CSSProperties;
  return (
    <div className="user-image-wrapper" style={style}>
      {url ? (
        <Image
          className="user-image"
          width={width ?? size}
          height={height ?? size}
          src={url}
          alt={alt}
        />
      ) : (
        <UserIcon />
      )}
    </div>
  );
};

export default UserImage;
