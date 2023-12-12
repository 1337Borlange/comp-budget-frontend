'use client';

import { useSession } from 'next-auth/react';

/*
    TODO: Remove this component
*/
const TempDebugComponent = () => {
  const session = useSession();
  return <></>;
};

export default TempDebugComponent;
