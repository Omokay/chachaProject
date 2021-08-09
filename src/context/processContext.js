import React, { createContext, useState } from 'react';
export const StrapiContext = createContext(null);

const StrapiContextProvider = ({ children }) => {
    const [mod, setMod] = useState(false);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState(null);
    const [patients, setPatients] = useState([]);
    const [immunization, setImmunization] = useState([]);

    const [searchInput, setSearchInput] = useState('');



    const [selectedImmunization, setSelectedImmunization] = useState([]);
    const [surname, setSurname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [nextOfKeen, setNextOfKeen] = useState('');
    const [cardno, setCardno] = useState('');
    const [nextOfKeenContact, setNextOfKeenContact] = useState('');

    const [isEditPatient, setIsEditPatient] = useState(null);
    const [patientToEdit, setPatientToEdit] = useState([]);


    const [vaccineName, setVaccineName] = useState('');
    const [vaccineCode, setVaccineCode] = useState('');
    const [vaccineDesc, setVaccineDesc] = useState('');
    const [duration, setDuration] = useState('');
    const [isEditVaccine, setIsEditVaccine] = useState(null);
    const  [vaccineToEdit, setVaccineToEdit] = useState([]);



    return (
        <StrapiContext.Provider
            value={{
                mod, setMod,
                error, setError,
                info, setInfo,
                patients, setPatients,
                immunization, setImmunization,
                selectedImmunization, setSelectedImmunization,
                gender, setGender,
                surname, setSurname,
                firstname, setFirstname,
                age, setAge,
                phone, setPhone,
                address, setAddress,
                nextOfKeen, setNextOfKeen,
                nextOfKeenContact, setNextOfKeenContact,
                cardno,  setCardno,

                isEditPatient, setIsEditPatient,
                patientToEdit, setPatientToEdit,
                searchInput, setSearchInput,


                vaccineName, setVaccineName,
                vaccineCode, setVaccineCode,
                vaccineDesc, setVaccineDesc,
                duration, setDuration,
                isEditVaccine, setIsEditVaccine,
                vaccineToEdit, setVaccineToEdit
            }}
        >
            {children}
        </StrapiContext.Provider>
    )

};

export default StrapiContextProvider;
