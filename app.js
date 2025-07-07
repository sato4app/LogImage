document.getElementById('startButton').addEventListener('click', startLogging);
document.getElementById('stopButton').addEventListener('click', stopLogging);

let loggingInterval;

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
        data += '加速度: ' + Math.random().toFixed(2); // + '\n'; // ダミーデータ
    }
    if (gyroscopeChecked) {
        data += 'ジャイロ: ' + Math.random().toFixed(2); // + '\n'; // ダミーデータ
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