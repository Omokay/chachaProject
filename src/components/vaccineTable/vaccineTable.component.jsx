import React, {useContext} from 'react';
import {StrapiContext} from "../../context/processContext";
import axios from 'axios';


import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Alerts from "../Alerts/alerts.component";
import Button from "@material-ui/core/Button";
import {baseUrl} from "../../httpRequest/axios";
import jwt from "js-cookie";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 4,
        margin: '10px 10px',
        width: '100%',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#EFEFEF',
        // theme.palette.primary.dark
        color: '#0A1931',
        margin: '0 auto',
    },
    avatar: {
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: '#1a1916',
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        paddingTop: '10px',
        color: 'rgba(0, 0, 0, 0.54)',
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 4,
        padding: '3px 10px',
        display: 'inline-block'
    },
    margin: {
        margin: theme.spacing(1),
    },
    marrgin: {
        margin: '8px auto',
        width: '115px',
    },
}));

const VaccineTable = () => {

    const {immunization, setImmunization,
        info, error, setInfo,
        setError, setMod,
        setIsEditVaccine} = useContext(StrapiContext);


    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };


    // THIS IS AN OPTIMISTIC UPDATE FIRE.....AFFECTING THE STATE BEFORE THE RESPONSE FROM THE SERVER
    const deleteVaccine = (vaccineId) => {

        if (!vaccineId) {
            return;
        }
        let currentVaccineState = immunization;
        setImmunization(immunization.filter(vaccine => vaccine['id'] !== vaccineId));

        axios.delete(`${baseUrl}immunization-types/${vaccineId}`, {
            headers: {
                Authorization: `Bearer ${jwt.get('authCookie')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                setInfo('Vaccine has been successfully deleted');
            } else {
                setImmunization(currentVaccineState);
                setError('An error occured while attempting to delete vaccine');
            }
        });
    }

    const editVaccine = (vaccineId) => {
        if (!vaccineId) {
            return;
        }
        setIsEditVaccine(vaccineId);
        setMod(true);

    };

    const handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
             setError(null);
             setInfo(null);
             setIsEditVaccine('');

        }
         setError(null);
         setInfo(null);
         setIsEditVaccine('');
    };


    return (
        <div>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Immunization Type</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Duration</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {immunization.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row['id']}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">{row['immunization_type'] + '  -  ' +row['immunization_code']}</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">{row['duration']}</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">{row['description']}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Grid container style={{
                                        width: '300px',
                                    }}>
                                        <Grid items lg={12} sm={12}>
                                            <Button
                                                onClick={() => editVaccine(row.id)}
                                                style={{
                                                    width: '114px',
                                                }}
                                                variant="outlined"
                                                size="small"
                                                color="default"
                                                className={classes.marrgin}>
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid items lg={12} sm={12}>
                                            <Button
                                                onClick={() => deleteVaccine(row.id)}
                                                style={{
                                                    width: '114px',
                                                }}
                                                variant="outlined"
                                                size="small"
                                                color="default"
                                                className={classes.marrgin}>
                                                Delete
                                            </Button>

                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20]}
                            component="div"
                            count={immunization.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>

            {
                (error !== null) ?
                    <Alerts
                        open={true}
                        severity='error'
                        duration='2000'
                        errorMessage={error}
                        handleClose={handleAlert} /> :
                    (info !== null) ?

                        <Alerts
                            open={true}
                            severity='success'
                            duration='3000'
                            errorMessage={info}
                            handleClose={handleAlert}

                        /> : null
            }
        </div>
    );
}

export default VaccineTable;
