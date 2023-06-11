import { useEffect, useState } from 'react';

const useIsIphoneSafari = () => {
  const [isIphoneSafari, setIsIphoneSafari] = useState(false);

  useEffect(() => {
    const { userAgent } = navigator;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isIphone = /iPhone/i.test(userAgent);

    setIsIphoneSafari(isSafari && isIphone);
  }, []);

  return isIphoneSafari;
};

export default useIsIphoneSafari;
