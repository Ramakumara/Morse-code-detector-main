import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Morse code dictionary
const MORSE_TO_LETTER: Record<string, string> = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
  "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
  "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
  ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
  "--..": "Z", "-----": "0", ".----": "1", "..---": "2", "...--": "3",
  "....-": "4", ".....": "5", "-....": "6", "--...": "7", "---..": "8",
  "----.": "9", "--..--": ",", ".-.-.-": ".", "..--..": "?", "-.-.--": "!",
  "-....-": "-", "-..-.": "/", ".--.-.": "@", "-.--.": "(", "-.--.-": ")"
};

export const createSession = mutation({
  args: {
    mode: v.union(v.literal("eye"), v.literal("sound"), v.literal("both")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session = await ctx.db.insert("sessions", {
      userId: userId || undefined,
      sessionId,
      mode: args.mode,
      startTime: Date.now(),
      totalSignals: 0,
      totalWords: 0,
    });

    // Create default calibration settings
    await ctx.db.insert("calibrationSettings", {
      userId: userId || undefined,
      sessionId,
      eyeBlinkThreshold: 0.7,
      soundThreshold: 0.5,
      dotDurationMs: 200,
      dashDurationMs: 600,
      letterSpaceMs: 600,
      wordSpaceMs: 1400,
    });

    return { sessionId, session };
  },
});

export const recordDetection = mutation({
  args: {
    sessionId: v.string(),
    inputType: v.union(v.literal("blink"), v.literal("sound")),
    signalType: v.union(v.literal("dot"), v.literal("dash"), v.literal("space")),
    duration: v.number(),
    confidence: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    
    return await ctx.db.insert("morseDetections", {
      sessionId: args.sessionId,
      userId: userId || undefined,
      timestamp: Date.now(),
      inputType: args.inputType,
      signalType: args.signalType,
      duration: args.duration,
      confidence: args.confidence,
    });
  },
});

export const saveDecodedOutput = mutation({
  args: {
    sessionId: v.string(),
    morseCode: v.string(),
    decodedLetter: v.optional(v.string()),
    decodedWord: v.optional(v.string()),
    completeSentence: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    
    return await ctx.db.insert("decodedOutput", {
      sessionId: args.sessionId,
      userId: userId || undefined,
      timestamp: Date.now(),
      morseCode: args.morseCode,
      decodedLetter: args.decodedLetter,
      decodedWord: args.decodedWord,
      completeSentence: args.completeSentence,
    });
  },
});

export const getSessionHistory = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const detections = await ctx.db
      .query("morseDetections")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("asc")
      .collect();

    const outputs = await ctx.db
      .query("decodedOutput")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .order("asc")
      .collect();

    return { detections, outputs };
  },
});

export const getUserSessions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

export const updateCalibration = mutation({
  args: {
    sessionId: v.string(),
    eyeBlinkThreshold: v.number(),
    soundThreshold: v.number(),
    dotDurationMs: v.number(),
    dashDurationMs: v.number(),
    letterSpaceMs: v.number(),
    wordSpaceMs: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    
    const existing = await ctx.db
      .query("calibrationSettings")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        eyeBlinkThreshold: args.eyeBlinkThreshold,
        soundThreshold: args.soundThreshold,
        dotDurationMs: args.dotDurationMs,
        dashDurationMs: args.dashDurationMs,
        letterSpaceMs: args.letterSpaceMs,
        wordSpaceMs: args.wordSpaceMs,
      });
    }

    return existing;
  },
});

export const getCalibrationSettings = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("calibrationSettings")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .unique();
  },
});

export const endSession = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .unique();

    if (session) {
      await ctx.db.patch(session._id, {
        endTime: Date.now(),
      });
    }

    return session;
  },
});
