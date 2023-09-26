'use client';

import { getClasses } from '@/lib/style-helpers';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import React, { useRef } from 'react';
import '../styles/components/overlay.scss';
import { createPortal } from 'react-dom';
export interface OverlayProps extends HTMLMotionProps<'div'> {
  zIndex?: number;
  visible?: boolean;
  transparent?: boolean;
  disableClick?: boolean;
  blur?: boolean;
  onClose?: () => void;
}

const Overlay: React.FunctionComponent<
  OverlayProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  transparent = false,
  zIndex = 2,
  visible = false,
  disableClick = false,
  blur = false,
  onClose,
  className,
  ...rest
}) => {
  const ovRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!disableClick && ovRef.current && e.target === ovRef.current && onClose)
      onClose();
  };

  // if (!visible) return null;

  const classes = getClasses({
    transparent: transparent,
    blur: blur,
  });

  const inlineStyle = {
    ...(zIndex && { ['--overlay-z-index']: zIndex }),
  } as React.CSSProperties;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <FocusLock>
          <motion.div
            key={`overlay`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={ovRef}
            className={`overlay ${classes} ${className ? ` ${className}` : ''}`}
            aria-hidden="true"
            style={inlineStyle}
            {...rest}
            onClick={handleClick}
          />
        </FocusLock>
      )}
    </AnimatePresence>,
    document?.body
  );
};

Overlay.displayName = 'Overlay';

export default Overlay;
