import random

# Mock liquidity pools for multiple token pairs
POOLS = {
    "BNB/USDT": {"PancakeSwap": 10000, "Thena": 7500, "Apeswap": 5000},
    "BUSD/USDT": {"PancakeSwap": 50000, "Thena": 48000, "Apeswap": 45000},
    "ETH/BNB": {"PancakeSwap": 2000, "Thena": 1800, "Apeswap": 1500},
    "CAKE/BNB": {"PancakeSwap": 1200, "Thena": 1000, "Apeswap": 800},
}

# Simulate MEV risk or sudden liquidity events
def simulate_mev_risk():
    return random.uniform(0, 0.3)  # 0=no risk, 0.3=medium risk

# Compute fragmentation index for a token pair
def compute_fragmentation(dex_liquidity):
    total_liquidity = sum(dex_liquidity.values())
    if total_liquidity == 0:
        return 1.0
    # Fragmentation: how uneven liquidity is
    frag = max(dex_liquidity.values()) / total_liquidity
    return round(frag, 2)

# Compute execution safety score based on fragmentation + MEV risk
def compute_execution_score(fragmentation, mev_risk):
    score = 100 - (fragmentation * 50 + mev_risk * 50)  # weighted
    return max(0, min(100, round(score, 2)))

# Generate liquidity report for all token pairs
def get_liquidity_report_json():
    report = {}
    for pair, dex_liquidity in POOLS.items():
        fragmentation = compute_fragmentation(dex_liquidity)
        mev_risk = simulate_mev_risk()
        execution_score = compute_execution_score(fragmentation, mev_risk)
        total_liquidity = sum(dex_liquidity.values())

        report[pair] = {
            "token_pair": pair,
            "liquidity_per_dex": dex_liquidity,
            "total_liquidity": total_liquidity,
            "fragmentation_index": fragmentation,
            "mev_risk": round(mev_risk, 2),
            "execution_score": execution_score,
            "true_price": round(random.uniform(1, 500), 2),  # placeholder
            "predicted_slippage": round(fragmentation * 0.2 + mev_risk * 0.1, 2)
        }
    return report

# For testing independently
if __name__ == "__main__":
    import json
    print(json.dumps(get_liquidity_report_json(), indent=2))
