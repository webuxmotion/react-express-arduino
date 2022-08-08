import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useContext, useEffect, useState } from 'react';
import { Context } from './Context';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Header() {
  const { data } = useContext(Context);
  const [checked, setChecked] = useState(false);

  const handleOn = () => {
    fetch('/led')
  }

  const handleOff = () => {
    fetch('/off')
  }

  const handleChange = (prop) => {
    if (prop.target.checked) {
      handleOn();
    } else {
      handleOff();
    }
  }

  useEffect(() => {
    if (data?.sensor) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [data]);

  return (
    <div>
      <Switch checked={checked} onChange={handleChange} {...label} defaultChecked color="warning" />
      
      <Button onClick={handleOn} variant="contained">On</Button>
      <Button onClick={handleOff} variant="outlined">Off</Button>
   
      <h2>Potentiometr: {data?.potentiometr}</h2>
   </div>
  );
}

export default Header;
