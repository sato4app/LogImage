document.getElementById('startButton').addEventListener('click', startLogging);
document.getElementById('stopButton').addEventListener('click', stopLogging);

let loggingInterval;

// Add event listeners for device motion and orientation
let accelerationData = { x: 0, y: 0, z: 0 };
let orientationData = { alpha: 0, beta: 0, gamma: 0 };

// センサーの許可を画面に出力するための要素を取得
const permissionOutput = document.getElementById('permissionOutput');

// センサーの許可を求める関数
async function requestSensorPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
            const response = await DeviceMotionEvent.requestPermission();
            permissionOutput.textContent += `DeviceMotionEvent permission: ${response}\n`;
            if (response === 'granted') {
                window.addEventListener('devicemotion', handleMotionEvent);
            }
        } catch (error) {
            permissionOutput.textContent += 'DeviceMotionEvent permission request failed.\n';
        }
    } else {
        permissionOutput.textContent += 'DeviceMotionEvent permission: not required\n';
        window.addEventListener('devicemotion', handleMotionEvent);
    }

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const response = await DeviceOrientationEvent.requestPermission();
            permissionOutput.textContent += `DeviceOrientationEvent permission: ${response}\n`;
            if (response === 'granted') {
                window.addEventListener('deviceorientation', handleOrientationEvent);
            }
        } catch (error) {
            permissionOutput.textContent += 'DeviceOrientationEvent permission request failed.\n';
        }
    } else {
        permissionOutput.textContent += 'DeviceOrientationEvent permission: not required\n';
        window.addEventListener('deviceorientation', handleOrientationEvent);
    }
}

// モーションイベントのハンドラ
function handleMotionEvent(event) {
    const acceleration = event.acceleration;
    if (acceleration) {
        accelerationData.x = acceleration.x ? acceleration.x.toFixed(2) : 0;
        accelerationData.y = acceleration.y ? acceleration.y.toFixed(2) : 0;
        accelerationData.z = acceleration.z ? acceleration.z.toFixed(2) : 0;
    }
}

// オリエンテーションイベントのハンドラ
function handleOrientationEvent(event) {
    orientationData.alpha = event.alpha ? event.alpha.toFixed(2) : 0;
    orientationData.beta = event.beta ? event.beta.toFixed(2) : 0;
    orientationData.gamma = event.gamma ? event.gamma.toFixed(2) : 0;
}

// ページ読み込み時にセンサーの許可を求める
window.addEventListener('load', requestSensorPermission);

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
        data += `加速度: X=${accelerationData.x}, Y=${accelerationData.y}, Z=${accelerationData.z}\n`;
    }
    if (gyroscopeChecked) {
        data += `ジャイロ: α=${orientationData.alpha}, β=${orientationData.beta}, γ=${orientationData.gamma}\n`;
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