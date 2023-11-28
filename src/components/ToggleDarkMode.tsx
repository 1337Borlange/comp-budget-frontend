'use client';

import { useDarkMode } from '../lib/hooks';
import { Label } from './FormControl/Label';
import ToggleSwitch from './ToggleSwitch';

const ToggleDarkMode = () => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <div className="list-switch">
      <Label htmlFor="is-darkmode">Dark mode</Label>
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
