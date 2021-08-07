import React, {useContext} from 'react';
import {StrapiContext} from "../../context/processContext";


import {
    Avatar,
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
}));

const VaccineTable = () => {

    const {immunization, setImmunization, info, error, setInfo, setError, mod, setMod} = useContext(StrapiContext);


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
    // const handleDelete = (procId) => {
    //
    //     if (!procId) {
    //         return;
    //     }
    //     let currentProcessState = processes;
    //     setProcesses(processes.filter(proc => proc.Id !== process));
    //     console.log(process);
    //
    //     httpDelete(`${baseUrl}${delete_process}/${procId}`).then(res => {
    //         if (!res.success) {
    //             // console.log(currentProcessState);
    //             setProcess(currentProcessState);
    //             setError(res.status);
    //         } else {
    //             setInfo(res.status);
    //         }
    //     });
    // }
    const handleAlert = async (event, reason) => {
        if (reason === 'clickaway') {
            await setError(null);
            await setInfo(null);
        }
        await setError(null);
        await setInfo(null);
    };


    return (
        <div>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>Immunization Type</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Immunization Code</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Duration</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {immunization.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row['id']}>
                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">{row['immunization_type']}</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">{row['immunization_code']}</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">{row['duration']}</Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">{row['description']}</Typography>
                                </TableCell>
                                {/*<TableCell>*/}
                                {/*    <Grid container style={{*/}
                                {/*        width: '300px',*/}
                                {/*    }}>*/}
                                {/*        <Grid item lg={6}>*/}
                                {/*            <Button*/}
                                {/*                onClick={() => gotoSchedules(row.Id)}*/}
                                {/*                style={{*/}
                                {/*                    width: 'auto',*/}
                                {/*                }}*/}
                                {/*                variant="outlined"*/}
                                {/*                size="small"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.margin}>*/}
                                {/*                View Schedules*/}
                                {/*            </Button>*/}
                                {/*        </Grid>*/}
                                {/*        <Grid item lg={6}>*/}
                                {/*            <Button*/}
                                {/*                onClick={() => handleDelete(row.Id)}*/}
                                {/*                style={{*/}
                                {/*                    width: '114px',*/}
                                {/*                }}*/}
                                {/*                variant="outlined"*/}
                                {/*                size="small"*/}
                                {/*                color="primary"*/}
                                {/*                className={classes.margin}>*/}
                                {/*                Remove*/}
                                {/*            </Button>*/}

                                {/*        </Grid>*/}
                                {/*    </Grid>*/}
                                {/*</TableCell>*/}
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
