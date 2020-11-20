import React,{ useState, useEffect } from 'react'
import styles from './India.module.css';
import { fetchIData, fetchData, fetchStateData, fetchStates } from './api'
import { Line } from 'react-chartjs-2';
import { Grid, Card, CardContent, Icon } from '@material-ui/core';
import Cards from './components/Cards/Cards';
import StateCards from './components/Cards/StateCards';
import StatePicker from './components/StatePicker/StatePicker';
import cx from 'classnames';

function India() {

    const [IData, setIData] = useState([]);
    const [ICardData, setICardData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cstate, setCstate] = useState('');

    useEffect(() => {
        const fetchAPI = async () => {
            setIData(await fetchIData());
            setICardData(await fetchData('india'));
            setStateData(await fetchStateData());
        }   
        fetchAPI();

    }, []);

    const handleStateChange = async (cstate) => {
        setCstate(cstate);
    }
    
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
        <div>
            <Grid container className={styles.container}>
                <Grid item  className={styles.card}>
                    <CardContent>
                    <h1>Daily Cases</h1>
                    {active_lineChart}
                    </CardContent>
                </Grid>
                <Grid item  className={styles.card}>
                    <CardContent>
                    <h1>Daily Deaths</h1>
                    {deaths_lineChart}
                    </CardContent>
                </Grid>
                <Grid item  className={styles.card}>
                    <CardContent>
                    <h1>Daily Recovered</h1>
                    {recovered_lineChart}
                    </CardContent>
                </Grid>
                <Grid item className={cx(styles.card,styles.nationalform)}>
                    <CardContent>
                    <h1>National Statistics</h1>
                    <Cards data={ICardData} />
                    </CardContent>
                </Grid>
                <Grid item className={styles.card}>
                    <CardContent>
                        <h1>State-Wise Data</h1>
                        <StatePicker handleStateChange={handleStateChange}/>
                        <StateCards data={stateData.filter((state) => state.name === cstate)}/>
                    </CardContent>
                </Grid>
            </Grid>
            
        </div>
    );
}

export default India
