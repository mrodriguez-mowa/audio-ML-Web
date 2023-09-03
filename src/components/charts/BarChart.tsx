import React from 'react'


import {   Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const PieChart = (props: any) => {
    const quantities = props.data

     const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: props.title,
        },
      },
    };
    
    console.log(quantities)

     const data = {
      
        labels: quantities.map((el:any)=>el?.new_type.toUpperCase()),
        datasets: [
          {
            label: props.label,
            data: quantities.map((el:any)=>parseInt(el.total)),
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(255, 159, 64, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
            hoverOffset: 10
          },
        ],
      };


      /*
    quantities.forEach((element: any) => {
        data.push([element.new_type, parseInt(element.total)])
    
    }); */

    return <Bar options={options}  data={data} />
    
    
}

export default PieChart