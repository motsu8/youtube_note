import { useState } from 'react';

import { AUTH_CLOSE } from '@/constants/lp';

function useVisibleAuth() {
  const [visibleAuth, setVisibleAuth] = useState(AUTH_CLOSE);

  const updateVisibleAuth = (type: string) => {
    setVisibleAuth(type);
  };

  return { visibleAuth, setVisibleAuth, updateVisibleAuth };
}

export default useVisibleAuth;
