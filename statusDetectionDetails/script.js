document.addEventListener('DOMContentLoaded', function() {
    // 初始化时间显示
    updateTime();
    setInterval(updateTime, 1000);
    
    // 初始化设备数据
    initDeviceGrids();
    
    // 按钮点击事件
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 开关切换事件
    document.querySelector('.switch').addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// 更新时间显示
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.querySelector('.time').textContent = `${hours}:${minutes}:${seconds}`;
}

// 初始化设备网格
function initDeviceGrids() {
    // 第一个设备网格
    const grid1 = document.getElementById('deviceGrid1');
    for (let i = 1; i <= 10; i++) {
        grid1.appendChild(createDeviceCard(i));
    }
    
    // 第二个设备网格
    const grid2 = document.getElementById('deviceGrid2');
    for (let i = 1; i <= 10; i++) {
        grid2.appendChild(createDeviceCard(i));
    }
}

// 创建设备卡片
function createDeviceCard(id) {
    const card = document.createElement('div');
    card.className = 'device-card';
    
    // 随机数据
    const power = (Math.random() * 0.1 + 0.5).toFixed(2);
    const voltage = (Math.random() * 0.5 + 290).toFixed(1);
    const current = (Math.random() * 0.5 + 1.2).toFixed(1);
    const rpm = Math.floor(Math.random() * 10);
    
    card.innerHTML = `
        <div class="device-id"># 0${id}</div>
        <div class="device-icon">✈️</div>
        <div class="device-data">
            <div class="data-row">
                <span class="data-label">实际值</span>
                <span class="data-value">${voltage} kWh</span>
            </div>
            <div class="data-row">
                <span class="data-label">风速</span>
                <span class="data-value">${current} m/s</span>
            </div>
            <div class="data-row">
                <span class="data-label">功率</span>
                <span class="data-value">${power} MW</span>
            </div>
            <div class="data-row">
                <span class="data-label">转速</span>
                <span class="data-value">${rpm} rpm</span>
            </div>
        </div>
        <div class="status"></div>
    `;
    
    // 随机更新数据
    setInterval(() => {
        const newPower = (Math.random() * 0.1 + 0.5).toFixed(2);
        const newVoltage = (Math.random() * 0.5 + 290).toFixed(1);
        const newCurrent = (Math.random() * 0.5 + 1.2).toFixed(1);
        const newRpm = Math.floor(Math.random() * 10);
        
        card.querySelector('.data-row:nth-child(1) .data-value').textContent = `${newVoltage} kWh`;
        card.querySelector('.data-row:nth-child(2) .data-value').textContent = `${newCurrent} m/s`;
        card.querySelector('.data-row:nth-child(3) .data-value').textContent = `${newPower} MW`;
        card.querySelector('.data-row:nth-child(4) .data-value').textContent = `${newRpm} rpm`;
    }, 3000 + Math.random() * 2000);
    
    return card;
}

// 模拟数据更新
function simulateDataUpdates() {
    // 更新状态栏数据
    setInterval(() => {
        const totalPower = (Math.random() * 0.1 + 0.5).toFixed(2);
        const avgPower = (Math.random() * 0.1 + 2.7).toFixed(2);
        
        document.querySelectorAll('.status-item .value')[2].textContent = `${totalPower} MW`;
        document.querySelectorAll('.status-item .value')[3].textContent = `${totalPower} MW`;
        document.querySelectorAll('.status-item .value')[1].textContent = `${avgPower} MW`;
    }, 5000);
}

// 启动模拟数据更新
simulateDataUpdates();