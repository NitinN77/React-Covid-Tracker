import React from 'react';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

function Cards({ data }) {
    console.log('data', data);
    if(!data) {
        return 'Loading...';
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justified="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                           Confirmed
                        </Typography>
                        <Typography variant="h5">
                            {data[0] ? (
                                <CountUp 
                                start={0}
                                end={data[0].confirmed}
                                duration={2.5}
                                separator=","/> )
                                :
                                null
                            }   
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.active)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                        Active
                        </Typography>
                        <Typography variant="h5">
                            {data[0] ? (
                                <CountUp 
                                start={0}
                                end={data[0].active}
                                duration={2.5}
                                separator=","/> )
                                :
                                null
                            }    
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                        Deaths
                        </Typography>
                        <Typography variant="h5">
                            {data[0] ? (
                                <CountUp 
                                start={0}
                                end={data[0].deaths}
                                duration={2.5}
                                separator=","/> )
                                :
                                null
                            }     
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
