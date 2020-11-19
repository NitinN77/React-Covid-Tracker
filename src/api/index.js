import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

const iurl = 'https://api.covid19india.org/';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl=`${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);

        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        }

        return modifiedData;
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name)
        
    } catch (error) {
        console.log(error.message);
    }
}

export const fetchIData = async () => {
    try {
        let url = `${iurl}/data.json`;
        const { data: {cases_time_series}} = await axios.get(url);
        let ts = cases_time_series.map((dailyData) => ({
            confirmed: dailyData.dailyconfirmed,
            deaths: dailyData.dailydeceased,
            recovered: dailyData.dailyrecovered,
            date: dailyData.date,
        }));
        return ts;

    } catch (error) {
        console.log(error.message);
    }
}


export const fetchStateData = async () => {
    try {
        let url = `${iurl}/data.json`;
        const { data: {statewise}} = await axios.get(url);
        let modifiedData = statewise.map((state) => ({
            name: state.state,
            active: state.active,
            confirmed: state.confirmed,
            deaths: state.deaths,
        }))
        return modifiedData;
    } catch (error) {
        console.log(error.message);
    }
}