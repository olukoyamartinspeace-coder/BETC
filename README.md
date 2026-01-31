# BCTE – BNB Chain Transparency Engine

**Description:**  
BCTE is a real-time safety filter for BNB DeFi. It visualizes liquidity fragmentation, predicts slippage, detects MEV, and provides verified execution paths via smart contracts and oracle verification.

**MVP Modules:**  
1. AI Agent – Liquidity Map, MEV Sentinel, Risk Radar  
2. Backend API – Flask endpoints serving metrics  
3. Frontend Dashboard – Charts for fragmentation & safety  
4. Smart Contracts – TradeIntentRegistry, ExecutionAgent, Oracle verification  

**Testnet Deployment:**  
- TradeIntentRegistry: `<contract-address>`  
- ExecutionAgent: `<contract-address>`  
- Oracle: `<contract-address>`  
- Tx verified: 2 successful transactions  

**Run Simulation:**  
```bash
python scripts/simulate_flow.py

