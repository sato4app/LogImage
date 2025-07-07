document.getElementById('startButton').addEventListener('click', startLogging);
document.getElementById('stopButton').addEventListener('click', stopLogging);

let loggingInterval;

// Add event listeners for device motion and orientation
let accelerationData = { x: 0, y: 0, z: 0 };
let orientationData = { alpha: 0, beta: 0, gamma: 0 };

window.addEventListener('devicemotion', function(event) {
    const acceleration = event.acceleration;
    if (acceleration) {
        accelerationData.x = acceleration.x ? acceleration.x.toFixed(2) : 0;
        accelerationData.y = acceleration.y ? acceleration.y.toFixed(2) : 0;
        accelerationData.z = acceleration.z ? acceleration.z.toFixed(2) : 0;
    }
});

window.addEventListener('deviceorientation', function(event) {
    orientationData.alpha = event.alpha ? event.alpha.toFixed(2) : 0;
    orientationData.beta = event.beta ? event.beta.toFixed(2) : 0;
    orientationData.gamma = event.gamma ? event.gamma.toFixed(2) : 0;
});

function startLogging() {
    clearOutput();
    loggingInterval = setInterval(logSensorData, 1000);
}

function stopLogging() {
    clearInterval(loggingInterval);
}

function logSensorData() {
    const output = document.getElementById('output');
    const accelerometerChecked = document.getElementById('accelerometerCheckbox').checked;
    const gyroscopeChecked = document.getElementById('gyroscopeCheckbox').checked;
    let data = '';

    if (accelerometerChecked) {
        data += `加速度: X=${accelerationData.x}, Y=${accelerationData.y}, Z=${accelerationData.z}  `;
    }
    if (gyroscopeChecked) {
        data += `ジャイロ: α=${orientationData.alpha}, β=${orientationData.beta}, γ=${orientationData.gamma}`;
    }

    if (data !== '') {
        const newData = document.createElement('div');
        newData.textContent = data;
        output.appendChild(newData);
        output.scrollTop = output.scrollHeight;
    }
}

function clearOutput() {
    const output = document.getElementById('output');
    output.innerHTML = '';
} 