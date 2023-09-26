'use client';

import { useDarkMode } from 'usehooks-ts';
import { Label } from './FormControl/Label';
import ToggleSwitch from './ToggleSwitch';
import { useEffect } from 'react';

const ToggleDarkMode = () => {
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    const root = document.querySelector(':root');
    console.log(root);
    if (isDarkMode) {
      root?.classList?.add('dark');
      root?.classList?.remove('light');
    } else {
      root?.classList?.remove('dark');
      root?.classList?.add('light');
    }
  }, [isDarkMode]);

  return (
    <div className="list-switch">
      <Label htmlFor="is-darkmode">Darkmode</Label>
      <ToggleSwitch
        id="is-darkmode"
        name="is-darkmode"
        checked={isDarkMode}
        onChange={() => toggle()}
      />
    </div>
  );
};

export default ToggleDarkMode;
