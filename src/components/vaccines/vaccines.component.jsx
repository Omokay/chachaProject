import React, {useContext, useEffect} from 'react';
import DashHeader from "../header/header.component";
import {StrapiContext} from "../../context/processContext";
import axios from "axios";
import {baseUrl} from "../../httpRequest/axios";
import jwtCookie from 'js-cookie';
import CustomButton from "../CustomButton/customButton.component";
import VaccineModal from "../vaccineModal/vaccineModal.component";
import Alerts from "../Alerts/alerts.component";
import VaccineTable from "../vaccineTable/vaccineTable.component";

const Vaccines = () =>  {
    const {immunization, setImmunization, setInfo, info, mod, setError, setMod, error} = useContext(StrapiContext);
    const jwt = jwtCookie.get('authCookie');

    useEffect(() => {
        axios.get(`${baseUrl}immunization-types`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        }).then((res) => {
            const {data} = res;
            console.log(data);
            setImmunization(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleModal = () => {
         setMod(true);
    };

    // Handle Error Messages
    const handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            setError(null);
            setMod(false);
            setInfo(null);
        }
        setError(null);
        setInfo(null);
    };

    return (
        <>
            <DashHeader>
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
                                }}>Immunization & Vaccines</h5>

                                <CustomButton
                                    buttonName='Add vaccine'
                                    type='button'
                                    width='300px'
                                    color='#5f2626'
                                    handleButton={handleModal}
                                />

                                {
                                    (mod) ? <VaccineModal /> : ''
                                }

                            </div>

                            {
                                (immunization && immunization ? <VaccineTable /> : (immunization === []) ? <h4>No available vaccines</h4> :
                                    <h4>Loading...</h4>)
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

export default Vaccines;
