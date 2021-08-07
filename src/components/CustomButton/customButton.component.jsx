import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const CustomButton = ({ buttonName, type, handleButton, width, textFont, color, disabled, padding }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                disabled ? <Button
                        type={type}
                        onClick={handleButton}
                        style={{
                            backgroundColor: color,
                            color: 'white',
                            minWidth: width,
                            maxWidth: width,
                            height: '250px'
                        }}
                        variant='contained' size='large'
                        disabled
                    >
                        {buttonName}
                    </Button> :
                    <Button
                        type={type}
                        onClick={handleButton}
                        style={{
                            backgroundColor: color,
                            color: 'white',
                            fontSize: textFont,
                            padding: padding,
                            minWidth: width,
                            maxWidth: width,
                            height: '40px'
                        }}
                        variant='contained' size='large'
                    >
                        {buttonName}
                    </Button>
            }
        </div>
    );
};


export default CustomButton;
