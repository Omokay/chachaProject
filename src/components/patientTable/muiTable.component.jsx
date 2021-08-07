import React, {useContext} from 'react';
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
                                           <TableCell align="right">Immunization Code</TableCell>
                                           <TableCell align="right">Duration</TableCell>
                                           <TableCell align="right">Date</TableCell>
                                       </TableRow>
                                   </TableHead>

                                   <TableBody>
                                       {
                                           (requests['immunization_schedules'] && requests['immunization_schedules'].map((data) => (
                                               <TableRow key={data.id}>
                                                   <TableCell component="th" scope="row">
                                                       {data['immunization_type']}
                                                   </TableCell>
                                                   <TableCell align="right">
                                                       {data['immunization_code']}
                                                   </TableCell>
                                                   <TableCell align="right">
                                                       {data['duration']}
                                                   </TableCell>
                                                   <TableCell align="right">
                                                       {formatDate(data['created_at'])}
                                                   </TableCell>
                                               </TableRow>
                                           )))
                                       }
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
