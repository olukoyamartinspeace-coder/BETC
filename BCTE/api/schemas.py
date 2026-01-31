# Pydantic or basic schemas for API validation
from typing import TypedDict

class TradeIntentSchema(TypedDict):
    tokenIn: str
    tokenOut: str
    amountIn: int
    riskScore: int
