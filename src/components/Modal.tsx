'use client';

import React, { useEffect, useRef } from 'react';

import { TimesIcon } from './Icons/TimesIcon';
import Overlay, { OverlayProps } from './Overlay';
import { ModalContent } from './ModalContent';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { AlignItems, Justify } from '@/lib/types';
import { getClasses } from '@/lib/style-helpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  },
} satisfies Variants;

export interface ModalProps extends OverlayProps {
  visible: boolean;
  width?: string;
  alignItems?: AlignItems;
  justifyContent?: Justify;
  id: string;
  onClose?: () => void;
  paramToRemoveOnClose?: string;
}

const Modal: React.FunctionComponent<ModalProps & React.HTMLAttributes<HTMLDivElement>> = ({
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const fullUrl = `${pathname}${id ? `?id=${userId}` : ''}`;
  const modalRef = useRef<HTMLDivElement>(null);

  const classes = getClasses({
    [`flex-align-${alignItems}`]: !!alignItems,
    [`flex-justify-${justifyContent}`]: !!justifyContent,
  });

  const inlineStyle = {
    ...(zIndex && { zIndex: zIndex + 1 }),
    ...(width && { width }),
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    let handleTabKeyPress = (event: KeyboardEvent) => undefined;

    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (onClose) {
          onClose();
          return;
        }
        router.push(fullUrl);
      }
    };

    if (visible && modalElement) {
      document.body.style.overflow = 'hidden';

      //add any focusable HTML element you want to include to this string
      const focusableElements: NodeListOf<HTMLElement> = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };
    }
    modalElement?.addEventListener('keydown', handleTabKeyPress, false);
    modalElement?.addEventListener('keydown', handleEscapeKeyPress, false);
    return () => {
      document.body.style.overflow = 'unset';
      modalElement?.removeEventListener('keydown', handleTabKeyPress);
      modalElement?.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, [visible, onClose]);

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push(fullUrl);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <AnimatePresence>
      <Overlay
        key={`overlay-${id}`}
        visible={visible}
        onClose={onClose}
        disableClick={disableClick}
        zIndex={zIndex}
        blur={blur}>
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
              ref={modalRef}
              {...rest}>
              <button
                className={`base-close-button`}
                data-testid="close-button"
                onClick={() => handleOnClose()}
                role="button"
                aria-label="Close"
                title="Close"
                type="button">
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
