import Image from 'next/image';
import '../styles/components/userimage.scss';

type UserImageProps = {
  url: string;
  size?: number;
  alt: string;
};

const UserImage: React.FunctionComponent<UserImageProps> = ({
  url,
  size = 50,
  alt,
}) => {
  return (
    <Image
      className="user-image"
      width={size}
      height={size}
      src={url}
      alt={alt}
    />
  );
};

export default UserImage;
