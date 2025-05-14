// Get the canvas element
const trafficCanvas = document.getElementById('traffic-chart');

// Original weekly data (preserving your exact structure)
let trafficData = {
  labels: [
    '16-22',
    '23-29',
    '30-5',
    '6-12',
    '13-19',
    '20-26',
    '27-3',
    '4-10',
    '11-17',
    '18-24',
    '25-31',
  ],
  datasets: [
    {
      data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
      backgroundColor: 'rgba(116, 119, 191, .3)',
      borderWidth: 1,
    },
  ],
};

// Original options (preserving your exact configuration)
let trafficOptions = {
  backgroundColor: 'rgba(112, 104, 202, .5)',
  fill: true,
  aspectRatio: 2.5,
  animation: {
    duration: 0,
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

// Define dataset variants while preserving structure & styling
const trafficDatasets = {
  hourly: {
    labels: [
      '9AM',
      '10AM',
      '11AM',
      '12PM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
      '6PM',
      '7PM',
      '8PM',
    ],
    datasets: [
      {
        data: [30, 45, 60, 75, 90, 105, 95, 85, 70, 55, 40, 35],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
      },
    ],
  },

  daily: {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [150, 230, 280, 320, 290, 350, 270],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
      },
    ],
  },

  weekly: {
    labels: [
      '16-22',
      '23-29',
      '30-5',
      '6-12',
      '13-19',
      '20-26',
      '27-3',
      '4-10',
      '11-17',
      '18-24',
      '25-31',
    ],
    datasets: [
      {
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
      },
    ],
  },

  monthly: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [
          4500, 5250, 4800, 6200, 7500, 8250, 9000, 8500, 7200, 6500, 7000,
          8800,
        ],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
      },
    ],
  },
};

// Create the initial chart (weekly by default)
let trafficChart = new Chart(trafficCanvas, {
  type: 'line',
  data: trafficData,
  options: trafficOptions,
});

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', function () {
  const trafficNavLinks = document.querySelectorAll('.traffic-nav-link');

  trafficNavLinks.forEach((link) => {
    link.addEventListener('click', function () {
      // Remove active class from all links
      trafficNavLinks.forEach((navLink) => {
        navLink.classList.remove('active');
      });

      // Add active class to clicked link
      this.classList.add('active');

      // Get the time period from the link text
      const timePeriod = this.textContent.toLowerCase();

      // Update chart data
      updateTrafficChart(timePeriod);
    });
  });
});

/**
 * Updates the traffic chart with the selected dataset
 * @param {string} timePeriod - 'hourly', 'daily', 'weekly', or 'monthly'
 */
function updateTrafficChart(timePeriod) {
  // Get the appropriate dataset
  const newData = trafficDatasets[timePeriod];

  // Update chart data
  trafficChart.data.labels = newData.labels;
  trafficChart.data.datasets = newData.datasets;

  // Update the chart (using animation)
  trafficChart.update({
    duration: 800,
    easing: 'easeOutQuart',
  });
}

const dailyCanvas = document.getElementById('daily-chart');

let dailyData = {
  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  datasets: [
    {
      label: '# of Hits',
      data: [75, 115, 175, 125, 225, 200, 100],
      backgroundColor: '#7477Bf',
      borderWidth: 1,
    },
  ],
};

const dailyOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions,
});

const mobileCanvas = document.getElementById('mobile-chart');

const mobileData = {
  labels: ['Desktop', 'Tablet', 'Phones'],
  datasets: [
    {
      label: '# of Users',
      data: [200, 550, 500],
      borderWidth: 0,
      backgroundColor: ['#7477BF', '#78CF82', '#51B6C8'],
    },
  ],
};

const mobileOptions = {
  aspectRatio: 1.9,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 30,
        boxHeight: 30,
        fontStyle: 'bold',
      },
    },
  },
};

let mobilChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions,
});
