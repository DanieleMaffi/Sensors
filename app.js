const debug = document.getElementById("debug")
const container = document.getElementById("container")
const cardContainer = document.getElementById("cardContainer")

function setContent(id, content) {
    document.getElementById(id).innerHTML = content
}

fetch("https://hf3xzw.deta.dev/")
.then(r => r.json())
.then(body => {
    console.log(body)

    for(let i = 0; i < 4; i++) {
        const sensor = JSONToSensor(body['sensors'][i]) 
        cardContainer.innerHTML += 
        `
        <div class="card">  
            <img src="light-off.svg" alt="light" id="${'lightBulb' + i}">
            <h2>${sensor.description}</h2>
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

    for(let i = 0; i < 2; i++) {
        document.getElementById('changeValue' + i).onclick = () => {
            if(document.getElementById("lightBulb" + i).src.match("light-on.svg"))
                document.getElementById("lightBulb" + i).src = "light-off.svg"
            else 
                document.getElementById("lightBulb" + i).src = "light-on.svg"
        }
    }
    for(let i = 2; i < 4; i++) {
        document.getElementById("lightBulb" + i).classList.add('hidden')
        document.getElementById('changeValue' + i).onclick = () => {
            if(document.getElementById('changeValue' + i).innerHTML.match('Switch') || document.getElementById('changeValue' + i).innerHTML.match('Off'))
                document.getElementById('changeValue' + i).innerHTML = 'On'
            else 
            document.getElementById('changeValue' + i).innerHTML = 'Off'
        }
    }

    historyValues = []
    for(let i = 4; i < 8; i++) {
        for(let j = 0; j < 10; j++)
            historyValues[i][j] = JSONToSensor(body['sensors'][i])
    }

    console.log(sensorsSimple[0].description)
})