const debug = document.getElementById("debug")
const container = document.getElementById("container")
const cardContainer = document.getElementById("cardContainer")
const cardChartContainer = document.getElementById("cardChartContainer")

// Function used to set the innerHTML of an element
function setContent(id, content) {
    document.getElementById(id).innerHTML = content
}

// Function to change the display of an element from 'block' to 'none' or viceversa
function setVisible(domId, visible) {
    let value = "none"

    if(visible === true) 
      value = "block"

    document.getElementById(domId).style.display = value
}

fetch("https://hf3xzw.deta.dev/")
.then(r => r.json())
.then(body => {
    console.log(body)

    // First four cards to display
    for(let i = 0; i < 4; i++) {
        const sensor = JSONToSensor(body['sensors'][i]) 

        cardContainer.innerHTML += 
        `
        <div class="card">  
            <svg id="${'lightBulb' + i}" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494.7 619.56"><defs><style>.cls-1{fill:none;}</style></defs><title>light-off</title><path d="M375.51,50A167,167,0,0,0,258.32,0a164.55,164.55,0,0,0-65,12.4,8.72,8.72,0,1,0,6.62,16.13,147,147,0,0,1,58.17-11.09,150.5,150.5,0,0,1,119.61,239c-.15.21-.29.42-.43.64l-1.68,2.8c-7.91,13.18-14.75,24.56-20.6,34.75a8.72,8.72,0,1,0,15.12,8.69c5.77-10.05,12.56-21.36,20.43-34.46l1.49-2.47A167.94,167.94,0,0,0,375.51,50Z" transform="translate(-12.62 107.56)"/><path d="M359.17,391.33a31.26,31.26,0,0,0-14.86-26.6A128.13,128.13,0,0,1,353.64,335a8.72,8.72,0,1,0-16-7,147.71,147.71,0,0,0-10.24,32.09h-79a8.72,8.72,0,0,0,0,17.44h79.48c.43,0,.85,0,1.28.07l.33,0c.34,0,.67.09,1,.15l.26.05a13.82,13.82,0,0,1-2.87,27.34H184.09a13.82,13.82,0,0,1-2.87-27.34l.25-.05c.33-.06.67-.11,1-.15l.33,0c.42,0,.85-.07,1.28-.07H214a8.72,8.72,0,0,0,0-17.44H184.56c-5.62-29.32-20.45-54-48.1-100.05l-1.73-2.87a6.64,6.64,0,0,0-.43-.65,149.39,149.39,0,0,1-28.8-88.55c0-48.4,24-94.32,64.32-122.84a8.72,8.72,0,1,0-10.08-14.23c-44.88,31.79-71.68,83-71.68,137.07A166.76,166.76,0,0,0,120,266.45l1.53,2.54c27.87,46.4,41.37,68.88,46.17,95.74a31.22,31.22,0,0,0-5.22,49.14,31.25,31.25,0,0,0,21.63,53.81h14.22a59.7,59.7,0,0,0,115.37,0h14.23a31.24,31.24,0,0,0,21.62-53.81A31.17,31.17,0,0,0,359.17,391.33ZM256,494.56a42.39,42.39,0,0,1-39.37-26.88h78.74A42.41,42.41,0,0,1,256,494.56Zm71.91-44.32H184.09a13.83,13.83,0,0,1,0-27.65H327.91a13.83,13.83,0,0,1,0,27.65Z" transform="translate(-12.62 107.56)"/><rect class="cls-1" x="230.05" width="26.67" height="81.56" rx="13.33"/><rect class="cls-1" x="362.69" y="-77.36" width="26.67" height="81.56" rx="13.33" transform="translate(25.45 -97.89) rotate(32.11)"/><rect class="cls-1" x="458.69" y="-5.36" width="26.67" height="81.56" rx="13.33" transform="translate(204.54 -255.9) rotate(53.13)"/><rect class="cls-1" x="34.58" y="-5.36" width="26.67" height="81.56" rx="13.33" transform="translate(92.37 125.9) rotate(126.87)"/><rect class="cls-1" x="127.01" y="-77.36" width="26.67" height="81.56" rx="13.33" transform="translate(227.16 -34.61) rotate(147.89)"/></svg>            <h2>${sensor.description}</h2>
            <button id="${'changeValue' + i}">Switch</button>
            <ul>
                <li>ID: ${sensor.id}</li>
                <li>Longitude: ${sensor.lng}</li>
                <li>Latitude: ${sensor.lat}</li>
                <li>Place: ${sensor.place}</li>
                <li>State-code: ${sensor.state_code}</li>
            </ul>
        </div>
        `
    }

    // Used for checking whether the buttton to switch the like is pressed or not
    // If it's pressed, it chamges the state of the light
    // This os esclisovely for the first two cards
    for(let i = 0; i < 2; i++) {
        document.getElementById('changeValue' + i).onclick = () => {
            document.getElementById("lightBulb" + i).classList.toggle('light-on')
            
        }
    }
    // Does the same as the previous section, but to the last two cards
    for(let i = 2; i < 4; i++) {
        document.getElementById("lightBulb" + i).classList.add('hidden')
        document.getElementById('changeValue' + i).onclick = () => {
            if(document.getElementById('changeValue' + i).innerHTML.match('Switch') || document.getElementById('changeValue' + i).innerHTML.match('Off'))
                document.getElementById('changeValue' + i).innerHTML = 'On'
            else 
            document.getElementById('changeValue' + i).innerHTML = 'Off'
        }
    }

    // Does a fetch ten times for each of the remaining four sensors and stores them as historycal values yo show the on the charts
    // It also updates the titles and additional informations for the sensor
    let fetchCount = 0
    for(let i = 4; i < 8; i++) {
        const sensor = JSONToSensor(body['sensors'][i])
        const values = []
        for(let j = 0; j < 10; j++) {
            fetch("https://hf3xzw.deta.dev/")
                .then(r => r.json())
                .then(body => {
                    const sensorTemp = JSONToSensor(body['sensors'][i])
                    values.push(sensorTemp.value)
                    fetchCount++
                    console.log(fetchCount)

                    // As soon as the fetch count reaches 40, the loading animation is hidden and the content is shown
                    if(fetchCount == 40) {
                        setVisible('loadingAnimation', false)
                        setVisible('content', true)
                    }
                })
        }

        chartName = i - 3
        console.log(values)
        const ctx = document.getElementById('myChart' + chartName).getContext('2d')
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [{
                    label: 'Value',
                    data: values,
                    backgroundColor: [
                        'rgba(117, 123, 200, 1)',
                        'rgba(129, 135, 220, 1)',
                        'rgba(142, 148, 242, 1)',
                        'rgba(159, 160, 255, 1)',
                        'rgba(173, 167, 255, 1)',
                        'rgba(187, 173, 255, 1)',
                        'rgba(203, 178, 254, 1)',
                        'rgba(218, 182, 252, 1)',
                        'rgba(221, 189, 252, 1)',
                        'rgba(224, 195, 252, 1)'
                    ],
                    borderColor: [
                        'rgba(117, 123, 200, 1)',
                        'rgba(129, 135, 220, 1)',
                        'rgba(142, 148, 242, 1)',
                        'rgba(159, 160, 255, 1)',
                        'rgba(173, 167, 255, 1)',
                        'rgba(187, 173, 255, 1)',
                        'rgba(203, 178, 254, 1)',
                        'rgba(218, 182, 252, 1)',
                        'rgba(221, 189, 252, 1)',
                        'rgba(224, 195, 252, 1)'
                    ],
                    borderWidth: 4
                }]
            },
            options: {
                responsive: true,
                lineTension: 0.3,
                scales: {
                    y: {
                        beginAtZero: false,
                    }
                }
            }
        })      
        
        document.getElementById('chartDescription' + chartName).innerHTML = sensor.description
        document.getElementById('chartList' + chartName).innerHTML += 
        `
        <ul>
            <li>${sensor.id}</li>
            <li>${sensor.lng}</li>
            <li>${sensor.lat}</li>
            <li>${sensor.place}</li>
            <li>${sensor.state_code}</li>
        </ul>
        `
    }

    // setTimeout(function(){
    //     setVisible('loadingAnimation', false)
    //     setVisible('content', true)
    // }, 8000);
})