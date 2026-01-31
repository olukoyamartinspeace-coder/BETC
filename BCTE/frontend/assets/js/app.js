const API_URL = "http://localhost:5001/api";

document.getElementById('analyze-btn').addEventListener('click', async () => {
    const btn = document.getElementById('analyze-btn');
    const dashboard = document.getElementById('dashboard');

    // UI Loading State
    btn.innerText = "Scanning Mempool...";
    btn.disabled = true;
    dashboard.classList.add('hidden');

    try {
        const pair = document.getElementById('token-pair').value;
        const amount = document.getElementById('amount').value;

        // 1. Fetch Data
        console.log(`Fetching all liquidity reports...`);
        const response = await fetch(`${API_URL}/liquidity_report`);

        if (!response.ok) throw new Error("API call failed");

        const allData = await response.json();
        const data = allData[pair];

        if (!data) throw new Error("Pair not found in report");

        console.log("Analysis Data:", data);

        // 2. Render Dashboard
        renderDashboard(data);

        // Show Dashboard
        dashboard.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        alert("Failed to analyze intent. Is the Backend running?");
    } finally {
        btn.innerText = "Analyze Risk";
        btn.disabled = false;
    }
});

function renderDashboard(data) {
    const fragIndex = data.fragmentation_index;
    const price = data.true_price;
    const slippage = data.predicted_slippage;
    const score = data.execution_score;
    const mevRisk = data.mev_risk;
    const pools = data.liquidity_per_dex;

    // A. Render Metrics
    document.getElementById('metric-frag').innerText = fragIndex.toFixed(2);
    document.getElementById('metric-price').innerText = `$${price.toFixed(2)}`;
    document.getElementById('metric-slippage').innerText = `${(slippage * 100).toFixed(2)} %`;

    const riskEl = document.getElementById('metric-risk');
    const riskStatus = score > 70 ? 'LOW' : (score > 40 ? 'MEDIUM' : 'HIGH');
    riskEl.innerText = riskStatus;
    riskEl.style.color = riskStatus === 'LOW' ? 'var(--success)' : (riskStatus === 'MEDIUM' ? 'var(--warning)' : 'var(--danger)');

    // B. Calculate & Render Safety Score
    animateScore(Math.floor(score));

    // C. Render Liquidity Map (Custom CSS Bars)
    const chartContainer = document.getElementById('liquidity-chart');
    chartContainer.innerHTML = ''; // Clear previous

    // Get max depth for scaling
    const poolValues = Object.values(pools);
    const maxDepth = Math.max(...poolValues);

    Object.entries(pools).forEach(([dex, depth]) => {
        const percent = (depth / maxDepth) * 100;

        const row = document.createElement('div');
        row.className = 'pool-item';
        row.innerHTML = `
            <div class="pool-label">${dex}</div>
            <div class="pool-bar-bg">
                <div class="pool-bar-fill" style="width: 0%"></div>
            </div>
            <div class="pool-value">$${depth.toLocaleString()}</div>
        `;
        chartContainer.appendChild(row);

        // Animate bar width after render
        setTimeout(() => {
            row.querySelector('.pool-bar-fill').style.width = `${percent}%`;
        }, 100);
    });

    // Update MEV Sentinel display
    const mevText = document.querySelector('#dashboard .card:last-child span');
    if (mevRisk < 0.1) {
        mevText.innerText = "✅ No Sandwiches Detected";
        mevText.style.color = "var(--success)";
    } else if (mevRisk < 0.2) {
        mevText.innerText = "⚠️ Low MEV Activity";
        mevText.style.color = "var(--warning)";
    } else {
        mevText.innerText = "🛑 High MEV Risk Target";
        mevText.style.color = "var(--danger)";
    }

    // D. Enable Execution Button if Safe
    const execBtn = document.getElementById('execute-btn');
    if (score > 70) {
        execBtn.disabled = false;
        execBtn.classList.add('ready');
        execBtn.innerText = "Sign & Execute (Safe)";
    } else {
        execBtn.disabled = true;
        execBtn.classList.remove('ready');
        execBtn.innerText = "Execution Blocked (High Risk)";
    }
}

function animateScore(target) {
    const el = document.getElementById('safety-score-display');
    const statusEl = document.getElementById('safety-status');
    let current = 0;
    const interval = setInterval(() => {
        current += 2; // Speed of count up
        if (current >= target) {
            current = target;
            clearInterval(interval);
            statusEl.innerText = "Verified by BCTE Oracle";
            statusEl.style.color = "var(--success)";
        }
        el.innerText = current;

        // Color coding
        if (current < 50) el.style.color = "var(--danger)";
        else if (current < 80) el.style.color = "var(--warning)";
        else el.style.color = "var(--success)";
    }, 20);
}
