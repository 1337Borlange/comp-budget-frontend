'use client';

import React, { useEffect } from 'react';

import { TimesIcon } from './Icons/TimesIcon';
import Overlay, { OverlayProps } from './Overlay';
import { ModalContent } from './ModalContent';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { AlignItems, Justify } from '@/lib/types';
import { getClasses } from '@/lib/style-helpers';

import '../styles/components/modal.scss';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    // transition: {
    //   duration: 0.1,
    //   type: "spring",
    //   damping: 25,
    //   stiffness: 500,
    // },
  },
} satisfies Variants;

export interface ModalProps extends OverlayProps {
  visible: boolean;
  width?: string;
  alignItems?: AlignItems;
  justifyContent?: Justify;
  id: string;
  onClose: () => void;
}

const Modal: React.FunctionComponent<
  ModalProps & React.HTMLAttributes<HTMLDivElement>
> = ({
  children,
  visible,
  width = '50rem',
  onClose,
  zIndex = 5,
  disableClick = false,
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  id,
  blur,
  className,
  ...rest
}) => {
  // if (!visible) return null;

  const classes = getClasses({
    [`flex-align-${alignItems}`]: !!alignItems,
    [`flex-justify-${justifyContent}`]: !!justifyContent,
  });

  const inlineStyle = {
    ...(zIndex && { zIndex: zIndex + 1 }),
    ...(width && { width }),
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);
  return (
    <AnimatePresence>
      <Overlay
        key={`overlay-${id}`}
        visible={visible}
        onClose={onClose}
        disableClick={disableClick}
        zIndex={zIndex}
        blur={blur}
      >
        <AnimatePresence>
          {visible && (
            <motion.div
              key={`md-${id}`}
              className={`modal ${classes} ${className ? ` ${className}` : ''}`}
              style={inlineStyle}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              {...rest}
            >
              <button
                className={`base-close-button`}
                data-testid="close-button"
                onClick={onClose}
                role="button"
                aria-label="Close"
                title="Close"
                type="button"
              >
                <TimesIcon />
              </button>
              <ModalContent>{children}</ModalContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Overlay>
    </AnimatePresence>
  );
};

export default Modal;
