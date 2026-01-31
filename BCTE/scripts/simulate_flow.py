import sys
import os
import time
import json
import random

# Path Setup
src_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ai-agent', 'src'))
sys.path.append(src_path)

try:
    from decision.liquidity_index import get_liquidity_report_json
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

# Identity Setup (Mock)
oracle_addr = "0x" + "b" * 40
user_addr = "0x" + "a" * 40

print("\n--- 🚀 BCTE FULL SYSTEM SIMULATION (BNBHack Refactor) ---\n")

# 1. User Intent
# Note: The simulation now picks from the expanded token database
target_pair = "BNB/USDT"
intent = {"pair": target_pair, "amount": 5.0}
print(f"Step 1: User intends to trade {intent['amount']} units of {intent['pair']}")

# 2. AI Intelligence
print("Step 2: AI Agent Analysing Liquidity...")
full_report = get_liquidity_report_json()
report = full_report.get(target_pair)

if not report:
    print(f"❌ Error: Pair {target_pair} not found in AI report.")
    sys.exit(1)

print(f"   > Fragmentation: {report['fragmentation_index']}")
print(f"   > True Price: ${report['true_price']}")
print(f"   > MEV Risk: {report['mev_risk']}")
print(f"   > Execution Score: {report['execution_score']}/100")

# 3. Oracle Verification
if report['execution_score'] > 70:
    print("Step 3: Oracle Verification ... ✅ Authorized (Score Safe)")
    sig = "0x" + "c" * 130
    
    # 4. On-Chain Registry
    print("Step 4: Submitting to ExecutionAgent.sol ... ✅ Success")
else:
    print(f"Step 3: Oracle Verification ... 🛑 Blocked (Score {report['execution_score']} too low)")

print("\n--- SIMULATION COMPLETE ---")
