import Image from 'next/image';
import '../styles/components/userimage.scss';

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
      <Image
        className="user-image"
        width={width ?? size}
        height={height ?? size}
        src={url}
        alt={alt}
      />
    </div>
  );
};

export default UserImage;
