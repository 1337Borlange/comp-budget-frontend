'use client';

import { useDarkMode } from 'usehooks-ts';
import { Label } from './FormControl/Label';
import ToggleSwitch from './ToggleSwitch';

const ToggleDarkMode = () => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode();

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
