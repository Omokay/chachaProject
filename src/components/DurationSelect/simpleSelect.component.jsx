import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {StrapiContext} from "../../context/processContext";

const useStyles = makeStyles(() => ({
    formControl: {
        display: 'flex',
        width: 234,
        labelWidth: 101,
        marginTop: '8px',
        marginLeft: '0px',
    },
}));

export default function DurationSelect({arr, label}) {
    const {duration, setDuration, isEditVaccine, vaccineToEdit} = useContext(StrapiContext);
    const classes = useStyles();

    const handleDuration = (event) => {
        setDuration(event.target.value);
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={duration}
                    onChange={handleDuration}
                    label={label}
                    labelWidth={120}
                >
                    {
                        arr.map((menu, index) => (
                            <MenuItem key={index} value={menu}>{menu}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    );
}
