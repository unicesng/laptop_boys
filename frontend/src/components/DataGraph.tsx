import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DataGraph = () => {
  // The data series for the chart
  const series = [
    {
      name: 'Dept A',
      data: [75, 70, 80]
    },
    {
      name: 'Dept B',
      data: [80, 75, 65]
    },
    {
      name: 'Dept C',
      data: [65, 85, 75]
    },
    {
      name: 'Aggregate',
      data: [70, 80, 73]
    }
  ];

  // Chart options
  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false // Removes the toolbar
      }
    },
    colors: ['#3366CC', '#DC3912', '#FF9900', '#109618'],
    dataLabels: {
      enabled: false // Disables data labels
    },
    stroke: {
      curve: 'straight',
      width: [2, 2, 2, 3] // Set the width of the Aggregate line to be thicker
    },
    title: {
      text: 'Percentage of Supplier Facilities in compliance with wastewater discharge permits',
      align: 'left',
      style: {
        fontSize: '16px',
        color: '#263238'
      }
    },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 5, // Dashed grid lines
      xaxis: {
        lines: {
          show: false // Hide vertical grid lines
        }
      }
    },
    markers: {
      size: 5
    },
    xaxis: {
      categories: ['January', 'February', 'March'],
      title: {
        text: 'Month'
      },
      labels: {
        style: {
          colors: [],
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Percentage'
      },
      labels: {
        style: {
          colors: [],
          fontSize: '12px'
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    tooltip: {
      enabled: true
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default DataGraph;
