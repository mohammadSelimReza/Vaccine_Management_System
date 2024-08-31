import React, { useEffect, useState } from 'react';
import api from '../../../../api';

const VaccineEdit = () => {
    const [vaccine,setVaccine]= useState([])

    useEffect(() =>{
        api.patch(`/vaccine/list/${id}/`)
        .then(res=> setVaccine(res.data))
    },[])
    return (
        <div>
            
        </div>
    );
};

export default VaccineEdit;