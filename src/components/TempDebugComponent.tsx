"use client";

import { useSession } from "next-auth/react";

/*
    TODO: Remove this component
*/
const TempDebugComponent = () => {
  const session = useSession();
  // console.log("My session: ", session.data);
  return <></>;
};

export default TempDebugComponent;
