import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const CustomInput = ({ width, key, label, name, type, placeholder, defaultValue, handleChange, value}) => {


    const useStyles = makeStyles((theme ) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: width,
                height: 50
            },
        },
    }));

    const classes = useStyles();

    return (
        <div className='text-center'>
            <form className={classes.root} autoComplete='off'>
                <TextField
                    key={key}
                    value={value}
                    onChange={handleChange}
                    id="outlined-basic"
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    name={name}
                    onKeyPress={(e)=>{e.key === 'Enter' && e.preventDefault();}}
                    variant="outlined"

                    required
                />


            </form>
        </div>
    )
};

export default CustomInput;
