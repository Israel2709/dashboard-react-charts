import React from 'react'
import { Line } from 'react-chartjs-2';
import Moment from 'react-moment'
import moment from 'moment'

function MultiLineChart(props){
    const chartLabels = props.chartData.reduce( ( accum, current ) => [...accum, moment(current.Date).format("DD/MM/YY")] ,[])
    const recovered = props.chartData.reduce( ( accum, current ) => [...accum, current.Recovered] ,[])
    const confirmed = props.chartData.reduce( ( accum, current ) => [...accum, current.Confirmed] ,[])
    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: "Confirmados",
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,75,192,0.4)',
                borderColor: 'rgba(75,75,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,75,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,75,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: confirmed
            },{
                label: "Recuperados",
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: recovered
            },
        ]
    };
    const options = {legend:{
        labels:{
            fontColor:"white"
        }
    }}
    return(
        <div className="mt-5">
            <h4>País: <span>{props.country}</span></h4>
            <h4>De <Moment format="DD/MM/YYYY">{props.startDate}</Moment> a <Moment format="DD/MM/YYYY">{props.endDate}</Moment></h4>
            <Line 
                data={ data }
                options={ options }
            />
         </div>
    )
}

export default MultiLineChart;