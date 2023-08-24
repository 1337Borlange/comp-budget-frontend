'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import '../styles/components/tabs.scss';
// import TabItem from '../TabItem';

export type TabProps = {
  children: React.ReactNode[];
  defaultActiveIndex?: number;
  spaceEvenly?: boolean;
  onTabChange?: (idx: number) => void;
  className?: string;
};

export const Tabs = ({
  children,
  onTabChange,
  defaultActiveIndex = 0,
  spaceEvenly = false,
  className,
}: TabProps) => {
  // Dependant on children

  const [activeTab, setActiveTab] = useState<number>(defaultActiveIndex);

  const isActive = (idx: number): boolean => activeTab === idx;

  const handleClick = (idx: number) => {
    setActiveTab(idx);
    if (typeof onTabChange === 'function') {
      onTabChange(idx);
    }
  };

  if (!children) return null;
  return (
    <div>
      <ul
        className={`tabs base-tabs-headers ${
          spaceEvenly ? 'space-evenly' : ''
        } ${className}`}
        role="tablist"
      >
        {children &&
          children.map((child: any, index: number) => (
            <li
              className={`${isActive(index) ? 'active' : ''} ${
                child.props.disabled ? 'disabled' : ''
              }`}
              key={child.props.eventKey}
            >
              <button
                disabled={child.props.disabled}
                aria-selected={isActive(index)}
                aria-controls={`${child.props.eventKey}-content`}
                id={`${child.props.eventKey}-control`}
                type="button"
                role="tab"
                onClick={() => handleClick(index)}
              >
                {child.props.title}
              </button>
              {/* 
              {child.props.disabled && <span>{child.props.title}</span>} */}
            </li>
          ))}
      </ul>
      {children && (
        <AnimatePresence>
          {children.map((item: any, index: number) => (
            <TabItem
              key={`tabitem-${item.props.eventKey}`}
              {...item.props}
              visible={isActive(index)}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export type TabItemProps = {
  children: any;
  eventKey: string;
  title: string;
  disabled?: boolean;
  visible?: boolean;
};

const tabVariants = {
  closed: { y: 16, opacity: 0 },
  open: { y: 0, opacity: 1 },
};

export const TabItem = ({
  children,
  visible = false,
  eventKey,
}: // title,
TabItemProps) => {
  if (!visible) {
    return null;
  }
  return (
    <motion.div
      animate={visible ? 'open' : 'closed'}
      initial="closed"
      exit="closed"
      variants={tabVariants}
      role="tabpanel"
      id={`${eventKey}-content`}
      aria-labelledby={`${eventKey}-control`}
    >
      {children}
    </motion.div>
  );
};
