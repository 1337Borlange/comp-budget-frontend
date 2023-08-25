'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AngleDownIcon } from './Icons/AngleDownIcon';
import {
  AnimatePresence,
  MotionConfig,
  MotionProps,
  Variants,
  motion,
} from 'framer-motion';
import Button from './Button';
import '../styles/components/dropmenu.scss';

const menu = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
} satisfies Variants;

const item = {
  variants: {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1 },
  },
  transition: { opacity: { duration: 0.2 } },
} satisfies MotionProps;

export type DropMenuButtonProps = {
  label: string | React.ReactElement;
  id: string;
  fromRight?: boolean;
};

const MAX_HEIGHT = 300;

const DropMenuButton: React.FunctionComponent<
  DropMenuButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ label, id, fromRight = false, children, ...rest }) => {
  const [expanded, setExpanded] = useState(false);
  const [fromTop, setFromTop] = useState<boolean>(true);
  const [dropMaxHeight, setDropMaxHeight] = useState<number>(MAX_HEIGHT);

  const dropMenuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<any>(null);

  const handleClickOutside = (e: any) => {
    if (dropMenuRef.current && !dropMenuRef.current.contains(e.target)) {
      setExpanded(false);
    }
  };

  const getElementFromTop = useCallback((): void => {
    if (dropMenuRef.current && buttonRef.current) {
      const dropRect = dropMenuRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonFromTop = buttonRect.top + buttonRect.height;
      const { clientHeight } = document.documentElement;
      const downwards = dropRect.height + buttonFromTop < clientHeight;
      setFromTop(downwards);
      //   const inUpperHalf = dropRect.top < clientHeight / 2 - dropRect.height / 2
      let maxHeight = MAX_HEIGHT;
      //   setFromTop(inUpperHalf)
      if (buttonRect.top > 0 && buttonFromTop < clientHeight) {
        // const margin = 16
        const setHeight = downwards
          ? clientHeight - (buttonFromTop + dropRect.height)
          : buttonFromTop;
        maxHeight = setHeight > maxHeight ? maxHeight : setHeight; // - margin
      }
      setDropMaxHeight(maxHeight);
    }
  }, []);

  const inlineStyle: any = useMemo(
    () => ({
      ['--dropmenu-max-height']: `${dropMaxHeight}px`,
    }),
    [dropMaxHeight]
  );

  useEffect(() => {
    if (expanded) {
      getElementFromTop();
      window.addEventListener('scroll', getElementFromTop);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('scroll', getElementFromTop);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded, getElementFromTop]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`dropmenu-wrapper ${fromRight ? 'from-right' : ''} ${
          fromTop ? 'from-top' : 'from-bottom'
        }`}
        style={inlineStyle}
      >
        {typeof label === 'string' ? (
          <Button
            type="button"
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setExpanded(!expanded)}
            ref={buttonRef}
            {...rest}
          >
            {label}
          </Button>
        ) : (
          <div
            className="dropdown-button"
            role="button"
            aria-haspopup="true"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => {
              setExpanded(!expanded);
            }}
            ref={buttonRef}
          >
            <AngleDownIcon className={`${expanded ? 'expanded' : ''}`} />
            {label}
          </div>
        )}
        <AnimatePresence>
          <motion.ul
            key={`list-${id}`}
            animate={expanded ? 'open' : 'closed'}
            initial="closed"
            exit="closed"
            variants={menu}
            role="menu"
            id={id}
            aria-label={typeof label === 'string' ? label : id}
            ref={dropMenuRef}
          >
            {React.Children.map(children, (child) => {
              if (!child) return null;
              return <motion.li {...item}>{child}</motion.li>;
            })}
            {/* {children} */}
          </motion.ul>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

export default DropMenuButton;
