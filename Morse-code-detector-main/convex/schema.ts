import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  sessions: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.string(),
    mode: v.union(v.literal("eye"), v.literal("sound"), v.literal("both")),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    totalSignals: v.number(),
    totalWords: v.number(),
  }).index("by_user", ["userId"]).index("by_session", ["sessionId"]),

  morseDetections: defineTable({
    sessionId: v.string(),
    userId: v.optional(v.id("users")),
    timestamp: v.number(),
    inputType: v.union(v.literal("blink"), v.literal("sound")),
    signalType: v.union(v.literal("dot"), v.literal("dash"), v.literal("space")),
    duration: v.number(),
    confidence: v.number(),
  }).index("by_session", ["sessionId"]).index("by_user_time", ["userId", "timestamp"]),

  decodedOutput: defineTable({
    sessionId: v.string(),
    userId: v.optional(v.id("users")),
    timestamp: v.number(),
    morseCode: v.string(),
    decodedLetter: v.optional(v.string()),
    decodedWord: v.optional(v.string()),
    completeSentence: v.string(),
  }).index("by_session", ["sessionId"]).index("by_user_time", ["userId", "timestamp"]),

  calibrationSettings: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.string(),
    eyeBlinkThreshold: v.number(),
    soundThreshold: v.number(),
    dotDurationMs: v.number(),
    dashDurationMs: v.number(),
    letterSpaceMs: v.number(),
    wordSpaceMs: v.number(),
  }).index("by_user", ["userId"]).index("by_session", ["sessionId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
