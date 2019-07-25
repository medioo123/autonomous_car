import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import { pwmArriere } from '../DrivingMode/DriveClientWebSocket'

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));


export default function DiscreteSliderArriere() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        PWM arriere
      </Typography>
      <Slider
        defaultValue={265}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={265}
        max={285}
        onChange={(e,val) => pwmArriere(val)}
      />
      <div className={classes.margin} />
 

    </div>
  );
}


