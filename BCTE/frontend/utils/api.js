/**
 * BCTE API Utilities
 */

const API_BASE = "http://localhost:5000/api";

export const fetchLiquidityReport = async (pair, amount) => {
    const response = await fetch(`${API_BASE}/liquidity_report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pair, amount })
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
};

export const fetchIntentAnalysis = async (intentData) => {
    const response = await fetch(`${API_BASE}/analyze_intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intentData)
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
};
