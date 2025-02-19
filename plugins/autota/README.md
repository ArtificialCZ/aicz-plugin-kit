# @aicz/autota (v1.0.0)

**AutoTA** is a plugin that lets your agent request auto-generated technical analysis charts using an **English text description** (e.g., “Plot BTC with RSI on a 4-hour timeframe.”). The plugin connects to [artificialcz.com](https://artificialcz.com) to retrieve relevant chart images or textual analysis.

## Features

- **English-Language Requests** – The agent sends a query string describing the ticker, timeframe, and any indicators or style preferences.
- **API-Driven** – Queries the `https://artificialcz.com/api0/autota/` endpoint (configurable).
- **Seamless Integration** – Register a single service + action, so the agent can produce `<ACTION: AUTO_TA_REQUEST_CHART> {...}` and get a chart result in response.

## Installation

1. **Install or Reference** in your monorepo:
   ```bash
   npm install @aicz/autota
