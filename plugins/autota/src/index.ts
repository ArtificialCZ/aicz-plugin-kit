/**
 * @file index.ts
 * @description AutoTA allows the agent to
 * request a technical analysis chart by sending an English text query
 * (e.g. "Plot BTC on the 4H timeframe with RSI and MACD") to a
 * backend at https://artificialcz.com/api0/autota/.
 */

import { Plugin, Action, Service, IAgentRuntime } from "@elizaos/core";
import fetch from "node-fetch";

/**
 * AutoTaService
 * -------------
 * This service takes a plain-English TA request and sends it to
 * the configured endpoint. The endpoint is expected to return
 * a JSON structure containing chart info or analysis text.
 */
class AutoTaService implements Service {
  // The name used for runtime.getService<AutoTaService>("AutoTaService")
  public name = "AutoTaService";

  /**
   * generateChart()
   * Takes the userRequest string (English text specifying ticker, timeframe, etc.)
   * and POSTs it to the endpoint. Expects a JSON response with either
   * a chartUrl, analysis text, or both.
   */
  public async generateChart(runtime: IAgentRuntime, userRequest: string): Promise<string> {
    // Default endpoint if not provided
    const endpoint = runtime.getSetting("AUTOTA_ENDPOINT")
      || "https://artificialcz.com/api0/autota/";

    let output = "(No AutoTA response)";

    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userRequest })
      });

      if (!resp.ok) {
        throw new Error(`AutoTaService: received status ${resp.status}`);
      }
      const data = await resp.json();

      // We might expect data.chartUrl, data.analysis, etc.
      const chartUrl = data.chartUrl || "(No chart URL)";
      const analysis = data.analysis || "(No analysis)";

      // Example final text combining chart link and analysis
      output = `Chart URL: ${chartUrl}\nAnalysis: ${analysis}`;
    } catch (err) {
      console.error("AutoTaService generateChart error:", err);
      output = "(AutoTaService encountered an error generating chart)";
    }

    return output;
  }
}

/**
 * Action: AUTO_TA_REQUEST_CHART
 * -----------------------------
 * The LLM can produce this action with something like:
 *   <ACTION: AUTO_TA_REQUEST_CHART>{ "query": "Plot BNB with MACD on 1h" }
 * This triggers the service to call the API and return
 * a textual result (including chart URL).
 */
const autoTaAction: Action = {
  name: "AUTO_TA_REQUEST_CHART",
  description: "Sends an English text request for a technical analysis chart to the AutoTA API.",
  examples: [
    "<ACTION: AUTO_TA_REQUEST_CHART>{ \"query\": \"BTC chart, daily timeframe, show RSI.\" }"
  ],

  async validate(runtime, message, params) {
    // Must provide a 'query' field with a non-empty string
    return typeof params?.query === "string" && params.query.trim().length > 0;
  },

  async handler(runtime, message, params) {
    const userRequest = params.query as string;

    // Retrieve our service from the runtime
    const service = runtime.getService<AutoTaService>("AutoTaService");
    if (!service) {
      throw new Error("AutoTaService not found. Check plugin registration.");
    }

    // Generate the chart (or analysis)
    const result = await service.generateChart(runtime, userRequest);
    // Return the final text to the conversation
    return `{result}`;
  }
};

/**
 * autoTaPlugin
 * ------------
 */
export const autoTaPlugin: Plugin = {
  name: "autota",
  description: "Generates technical analysis charts based on an English request string (ticker, timeframe, etc.).",
  services: [ new AutoTaService() ],
  actions: [ autoTaAction ]
};

export default autoTaPlugin;
