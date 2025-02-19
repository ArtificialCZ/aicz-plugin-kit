# @aicz/agentterminal (v1.0.0)

**AgentTerminal** is a plugin for [ElizaOS](https://github.com/elizaos/eliza) that lets the AI agent send an English query to a backend (hosted at [artificialcz.com](https://artificialcz.com)) and receive context/data in real time. Instead of periodic polling, the agent explicitly triggers this plugin when it needs external information.

## Features

- **On-Demand Query**: The agent calls `AGENT_TERMINAL_QUERY` with a plain-English string describing what data it wants.
- **Simple Service**: A service (`AgentTerminalService`) sends the request to `https://artificialcz.com/api0/agentterminal/` (or your custom URL).
- **Seamless ElizaOS Integration**: Registers both an action and service so the LLM can retrieve context in a single step.

## Usage

1. **Installation**:
   ```bash
   npm install @aicz/agentterminal
