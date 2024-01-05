import React from 'react';
import { useWindowSize } from 'react-use';

// 100vh is broken on mobile (Chrome, Safari):
// https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html

export default function use100vh() {
  const ref = React.useRef();
  const { height } = useWindowSize();

  React.useEffect(
    () => {
      if (!ref.current) {
        return;
      }
      ref.current.style.height = height + 'px';
    },
    [height],
  );

  return ref;
}

// --

// Higher-order component (to wrap around styled-components definitions)
export const with100vh = Component => ({ children, ...props }) => {
  const ref = use100vh();
  return (
    <Component {...props} ref={ref}>
      {children}
    </Component>
  );
};