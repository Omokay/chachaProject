import React, {useState, useEffect} from 'react';
import DashHeader from "../header/header.component";
import {useHistory} from 'react-router-dom';

import {baseUrl} from "../../httpRequest/axios";
import axios from 'axios';
import jwtToken from 'js-cookie';

const Landing = () => {
    const [patientCount, setPatientCount] = useState(0);
    const [vaccineCount, setVaccineCount] = useState(0);

   const  jwt  = jwtToken.get('authCookie');
   const history = useHistory();

    useEffect(() =>  {
        axios.get(`${baseUrl}patients/count`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        }).then((res)  => {
            const  {data} = res;
            console.log(data);
            setPatientCount(data);

        }).catch((err) => {
            console.log(err);
        })

        axios.get(`${baseUrl}immunization-types/count`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        }).then((res)  => {
            const  {data} = res;
            console.log(data);
            setVaccineCount(data);

        }).catch((err) => {
            console.log(err);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const gotoPatients = () => {
        history.push('/patients');
    }
    const gotoVaccines = () => {
        history.push('/vaccines');
    }
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
                                    fontWeight: '600',
                                    textAlign: 'left',
                                }}>Welcome Admin!</h5>


                            </div>
                            <div  className='row'>
                                <div className='col-md-6'>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Number of Patients</h5>
                                            <h3 className="card-subtitle mb-2 text-muted">{patientCount ?  patientCount : '...'}</h3>
                                            <a href="#" onClick={gotoPatients} className="card-link">Learn more</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Number of Vaccines</h5>
                                            <h3 className="card-subtitle mb-2 text-muted">{(vaccineCount ? vaccineCount : '...')}</h3>
                                            <a href="#" onClick={gotoVaccines} className="card-link">Learn more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashHeader>
        </>
)
}

export default Landing;
