/* eslint-disable no-use-before-define */
import React, {useContext} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {StrapiContext} from "../../context/processContext";


const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: '20',
        },
        margin: '10px auto',
    },
}));

export default function MultiSelect() {
    const classes = useStyles();
    const {immunization, setSelectedImmunization} = useContext(StrapiContext);

    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-outlined"
                onChange={(event, value) => {
                    setSelectedImmunization(value);
                    // console.log(value);
                }}
                options={immunization}
                getOptionLabel={(option) => option['immunization_type'] + ' ' + option['immunization_code']}
                // defaultValue={[agentCodes[6]]}
                renderInput={(params) => (

                    <TextField
                        {...params}
                        label="Immunization"
                        placeholder="Immunization"
                        variant="outlined"
                    />
                )}
            />
        </div>
    );
}

