# AICZ Plugin Kit

Welcome to the **AICZ Plugin Kit**! This monorepo contains three powerful [ElizaOS](https://github.com/elizaos/eliza) plugins created by **ArtificialCZ**, each designed to bring advanced AI capabilities to the BNB Chain ecosystem. Our aim is to provide developers, traders, and AI enthusiasts with flexible, high‐utility tools that are continuously evolving with the [$AICZ](https://twitter.com/ArtificialCZ) vision.

> **Note**: While these plugins are functional, please keep in mind that some features—especially within the Sentience plugin—remain experimental.

---

## Table of Contents

1. [Overview](#overview)  
2. [Plugins](#plugins)  
   - [AgentTerminal](#agentterminal)  
   - [AutoTA](#autota)  
   - [Sentience](#sentience)  
3. [Installation & Usage](#installation--usage)  
4. [Repository Structure](#repository-structure)  
5. [Contributing](#contributing)  
6. [License](#license)  
7. [Roadmap: The Future of AI on BNB Chain](#roadmap-the-future-of-ai-on-bnb-chain)

---

## Overview

ArtificialCZ ($AICZ) envisions a cutting‐edge AI ecosystem on the BNB Chain, combining real‐time market insights, robust TA (technical analysis) capabilities, and experimental self‐improvement features within AI agents. The ElizaOS platform serves as an excellent foundation for modular AI design, and these plugins integrate seamlessly into any agent to offer a broad scope of functionality.

---

## Plugins

### AgentTerminal

- **Purpose**: Allows on‐demand queries for external context—like market data, news feeds, or macro info—through an English text query.  
- **Key Features**:
  - A service that sends plain‐English requests to a defined API endpoint (`artificialcz.com` by default).
  - An action that the agent can call whenever it needs fresh data.
  - Perfect for real‐time or near real‐time context injection.

### AutoTA

- **Purpose**: Automates technical analysis, chart generation, and short commentary using an English text request (e.g., “Plot BNB on 4H with RSI”).  
- **Key Features**:
  - A service that posts the user’s request to a TA backend (`artificialcz.com/api0/autota/` by default).
  - Returns chart URLs, analysis text, or combined results for quick, AI‐driven market insights.
  - Provides a single action (`AUTO_TA_REQUEST_CHART`) that the agent can invoke whenever it requires a chart or TA commentary.

### Sentience

- **Purpose**: Experimental self‐improvement module that can rewrite targeted files (like agent config, behaviors, or code) using criticisms collected in the agent’s runtime.  
- **Key Features**:
  - An evaluator that logs “criticisms” or improvement prompts from conversations.
  - A service that (optionally) rewrites files by embedding these criticisms, potentially leading to updated logic or parameters.
  - **Partial Implementation**: Some features remain commented out or undeveloped due to the caution needed for self‐modifying AI.

> **Disclaimer**: The Sentience plugin can pose significant risks if used improperly. Please sandbox, version control, or manually review any changes it makes.

---

## Installation & Usage

1. **Clone** or **Download** this repository:
   ```bash
   git clone https://github.com/ArtificialCZ/aicz-plugin-kit.git
   cd aicz-plugin-kit
   ```
2. **Install Dependencies** (Root):
   ```bash
   npm install
   ```
   *(If you’re using PNPM or Yarn, adapt accordingly.)*
3. **Build Each Plugin**:
   ```bash
   npm run build
   ```

### Adding a Plugin to Your Agent

Example `character.json` snippet:
```json
{
  "plugins": ["@aicz/agentterminal", "@aicz/autota"],
  "settings": {
    "secrets": {
      "AGENTTERMINAL_ENDPOINT": "https://artificialcz.com/api0/agentterminal/",
      "AUTOTA_ENDPOINT": "https://artificialcz.com/api0/autota/"
    }
  }
}
```

---

## Repository Structure

```
aicz-plugin-kit/
├── .gitignore
├── LICENSE
├── README.md
├── package.json            # Root config (private: true)
├── pnpm-workspace.yaml     # (Optional) if using pnpm
└── plugins/
    ├── agentterminal/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    ├── autota/
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    └── sentience/
        ├── package.json
        ├── tsconfig.json
        └── src/
```

Each plugin is self‐contained. For details, see each plugin’s `README.md`.

---

## Contributing

We welcome contributions, bug reports, and feature requests:

- **Pull Requests**: Fork this repo, make your changes, and submit a PR.
- **Issues**: Please open a GitHub issue for enhancements, questions, or problems.

### Development Notes

- **Testing**: Each plugin can have its own tests; add them in `plugins/<plugin>/test/`.
- **CI/CD**: You can configure GitHub Actions or other CI to build/test the monorepo upon pull requests.

---

## Roadmap: The Future of AI on BNB Chain

**Artificial CZ ($AICZ) Roadmap – The Future of AI on BNB Chain**  
Artificial CZ ($AICZ) is evolving beyond just a meme-driven AI agent—it’s becoming the ultimate AI-powered crypto companion on BNB Chain. Below is our roadmap outlining the next phase of development, focusing on AI intelligence, user utility, and token-driven incentives.

### Phase 1: Advanced Market Intelligence (In Progress)

- **Live Market Data & Full Context Awareness**  
  AICZ will have real-time access to crypto market data, processing price movements, trends, and auxiliary information for instant market insights.  
  It will analyze on-chain data, news sentiment, and macro trends, providing a personalized AI perspective for traders and investors.

- **AI-Generated Technical Analysis & Charting**  
  AICZ will go beyond standard indicators by plotting support/resistance zones, identifying potential reversal points, and highlighting trends on auto-generated charts.  
  Users will receive custom TA insights on demand, making AICZ the most useful AI analyst in the space.

### Phase 2: AI Agent Deployment Platform (Coming Soon)

- **No-Code AI Agent Deployment**  
  Users will be able to deploy their own AI agents directly from our website using an intuitive no-code interface.  
  Agents will have the option to include AICZ’s custom AI tools for market analysis, TA, news synthesis, and more.

- **Token-Powered AI Services**  
  Deployment and customization of AI agents will be paid for in $AICZ tokens.  
  A portion of platform revenue will be shared with $AICZ holders, creating a sustainable token utility loop.

- **AI Image & Video Generation**  
  Custom AI agents will have access to image and video generation plugins, allowing for crypto-themed AI media creation.  
  Users can create memes, infographics, and personalized AI content, enhancing engagement across social media and communities.

### Phase 3: BNB Chain Telegram Trading Bot (Planned Development)

- **AI-Powered Trading Bot with Plain English Commands**  
  AICZ will integrate into Telegram, offering a fully interactive trading assistant for BNB users.  
  Users will be able to talk to AICZ in plain English and execute buy, sell, and limit orders seamlessly.

- **Referral Program & Community Growth**  
  Users will earn rewards through a referral system, incentivizing organic adoption.  
  The trading bot will leverage AICZ’s AI insights for smart trade recommendations.

- **Revenue Sharing for $AICZ Holders**  
  Fees generated by the trading bot will contribute to the $AICZ ecosystem, rewarding token holders through revenue sharing mechanisms.

### Phase 4: Scaling AICZ into the Most Powerful AI Agent in Crypto

- **Continuous improvement** of AICZ’s intelligence to make it the most advanced AI in the Web3 space.  
- **Strategic partnerships** within the BNB Chain ecosystem to drive adoption.  
- **Expansion into multi-chain compatibility**, integrating AI services across different ecosystems.  
- **Community-driven development** where $AICZ holders will influence future upgrades.

This roadmap outlines our commitment to building the most powerful AI agent in the crypto industry while ensuring $AICZ remains a high-utility asset for holders. **The future is AI, and AICZ is leading the way.**

---

> **Contact**:  
> - Website: [ArtificialCZ.com](https://artificialcz.com)  
> - X: [@ArtificialCZ](https://twitter.com/ArtificialCZ)  
> - GitHub: [ArtificialCZ](https://github.com/ArtificialCZ)

_Thank you for your interest in AICZ Plugin Kit! We look forward to your feedback and contributions._