import React from 'react';
import useAuth from '../../../../../context/useAuth';

const DoctorHome = () => {
    const {doctorData} = useAuth();
    return (
        <div>
            <h1>Hi welcome doctor,{doctorData?.user.first_name} {doctorData?.user.last_name}</h1>
        </div>
    );
};

export default DoctorHome;