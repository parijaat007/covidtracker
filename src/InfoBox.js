import React from 'react';
import './InfoBox.css';
import { Card,CardContent,Typography } from "@material-ui/core";

function InfoBox({title,cases,total,isRed,active,...props}) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${
                isRed && "infoBox--red"
            }`}
            >
            {/*Title:Cases*/}
            <Typography className="infoBox__title" color="textSecondary">
                {title}
            </Typography>
            {/*Number of Cases*/}
            <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                {cases}
            </h2>
            {/*Total Cases*/}
            <Typography className="infoBox__total" color="textSecondary">
                {total} Total {title}
            </Typography>
        </Card>
    )
}

export default InfoBox
