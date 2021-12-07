import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,

}));

export default function DirectionStack() {
  return (
    <div        style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Stack direction="row"
        divider={<Divider orientation="vertical"  flexItem />}
        spacing={2}
        sx={{ position: 'absolute', top: 20}}
        justifyContent = {'center'}
        >
        <Item>Player 1 Score: 0</Item>
        <Item>Player 2 Score: 0</Item>
        <Item>Player 3 Score: 0</Item>
        <Item>Player 4 Score: 0</Item>
      </Stack>
    </div>
  );
}