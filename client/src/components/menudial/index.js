import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import HelpIcon from '@mui/icons-material/Help';


const actions = [
  { icon: <VolumeUpIcon />, name: 'Music' },
  { icon: <HelpIcon />, name: 'Help' },
];

export default function BasicSpeedDial() {
  return (
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
  );
}