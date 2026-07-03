#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { validateIdea } from "./lib/validator.js";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const server = new Server(
  {
    name: "startup-idea-validator",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const ValidateIdeaSchema = z.object({
  idea: z.string().describe("The startup idea to validate"),
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "validate_startup_idea",
        description: "Validates a startup idea and returns a scorecard covering market, risk, competitors, and build path.",
        inputSchema: {
          type: "object",
          properties: {
            idea: {
              type: "string",
              description: "The startup idea to validate",
            },
          },
          required: ["idea"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "validate_startup_idea") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const result = ValidateIdeaSchema.safeParse(request.params.arguments);
  if (!result.success) {
    throw new Error(`Invalid arguments: ${result.error.message}`);
  }

  const { idea } = result.data;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }

  try {
    const scorecard = await validateIdea(idea, apiKey);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(scorecard, null, 2),
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error validating idea: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Startup Idea Validator MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
