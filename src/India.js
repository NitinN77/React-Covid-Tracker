import React,{ useState, useEffect } from 'react'
import styles from './India.module.css';
import { fetchIData,fetchData } from './api'
import { Line } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
import Cards from './components/Cards/Cards';

function India() {

    const [IData, setIData] = useState([]);
    const [ICardData, setICardData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setIData(await fetchIData());
        }
        const ICards = async () => {
            const fetchedData = await fetchData('india');
            setICardData(fetchedData);
        }
        ICards();
        fetchAPI();
    }, []);

    
    

    const active_lineChart = (
        IData.length ? 
        (
        <Line
        data = {{
            labels: IData.map(({ date }) => date),
            datasets: [{
                data: IData.map(({confirmed}) => confirmed),
                label: 'Daily Cases',
                borderColor: '#3333ff',
                backgroundColor: 'rgba(37, 64, 214, 0.5)',
                fill: true,
            },],
        }} 
        />
        ) : null
    );

    const deaths_lineChart = (
        IData.length ? 
        (
        <Line
        data = {{
            labels: IData.map(({ date }) => date),
            datasets: [{
                data: IData.map(({deaths}) => deaths),
                label: 'Daily Deaths',
                borderColor: 'black',
                backgroundColor: 'rgba(0,0,0,0.5)',
                fill: true,
            },],
        }} 
        />
        ) : null
    );

    const recovered_lineChart = (
        IData.length ? 
        (
        <Line
        data = {{
            labels: IData.map(({ date }) => date),
            datasets: [{
                data: IData.map(({recovered}) => recovered),
                label: 'Daily Recoveries',
                borderColor: 'green',
                backgroundColor: 'rgba(0, 238, 20, 0.5)',
                fill: true,
            },],
        }} 
        />
        ) : null
    );

    return (
        <Grid container>
            <Grid item className={styles.container}>
                {active_lineChart}
            </Grid>
            <Grid item className={styles.container}>
                {deaths_lineChart}
            </Grid>
            <Grid item className={styles.container}>
                {recovered_lineChart}
            </Grid>
            <Grid item className={styles.container}>
                <Cards data={ICardData}/>
            </Grid>
        </Grid>
    );
}

export default India
