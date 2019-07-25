import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { pwmAvant } from '../DrivingMode/DriveClientWebSocket'

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));


export default function DiscreteSliderAvant() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        PWM avant
      </Typography>
      <Slider
        defaultValue={300}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={300}
        max={320}
        onChange={(e,val) => pwmAvant(val)}
      />
      <div className={classes.margin} />
 

    </div>
  );
}


