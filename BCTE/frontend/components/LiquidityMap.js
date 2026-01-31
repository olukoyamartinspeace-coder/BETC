/**
 * Component: LiquidityMap
 * Renders a bar chart of liquidity across different pools.
 */

export const renderLiquidityMap = (containerId, pools) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const maxDepth = Math.max(...pools.map(p => p.depth_usd));

    pools.forEach(pool => {
        const percent = (pool.depth_usd / maxDepth) * 100;

        const row = document.createElement('div');
        row.className = 'pool-item';
        row.innerHTML = `
            <div class="pool-label">${pool.dex}</div>
            <div class="pool-bar-bg">
                <div class="pool-bar-fill" style="width: 0%"></div>
            </div>
            <div class="pool-value">$${(pool.depth_usd / 1000000).toFixed(1)}M</div>
        `;
        container.appendChild(row);

        setTimeout(() => {
            const bar = row.querySelector('.pool-bar-fill');
            if (bar) bar.style.width = `${percent}%`;
        }, 100);
    });
};
