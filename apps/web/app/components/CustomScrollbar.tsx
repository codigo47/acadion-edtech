'use client';

import { Scrollbar } from 'react-scrollbars-custom';
import { ReactNode, CSSProperties } from 'react';

interface CustomScrollbarProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function CustomScrollbar({ children, className = '', style }: CustomScrollbarProps) {
  return (
    <Scrollbar
      className={className}
      noDefaultStyles
      permanentTrackY
      noScrollX
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...style
      }}
      wrapperProps={{
        renderer: (props) => {
          const { elementRef, key, ...restProps } = props;
          return <div key={key} {...restProps} ref={elementRef} style={{ ...restProps.style, position: 'absolute', inset: 0 }} />;
        },
      }}
      scrollerProps={{
        renderer: (props) => {
          const { elementRef, key, ...restProps } = props;
          return <div key={key} {...restProps} ref={elementRef} />;
        },
      }}
      contentProps={{
        renderer: (props) => {
          const { elementRef, key, ...restProps } = props;
          return <div key={key} {...restProps} ref={elementRef} />;
        },
      }}
      trackYProps={{
        style: {
          width: '8px',
          background: '#e5e7eb',
          borderRadius: '4px',
          position: 'absolute',
          right: '4px',
          top: '4px',
          bottom: '4px',
          zIndex: 10,
        },
      }}
      thumbYProps={{
        style: {
          background: '#9F80DA',
          borderRadius: '4px',
          width: '6px',
          marginLeft: '1px',
          cursor: 'pointer',
        },
      }}
    >
      {children}
    </Scrollbar>
  );
}
