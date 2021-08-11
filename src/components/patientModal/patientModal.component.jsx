import React, {useContext, useEffect} from 'react';
import {StrapiContext} from '../../context/processContext';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CustomButton from '../CustomButton/customButton.component';
import './moddal.styles.scss';
import CustomInput from "../InputComp/inputComp.component";
import MultiSelect from "../MultipleSelect/multipleSelect.component";
import SimpleSelect from "../GenderSelect/simpleSelect.component";
import {baseUrl} from "../../httpRequest/axios";
import {showLoader, hideLoader} from "../Loader/loader.component";
import axios from 'axios';
import jwtCookie from 'js-cookie';




const PatientModal = ({closeModal}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {setError, mod, setMod,
            setSurname, setFirstname, setAge,
            setPhone, setAddress, setNextOfKeen,
            setNextOfKeenContact, setCardno, surname, setGender,
            selectedImmunization, isEditPatient, setPatientToEdit,
            firstname, age, phone, address, gender, cardno,  nextOfKeen, nextOfKeenContact, setSelectedImmunization, setInfo} = useContext(StrapiContext);

    const jwt = jwtCookie.get('authCookie');


    useEffect(() => {
        if (isEditPatient !== null) {
            axios.get(`${baseUrl}patients/${isEditPatient}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                }
            }).then((res) => {
                const {data} = res;


                // console.log(data);

                setPatientToEdit(data);
                setSurname(data['surname']);
                setFirstname(data['firstname']);
                setAge(data['age']);
                setAddress(data['address']);
                setCardno(data['card_no']);
                setNextOfKeen(data['next_of_keen']);
                setNextOfKeenContact(data['next_of_keen_contact']);
                setPhone(data['phone']);
                setGender(data['gender']);
                setSelectedImmunization(data['immunization_schedules']);
            });
        } else {

            setSurname('');
            setFirstname('');
            setAge('');
            setAddress('');
            setCardno('');
            setNextOfKeen('');
            setNextOfKeenContact('');
            setPhone('');
            setGender('');
            setSelectedImmunization([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSurname = (e) => {
        setSurname(e.target.value);
    }
    const handleCardno = (e) => {
        setCardno(e.target.value);
    }
    const  handleFirstname =  (e) =>  {
        setFirstname (e.target.value);
    }
    const handleAge = (e)  =>  {
        setAge(e.target.value);
    }
    const handleAddress =  (e) => {
        setAddress(e.target.value);
    }
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }
    const handleNextok = (e) => {
        setNextOfKeen(e.target.value);
    }
    const handleNextContact = (e) => {
        setNextOfKeenContact(e.target.value);
    }

    const handleSubmit = async () => {
       showLoader();
       try  {
           await axios.post(`${baseUrl}patients`, {
               'card_no': cardno,
               'surname': surname,
               'firstname':  firstname,
               'age': age,
               'gender': gender,
               'phone': phone,
               'address': address,
               'next_of_keen': nextOfKeen,
               'next_of_keen_contact': nextOfKeenContact,
               'immunization_schedules':  selectedImmunization,
           }, {
               headers: {
                   Authorization: `Bearer ${jwt.get('authCookie')}`,
               }
           }).then((res)  => {
               if(res.status === 200) {
                   hideLoader()
                   setInfo('Patient has been created');
                   setCardno('');
                   setSurname('');
                   setFirstname('');
                   setAge('');
                   setAddress('');
                   setPhone('');
                   setNextOfKeenContact('');
                   setNextOfKeen('');
                   setSelectedImmunization([]);
                   setInterval(() => setMod(false), 4000)
               } else {
                   hideLoader();
                   setError('Error encountered while attempting to create new patient')
               }
           })
       } catch(err) {
           if (err) {
               setError('Something went wrong, please try again');
           }
       }
    }

    const updatePatientData = async () => {
        showLoader();
        try {
            await axios.put(`${baseUrl}patients/${isEditPatient}`, {
                'card_no': cardno,
                'surname': surname,
                'firstname':  firstname,
                'age': age,
                'gender': gender,
                'phone': phone,
                'address': address,
                'next_of_keen': nextOfKeen,
                'next_of_keen_contact': nextOfKeenContact,
                'immunization_schedules':  selectedImmunization,
            }, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            }).then((res)  => {
                if(res.status === 200) {
                    hideLoader()
                    setInfo('Patient has been updated successfully');

                    setCardno('');
                    setSurname('');
                    setFirstname('');
                    setAge('');
                    setAddress('');
                    setPhone('');
                    setNextOfKeenContact('');
                    setNextOfKeen('');
                    setSelectedImmunization([]);
                    setInterval(() => setMod(false), 4000)
                } else {
                    hideLoader();
                    setError('Error encountered while attempting to update patient record')
                }
            })
        } catch (err) {
           if (err) {
               setError('Something went wrong');
           }
        }
    }
    // Run input validation for patient creation
    const checkValidation = async () => {
        if (surname.length < 1 ||
            firstname.length < 1 ||
            age === 0 || cardno.length < 1 ||
            address.length < 1 ||
            phone.length < 1 ||
            nextOfKeenContact.length < 1 ||
            nextOfKeen.length < 1 ) {
            setError('All fields are required');
        } else if (typeof phone !== 'string' || phone.length > 11) {
            setError('You entered an invalid phone number');
        } else if (typeof gender !== 'string' || ['Male', 'Female'].indexOf(gender) === -1){
            setError('Please choose a gender');
        }
        else if (typeof nextOfKeenContact !== 'string' || nextOfKeenContact.length > 11) {
            setError('Next of keen\'s contact is invalid');
        } else if (typeof surname !== 'string' || surname.length === 0) {
            setError('Input for surname is invalid');
        } else if (typeof firstname !== 'string' || firstname.length === 0) {
            setError('Firstname input is invalid');
        } else if (typeof age !== 'string' || age.length === 0) {
            setError('Age input is invalid')
        } else if (typeof cardno !== 'string' || cardno.length === 0) {
            setError('Card number is not valid');
        } else if (typeof address !== 'string' || address.length < 1) {
            setError('Invalid address was entered');
        } else if (isEditPatient) {
            await updatePatientData();
        }  else  {
            await handleSubmit();
        }
    }


    return (
        <div>
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
                        }}>Add a new patient</h4>

                        <CustomInput
                            name='cardno'
                            handleChange={handleCardno}
                            type='text'
                            width='476px'
                            value={cardno}
                            label='Patient Card Number' />

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '476px',
                        }}>

                            <CustomInput
                                name='surname'
                                handleChange={handleSurname}
                                width='230px'
                                type='text'
                                value={surname}
                                label='Surname' />

                            <CustomInput
                                name='firstname'
                                handleChange={handleFirstname}
                                width='230px'
                                type='text'
                                value={firstname}
                                label='Firstname' />
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '476px',
                        }}>
                            <CustomInput
                                name='age'
                                type='text'
                                value={age}
                                handleChange={handleAge}
                                width='230px'
                                label='Age' />

                        <SimpleSelect
                            arr={['Male', 'Female']}
                            width='244px'
                            label='Gender'/>
                    </div>

                        <CustomInput
                                     name='phone'
                                     handleChange={handlePhone}
                                     type='text'
                                     width='476px'
                                     value={phone}
                                     label='Phone number' />

                        <CustomInput
                            name='address'
                            handleChange={handleAddress}
                            type='text'
                            value={address}
                            width='476px'
                            label='Address' />

                        <CustomInput
                            name='nextofkeen'
                            handleChange={handleNextok}
                            type='text'
                            value={nextOfKeen}
                            width='476px'
                            label='Next of Keen' />

                        <CustomInput
                            name='nextofkeencontact'
                            handleChange={handleNextContact}
                            type='text'
                            value={nextOfKeenContact}
                            width='476px'
                            label='Next of Keen contact' />


                        <MultiSelect />
                        {/*<CustomInput  width='300px' label='Account Number' />*/}
                        <CustomButton buttonName='Submit' width='476px' color='#5f2626' handleButton={checkValidation}/>
                    </div>
                </DialogActions>
            </Dialog>

        </div>
    );
};


export default PatientModal;
