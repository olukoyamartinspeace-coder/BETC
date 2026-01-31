import sys
import os
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

# Add the ai-agent/src directory to sys.path
src_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ai-agent', 'src'))
sys.path.append(src_path)

# Import AI Agent
try:
    from decision.liquidity_index import get_liquidity_report_json
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

app = Flask(__name__)
CORS(app)  # enable cross-origin requests for frontend

@app.route("/api/liquidity_report", methods=["GET"])
def liquidity_report():
    try:
        report = get_liquidity_report_json()
        return jsonify(report)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional: MEV or Risk endpoints for future expansion
@app.route("/api/mev_report", methods=["GET"])
def mev_report():
    report = {pair: data["mev_risk"] for pair, data in get_liquidity_report_json().items()}
    return jsonify(report)

@app.route("/api/risk_report", methods=["GET"])
def risk_report():
    report = {pair: data["execution_score"] for pair, data in get_liquidity_report_json().items()}
    return jsonify(report)

if __name__ == "__main__":
    print("Registered Routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.methods} {rule.rule}")
    app.run(debug=True, host="0.0.0.0", port=5001)
