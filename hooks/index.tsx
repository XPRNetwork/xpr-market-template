import { useEffect, useState, useRef } from 'react';

export const useScrollLock = (isActive: boolean): void => {
  useEffect(() => {
    const isWindowsOS =
      navigator &&
      navigator.platform &&
      navigator.platform.toLowerCase().includes('win');
    if (isActive && !isWindowsOS) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [isActive]);
};

export const usePrevious = (value: string): string => {
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current as string;
};

export const useWindowSize = (): {
  windowWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
} => {
  const isSSR = typeof window === 'undefined';
  const [windowWidth, setWindowWidth] = useState(
    isSSR ? 1200 : window.innerWidth
  );
  const [isMobile, setIsMobile] = useState(
    isSSR ? false : window.innerWidth <= 600
  );
  const [isTablet, setIsTablet] = useState(
    isSSR ? false : window.innerWidth <= 970
  );
  const [isLaptop, setIsLaptop] = useState(
    isSSR ? false : window.innerWidth <= 1250
  );
  const [isDesktop, setIsDesktop] = useState(
    isSSR ? false : window.innerWidth > 1250
  );

  function changeWindowSize() {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth <= 600) {
      setIsMobile(true);
      setIsDesktop(false);
      setIsLaptop(false);
      setIsTablet(false);
    } else if (window.innerWidth <= 970) {
      setIsTablet(true);
      setIsDesktop(false);
      setIsLaptop(false);
      setIsMobile(false);
    } else if (window.innerWidth <= 1250) {
      setIsLaptop(true);
      setIsDesktop(false);
      setIsTablet(false);
      setIsMobile(false);
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsLaptop(false);
      setIsDesktop(true);
    }
  }

  useEffect(() => {
    changeWindowSize();
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);

  return { windowWidth, isMobile, isTablet, isLaptop, isDesktop };
};

export const useNavigatorUserAgent = (): {
  isDesktop: boolean;
  isBrowserVideoCompatible: boolean;
} => {
  const [isDesktop, setIsDesktop] = useState<boolean>(null);
  const [
    isBrowserVideoCompatible,
    setIsBrowserVideoCompatible,
  ] = useState<boolean>(true);

  const checkIfDesktop = () => {
    const isMobile =
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(
        navigator.userAgent.substr(0, 4)
      );
    const isAppleHandheld = /iP(ad|od|hone)/i.test(navigator.userAgent);
    setIsDesktop(!isMobile && !isAppleHandheld);
  };

  useEffect(() => {
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);

    return () => {
      window.removeEventListener('resize', checkIfDesktop);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
      setIsBrowserVideoCompatible(!isFirefox);
    }
  }, []);

  return { isDesktop, isBrowserVideoCompatible };
};

export const useEscapeKeyClose = (close: () => void): void => {
  const closeOnEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);
};

export const useClickAway = (ref, onClickAway: () => void): void => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
