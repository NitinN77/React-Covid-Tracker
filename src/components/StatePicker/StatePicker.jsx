import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchStateData } from '../../api';

import styles from './StatePicker.module.css';

function StatePicker({ handleStateChange }) {

    const [fetchedStates, setFetchedStates] = useState([]);


    useEffect(() => {
        const fetchAPI = async () => {
            let statedata = await fetchStateData();
            setFetchedStates(statedata.map((state) => state.name));
        }
        fetchAPI();
    },[setFetchedStates]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="Tamil Nadu" onChange={(e) => {handleStateChange(e.target.value)}}>
                <option value=""></option>
                {fetchedStates.map((state, i) => <option key={i} value={state}>{state}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default StatePicker;
