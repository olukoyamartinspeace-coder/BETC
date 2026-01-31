# BNB Chain Transparency Engine (BCTE)

## Overview
BCTE is a pre-execution intelligence layer for the BNB Chain. It prioritizes **transparency over speed**, allowing users to assess liquidity fragmentation and MEV risk *before* committing to a trade.

## Architecture
- **Contracts**: Solidity (Hardhat/Foundry compatible). Non-custodial intent registry.
- **Backend**: Python (Flask) + Web3.py. AI Agent for risk scoring.
- **Frontend**: Vanilla HTML/JS/CSS. No frameworks.

## Project Structure
```
BCTE/
├── contracts/          # Solidity Smart Contracts
│   ├── core/           # Main contracts (Registry, Oracle Verifier)
│   ├── interfaces/     # ITransparencyOracle, etc.
│   └── mocks/          # Test tokens/mocks
├── backend/            # Python Intelligence Layer
│   ├── ai_engine/      # Liquidity Map, MEV Sentinel, Risk Radar logic
│   ├── oracle/         # Cryptographic signing logic
│   └── api/            # Flask server endpoints
├── frontend/           # User Interface (Vanilla)
│   ├── assets/         # CSS/JS
│   └── index.html      # Main Dashboard
└── scripts/            # Deployment and Simulation scripts
```

## Quick Start
1. **Backend**: `cd backend && pip install -r requirements.txt && python api/app.py`
2. **Frontend**: Open `frontend/index.html` in a live server.
3. **Contracts**: `npx hardhat compile` (requires setup).
