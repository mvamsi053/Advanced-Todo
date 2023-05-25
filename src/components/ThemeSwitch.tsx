import React from 'react';
import { useMantineColorScheme } from '@mantine/core';
import { BsMoonFill, BsFillSunFill } from 'react-icons/bs';
function ThemeSwitch(): React.JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  console.log('', colorScheme);
  return (
    <div
      onClick={() => toggleColorScheme()}
      title={`${dark ? 'switch to light mode' : 'switch to dark mode'}`}
      className='cursor-pointer'
    >
      {dark ? <BsFillSunFill size='1.1rem' /> : <BsMoonFill size='1.1rem' />}
    </div>
  );
}

export default ThemeSwitch;
