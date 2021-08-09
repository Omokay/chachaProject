import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {StrapiContext} from "../../context/processContext";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CustomInput from "../InputComp/inputComp.component";
import DurationSelect from "../DurationSelect/simpleSelect.component";
import CustomButton from "../CustomButton/customButton.component";
import jwtCookie from "js-cookie";
import axios from "axios";
import {baseUrl} from "../../httpRequest/axios";
import {hideLoader, showLoader} from "../Loader/loader.component";


const useStyles = makeStyles(() =>  ({
    grouping: {
        width: '476px',
        display: 'flex',
        padding: '0',
        margin: '5px auto',
        justifyContent: 'space-between',
    },
    ml: {
        margin: '10px 0',
    }
}));

const VaccineModal = () => {
    const classes = useStyles();
    const jwt = jwtCookie.get('authCookie');



    const  {mod, setMod, setError, setInfo, duration, setDuration,
        vaccineName, setVaccineName, vaccineCode, setVaccineCode, vaccineDesc,
        setVaccineDesc, setVaccineToEdit,
        isEditVaccine, setIsEditVaccine} = useContext(StrapiContext);

    // Check modal is for new addition or modification of existing  data
    useEffect(() => {
         if (isEditVaccine) {
             try {
                 axios.get(`${baseUrl}immunization-types/${isEditVaccine}`, {
                     headers: {
                         'Authorization': `Bearer ${jwt}`,
                     }
                 }).then((res) => {
                     const {data} = res;

                     setVaccineToEdit(data);
                     setVaccineName(data['immunization_type']);
                     setVaccineCode(data['immunization_code']);
                     setVaccineDesc(data['description']);
                     setDuration(data['duration']);
                 });
             } catch(err) {
                 if (err) {
                     setError('Something went wrong, please try again');
                 }
             }
         } else {
             return;
         }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },  [])



    const handleVaccineName = (e) => {
        setVaccineName(e.target.value);
    }

    const handleVaccineCode = (e) => {
        setVaccineCode(e.target.value);
    }

    const handleDescription = (e) => {
        setVaccineDesc(e.target.value);
    }

    const createVaccine = async () => {
        showLoader();
        try {
            await axios.post(`${baseUrl}immunization-types`, {
                'immunization_type': vaccineName,
                'description': vaccineDesc,
                'immunization_code': vaccineCode,
                'duration': duration,
            }, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                }
            }).then((res) => {
                if(res.status === 200) {
                    hideLoader();
                    setInfo('Vaccine has been added')

                } else {
                    hideLoader();
                    setVaccineName('');
                    setVaccineCode('');
                    setVaccineDesc('');
                    setDuration('');
                    setInterval(() => setMod(false), 4000)
                }

            });
        } catch(err) {
            if (err) {
                setError('Something went wrong, please try again');
            }
        }
    }

    const updateVaccine = async () => {
        showLoader();
        try {
            await axios.put(`${baseUrl}immunization-types/${isEditVaccine}`, {
                'immunization_type': vaccineName,
                'description': vaccineDesc,
                'immunization_code': vaccineCode,
                'duration': duration,
            }, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                }
            }).then((res) => {
                if(res.status === 200) {
                    hideLoader();
                    setInfo('Vaccine has been update')

                } else {
                    hideLoader();
                    setVaccineName('');
                    setVaccineCode('');
                    setVaccineDesc('');
                    setDuration('');
                    setIsEditVaccine('');
                    setVaccineToEdit([]);
                    setInterval(() => setMod(false), 4000)
                }

            });
        } catch (err) {
            if (err) {
                setError('Something went wrong, please try again');
            }
        }
    }

    const validate = async () => {
        if (vaccineName.length < 1 || vaccineCode.length < 1 || duration.length < 1) {
            setError('Some fields are missing');
        } else if (typeof vaccineName !== 'string') {
            setError('Vaccine name must be a string');
        } else if (typeof vaccineCode !== 'string') {
            setError('vaccine Code must be a string');
        } else if (isEditVaccine) {
            await updateVaccine();
        }
        else {
            await createVaccine();
        }

    }
    return (
        <>
            <Dialog
                open={mod}
                onClose={() => setMod(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth="lg"
                style={{
                    // minHeight: '500px',
                }}
            >
                {/*<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>*/}

                <DialogContent>

                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{
                    width: '500px',
                    height: 'auto',
                    margin: '0 auto',
                    textAlign: 'center',
                    paddingBottom: '80px',
                }}>
                    <div className='row text-center'
                         style={{margin: '0  auto',}}>
                        <h4 style={{
                            paddingBottom: '20px',
                            justifyContent: 'center',
                        }}>Add a new vaccine</h4>

                        <CustomInput
                            name='vaccineName'
                            handleChange={handleVaccineName}
                            type='text'
                            width='476px'
                            value={vaccineName}
                            label='Vaccine Name' />

                        <div className={classes.grouping}>

                                <CustomInput
                                    name='vaccineCode'
                                    handleChange={handleVaccineCode}
                                    type='text'
                                    width='224px'
                                    value={vaccineCode}
                                    label='Vaccine Code' />

                                <DurationSelect
                                    arr={['Monthly', 'Quaterly', 'Yearly']}
                                    width='224px'
                                    label='Duration'/>

                        </div>

                        <CustomInput
                            name='vaccineDesc'
                            handleChange={handleDescription}
                            type='text'
                            width='476px'
                            value={vaccineDesc}
                            label='Description' />

                        {/*<CustomInput  width='300px' label='Account Number' />*/}
                        <CustomButton buttonName='Submit' width='476px' color='#5f2626' handleButton={validate}/>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default VaccineModal;
