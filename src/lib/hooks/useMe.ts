import { useContext } from 'react';
import { MeContext } from '../context';

const useMe = () => {
  const { me, setMe } = useContext(MeContext);

  return { me, setMe };
};

export default useMe;
