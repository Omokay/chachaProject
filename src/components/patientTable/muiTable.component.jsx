import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {StrapiContext} from "../../context/processContext";
import {formatDate} from "../../utils/helper.utlils";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {baseUrl} from "../../httpRequest/axios";
import jwt from "js-cookie";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    margin: {
    margin: theme.spacing(1),
},
    tableHeader: {
        fontWeight: '700',
        backgroundColor: '#cfcdcd',
        color: '#5f2626',
    },
    collapsePane: {
        width: '100%',
    }
}));

function Row(props) {
    const { requests } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const {patients, setPatients, setInfo, searchInput, setError, setMod, setIsEditPatient} = useContext(StrapiContext);
    // const  [filteredList, setFilteredList] = useState([]);

    // Handle Search based rendering
    // const searchPatients = () => {
    //     let currentPatients = patients;
    //     if (searchInput.length > 0 && patients) {
    //         let searchResult  = patients.filter((patient) => {
    //             patient.card_no.toLowerCase().includes(searchInput.toLowerCase())  ||
    //             patient.surname.toLowerCase().includes(searchInput.toLowerCase())  ||
    //             patient.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
    //             patient.phone.includes(searchInput) ||  patient.next_of_keen.toLowerCase().includes(searchInput.toLowerCase());
    //         });
    //         if (searchResult)  {
    //             setPatients(searchResult);
    //         }
    //     }
    //
    // }

    const editPatient = (patientId) => {
        if (!patientId) {
            return;
        }
        setIsEditPatient(patientId);
        setMod(true);
    }

    const deletePatient = (patientId) => {
        if (!patientId) {
            return;
        }
        let currentPatientState = patients;
        setPatients(patients.filter(patient => patient['id'] !== patientId));

        try {
            axios.delete(`${baseUrl}patients/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${jwt.get('authCookie')}`,
                }
            }).then(res => {
                if (res.status === 200) {
                    setInfo('Patients record has been successfully deleted');
                } else {
                    setPatients(currentPatientState);
                    setError('An error occured while attempting to delete a patient record');
                }
            });
        } catch(err) {
            if (err) {
                setError('Something went wrong, please try again');
            }
        }
    }

    return (
           <React.Fragment>

               <TableRow className={classes.root}>
                   <TableCell>
                       <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                           {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                       </IconButton>
                   </TableCell>
                   <TableCell component="th" scope="row">{requests['card_no']} </TableCell>
                   <TableCell align="right">{requests['surname']}</TableCell>
                   <TableCell align="right">{requests['firstname']}</TableCell>
                   <TableCell align="right">{requests['age']}</TableCell>
                   <TableCell align="right">{requests['phone']}</TableCell>
               </TableRow>
               <TableRow>
                   <TableCell className={classes.tableHeader} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                       <Collapse in={open} timeout="auto" unmountOnExit>
                           <Box margin={3}>
                               <Typography variant="h6" gutterBottom component="div">
                                   Patient Immunization Records
                               </Typography>
                               <Table size="medium" aria-label="purchases">
                                   <TableHead>
                                       <TableRow>
                                           <TableCell>Immunization Type</TableCell>
                                           <TableCell>Immunization Code</TableCell>
                                           <TableCell>Duration</TableCell>
                                           <TableCell>Date</TableCell>
                                       </TableRow>
                                   </TableHead>


                                   <TableBody>
                                       {
                                           (requests['immunization_schedules'] && requests['immunization_schedules'].map((data) => (
                                               <TableRow key={data.id}>
                                                   <TableCell component="th" scope="row">
                                                       {data['immunization_type']}
                                                   </TableCell>
                                                   <TableCell>
                                                       {data['immunization_code']}
                                                   </TableCell>
                                                   <TableCell>
                                                       {data['duration']}
                                                   </TableCell>
                                                   <TableCell>
                                                       {formatDate(data['created_at'])}
                                                   </TableCell>

                                               </TableRow>

                                           )))
                                       }
                                       <TableRow>

                                           <TableCell>
                                               <Typography variant="h6" gutterBottom component="div">
                                                   Patient Data Actions
                                               </Typography>
                                               <Grid container style={{
                                                   width: '300px',
                                               }}>

                                                   <Grid items lg={6} sm={6}>
                                                       <Button
                                                           onClick={() => editPatient(requests.id)}
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
                                                   <Grid items lg={6} sm={6}>
                                                       <Button
                                                           onClick={() => deletePatient(requests.id)}
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
                                   </TableBody>
                               </Table>
                           </Box>
                       </Collapse>
                   </TableCell>
               </TableRow>
           </React.Fragment>
    );
}


export default function CollapsibleTable() {


    const classes = useStyles();
    const {patients} = useContext(StrapiContext);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead className={classes.tableHeader}>
                    <TableRow>
                        <TableCell />
                        <TableCell className={classes.tableHeader}>Card No</TableCell>
                        <TableCell align="right" className={classes.tableHeader}>Surname</TableCell>
                        <TableCell align="right" className={classes.tableHeader}>Firstname</TableCell>
                        <TableCell align="right" className={classes.tableHeader}>Age</TableCell>
                        <TableCell align="right" className={classes.tableHeader}>Phone</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients && patients.map((requests) => (
                        <Row key={requests.id} requests={requests} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
