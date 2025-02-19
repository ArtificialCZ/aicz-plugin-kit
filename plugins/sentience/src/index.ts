/**
 * @file index.ts
 * @description The Sentience plugin. Allows partial self-improvement
 * by rewriting code or config files. This code is incomplete.
 */

import { Plugin, Evaluator, Service, IAgentRuntime, Memory } from "@elizaos/core";
import * as fs from "fs";
import * as path from "path";

/**
 * SelfImprovementService
 * ----------------------
 * This service tries to open files specified in SENTIENCE_FILE_PATHS and
 * rewrite them based on "criticisms" collected in the agent's runtime.
 * 
 * WARNING: This  may not be safe for usage.
 * Expand or refine logic to parse, interpret, or version-control changes.
 */
class SelfImprovementService implements Service {
  public name = "SelfImprovementService";

  /**
   * rewriteFiles()
   * Called to do a single pass of rewriting or updating the target files,
   * using the aggregated criticisms from 'criticismsCache'.
   * 
   * In real usage, you'd parse criticisms, gather the original file text,
   * generate new text (maybe calling an LLM with a specialized prompt),
   * then decide how to merge changes. 
   */
  public async rewriteFiles(
    runtime: IAgentRuntime,
    criticismsCache: string[],
  ): Promise<string> {
    const filePathsRaw = runtime.getSetting("SENTIENCE_FILE_PATHS") || "";
    const filePaths = filePathsRaw
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    if (filePaths.length === 0) {
      return "No file paths configured for Sentience plugin.";
    }

    if (criticismsCache.length === 0) {
      return "No criticisms found. Skipping self-improvement.";
    }

    // (Placeholder) Append the criticisms to the file as a comment
    // in code or a top-level JSON field for demonstration.

    let summary = "";
    for (const relativePath of filePaths) {
      const absolutePath = path.resolve(relativePath);

      try {
        // Attempt to read the file
        const originalContent = fs.readFileSync(absolutePath, "utf-8");

        // For demonstration, we just add them as a comment or top-level heading:
        // In real usage, you'd run an LLM to produce a genuinely improved version.
        let newContent = originalContent;

        // If it's JSON, you might parse and update. If it's code, you might place
        // a comment block. We skip actual parsing for now.
        newContent += "\n\n// Self-Improvement Suggestions:\n";
        criticismsCache.forEach((crit, i) => {
          newContent += `// [${i+1}] ${crit}\n`;
        });

        // Write the updated file
        fs.writeFileSync(absolutePath, newContent, "utf-8");

        summary += `Updated file: ${relativePath}\n`;
      } catch (err) {
        summary += `Failed to update file: ${relativePath} (error: ${err})\n`;
      }
    }

    return summary.trim();
  }

  // Optional background approach:
  //
  // public startPeriodicSelfImprovement(runtime: IAgentRuntime) {
  //   // For a real system, you might set an interval to run rewriteFiles() 
  //   // every few hours or after certain triggers.
  //   // 
  //   // setInterval(async () => {
  //   //   // gather criticisms from somewhere in memory or a cache
  //   //   // call rewriteFiles()
  //   // }, 3600000);
  // }
}

/**
 * CriticismEvaluator
 * ------------------
 * This evaluator looks at each new message, searching for statements or
 * user feedback that might be negative or suggest improvements. We store
 * these criticisms in a simple array for the service to use later.
 * 
 * You might store them in memory or a specific database, but here's a minimal approach.
 */
const criticismsCache: string[] = []; // In-memory for demonstration

const CriticismEvaluator: Evaluator = {
  name: "CriticismEvaluator",
  description: "Captures criticisms or improvement suggestions from conversation and caches them.",
  
  // For demonstration, we'll always run. A real system might parse messages to see if there's negative sentiment.
  async validate(runtime, message) {
    return true;
  },

  // Basic approach: If the message contains "improve:" or "critique:",
  // we record everything after that as a criticism. 
  async handler(runtime, message) {
    const text = message.text || "";
    const lower = text.toLowerCase();

    let captured = "";
    if (lower.includes("improve:")) {
      captured = text.split("improve:")[1]?.trim() || "";
    } else if (lower.includes("critique:")) {
      captured = text.split("critique:")[1]?.trim() || "";
    }

    if (captured) {
      criticismsCache.push(captured);
      // You could store it in a more persistent place or do advanced parsing.
    }

    // Return null or some data. We'll do nothing here.
    return null;
  }
};

/**
 * Sentience Plugin
 * ----------------
 * Registers the SelfImprovementService and CriticismEvaluator. 
 * Partially demonstrates how an agent might refine code or config files
 * using cached criticisms from the conversation. 
 */
export const sentiencePlugin: Plugin = {
  name: "sentience",
  description: "Experimental plugin letting the agent rewrite specified files based on criticisms or improvement suggestions.",
  
  // We only instantiate our single service for manual or future calls
  services: [ new SelfImprovementService() ],

  // CriticismEvaluator to accumulate improvement ideas from conversation
  evaluators: [ CriticismEvaluator ],

  // Optional approach: You might define an action or an evaluator 
  // that automatically calls rewriteFiles() after a certain threshold 
  // of criticisms.:
  // 
  // actions: [ ... ],
};

export default sentiencePlugin;
