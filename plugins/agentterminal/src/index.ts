/**
 * @file index.ts
 * @description AgentTerminal plugin
 * provides a service that sends plain-English queries to
 * https://artificialcz.com/api0/agentterminal/ (or a user-configured
 * endpoint) and returns relevant data to the agent. The agent
 * triggers it via the AGENT_TERMINAL_QUERY action.
 */

import { Plugin, Action, Service, IAgentRuntime } from "@elizaos/core";
import fetch from "node-fetch";

/**
 * AgentTerminalService
 * ---------------------
 * A service class that sends user-specified queries to a backend API
 * at https://artificialcz.com/api0/agentterminal/ (or a configurable URL).
 * Returns the response text for the agent to use as context.
 */
class AgentTerminalService implements Service {
  // Name used to register/retrieve this service in the runtime
  public name = "AgentTerminalService";

  /**
   * query()
   * Takes the agent's runtime and a plain-English query string,
   * sends it in a POST request to the configured endpoint,
   * and returns the result as a string.
   */
  public async query(runtime: IAgentRuntime, userQuery: string): Promise<string> {
    // Default to the artificialcz.com endpoint.
    const endpoint = runtime.getSetting("AGENTTERMINAL_ENDPOINT")
      || "https://artificialcz.com/api0/agentterminal/";

    let responseText = "(No response from AgentTerminal)";

    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery })
      });
      if (!resp.ok) {
        throw new Error(`AgentTerminalService: received status ${resp.status}`);
      }

      const data = await resp.json();
      // We assume 'data.result' or 'data.summary' or some field holds the relevant info
      responseText = data.result
        || data.summary
        || JSON.stringify(data);

    } catch (err) {
      // Log the error, return fallback text
      console.error("AgentTerminalService query error:", err);
      responseText = "(AgentTerminalService encountered an error)";
    }

    return responseText;
  }
}

/**
 * Action: AGENT_TERMINAL_QUERY
 * ----------------------------
 * The agent can invoke this action (by name) with an object
 * like {"query": "Describe current BNB market conditions"},
 * causing the runtime to call AgentTerminalService to retrieve data.
 */
const agentTerminalAction: Action = {
  name: "AGENT_TERMINAL_QUERY",
  description: "Sends an English query to the configured AgentTerminal API and returns relevant data.",
  examples: [
    "<ACTION: AGENT_TERMINAL_QUERY>{ \"query\": \"Tell me about BNB price trends.\" }"
  ],

  async validate(runtime, message, params) {
    // Must provide a 'query' field
    return !!params?.query;
  },

  async handler(runtime, message, params) {
    const query = params.query as string;
    // Retrieve our service from the runtime (it is registered below in the plugin)
    const service = runtime.getService<AgentTerminalService>("AgentTerminalService");

    if (!service) {
      throw new Error("AgentTerminalService not found in runtime. Check plugin registration.");
    }

    // Perform the request
    const resultText = await service.query(runtime, query);

    // Return the resulting text to the conversation
    return `[AgentTerminal BEGIN]\n${resultText}[AGENTTERMINAL END]`;
  }
};

/**
 * agentTerminalPlugin
 * -------------------
 */
export const agentTerminalPlugin: Plugin = {
  name: "agentterminal",
  description: "Allows agents to fetch external context by sending plain-English queries to AICZ API.",
  services: [ new AgentTerminalService() ],
  actions: [ agentTerminalAction ]
};

export default agentTerminalPlugin;
