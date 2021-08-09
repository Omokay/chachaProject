import React, {useContext, useEffect} from 'react';
import {StrapiContext} from "../../context/processContext";
import DashHeader from "../header/header.component";
import {baseUrl} from "../../httpRequest/axios";
import CollapsibleTable from "../patientTable/muiTable.component";
import axios from 'axios';
import jwtCookie from 'js-cookie';
import CustomButton from "../CustomButton/customButton.component";
import PatientModal from "../patientModal/patientModal.component";
import Alerts from "../Alerts/alerts.component";
import CustomInput from "../InputComp/inputComp.component";

const Patients = () => {

    const {patients, setPatients, setImmunization,
        mod, setMod, setInfo, setError, info, error, searchInput,
        setIsEditPatient,
        setFirstname,  setPhone, setAge, setAddress, setCardno, setNextOfKeen,
        setNextOfKeenContact, setGender, setSelectedImmunization, setSurname} = useContext(StrapiContext);

    const jwt = jwtCookie.get('authCookie');


    useEffect(() => {
        axios.get(`${baseUrl}patients`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        }).then((res) => {
            const {data} = res;
            // console.log(data);
            setPatients(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}immunization-types`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        }).then((res) => {
            const {data} = res;
            // console.log(data);
            setImmunization(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleModal =  () => {
        setIsEditPatient(null);
        setMod(true);
    };

    // Handle Error Messages
    const handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            setError(null);
            setMod(false);
            setInfo(null);
            setIsEditPatient('');

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
        setError(null);
        setInfo(null);
    };


    return (
        <>
            <DashHeader hasSearch='true'>

                <div className='container-fluid'>
                    <div className='header'>

                    </div>
                    <div className="card"
                         style={{
                             width: '100%',
                             height: 'auto',
                             padding: '20px 0',
                         }}
                    >

                        <div className="card-body">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <h5 style={{
                                    paddingLeft: '15px',
                                    fontWeight: '500',
                                    textAlign: 'left',
                                }}>Patient Records</h5>

                                <CustomButton
                                    buttonName='Add patient'
                                    type='button'
                                    width='300px'
                                    color='#5f2626'
                                    handleButton={handleModal}
                                />

                                {
                                    (mod) ? <PatientModal /> : null
                                }
                            </div>

                            {
                                (patients && patients === []) ?
                                    <h5>No patients records available</h5> :
                                    (patients && patients.length > 0) ? <CollapsibleTable /> :  <h5>Loading...</h5>
                            }
                        </div>
                    </div>

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
            </DashHeader>
        </>
    )
};

export default Patients;
