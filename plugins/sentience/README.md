# @aicz/sentience (v0.8.0)

**Sentience** is an **experimental** ElizaOS plugin that tries to allow an AI agent to rewrite or “improve” certain files, guided by criticisms found in the runtime. **Use with great caution.**

## Overview

- **SelfImprovementService** – A service that can open and rewrite targeted files using the agent’s internal suggestions (or user-provided criticisms).
- **CriticismEvaluator** – Collects criticisms or improvement hints from each conversation turn and caches them.
- **(Optional) Periodic Routines** – The plugin can attempt to refine or rebuild the files routinely, but that code is left partial.

## Usage

1. **Install/Reference**:
   ```bash
   npm install @aicz/sentience
