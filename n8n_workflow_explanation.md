# n8n Demo Workflow Explained

This document breaks down the **"HVAC Demo Workflow"** (`n8n/workflow_demo.json`) step-by-step. The workflow is designed to run two separate processes: one *during* the call (to fake a database lookup) and one *after* the call (to update the dashboard and alert you).

---

## Part 1: The "Fake Lookup" (Runs During the Call)
*Triggered when the AI Assistant "checks the system" for the caller.*

1.  **Node: Webhook (Lookup Tool)**
    *   **What it does**: Listens for a signal from Vapi.ai.
    *   **Why**: When the caller asks "Do you have my info?", Vapi hits this URL to ask for data.
2.  **Node: Simulate Delay (Wait)**
    *   **What it does**: Pauses for **0.5 seconds**.
    *   **Why**: If the computer answers instantly (0ms), it feels fake. A slight pause makes it feel like it's actually searching a database.
3.  **Node: Mock Customer Data (Set)**
    *   **What it does**: Returns a hardcoded "Cheat Sheet" of data.
    *   **The Data**:
        *   **Name**: John Doe
        *   **Address**: 123 Demo Lane, HVAC City
        *   **Status**: Existing Customer (Last service 6 months ago)
    *   **Why**: This ensures the demo *always* works. We don't want "risk a database error during a live pitch. The AI will read this data back to the caller.

---

## Part 2: The "Post-Call Processor" (Runs After Hangup)
*Triggered the moment the call ends.*

1.  **Node: Webhook (Call Ended)**
    *   **What it does**: Receives the full recording and transcript from Vapi.
2.  **Node: Analyze Call (OpenAI)**
    *   **What it does**: Sends the transcript to GPT-4.
    *   **The Prompt**: "You are a dispatcher. Summarize this call and decide if it's an emergency."
    *   **Why**: We need a clean, short summary for the SMS and Dashboard (e.g., "Gas leak in basement").
3.  **Node: Clear Dashboard (Supabase)**
    *   **What it does**: Runs `DELETE FROM calls`.
    *   **Why**: This wipes the slate clean. We don't want "Bob's" demo to show data from "Alice's" demo yesterday.
4.  **Node: Insert Dummies (Supabase)**
    *   **What it does**: Adds 2 fake "past calls" to the database.
    *   **Why**: A dashboard with only 1 call looks sad. We add fake "completed" jobs (like a "Filter Change" from 2 hours ago) to make the business look active and busy.
5.  **Node: Insert Real Call (Supabase)**
    *   **What it does**: Saves the *actual* call you just finished.
    *   **Why**: This appears at the top of the list as "Just Now", showing the real-time capability.
6.  **Node: Send SMS to User (Twilio)**
    *   **What it does**: Sends a text message to **YOUR** cell phone.
    *   **The Message**: "🚨 EMERGENCY DISPATCH: John Doe at 123 Demo Lane. Issue: [AI Summary]"
    *   **Why**: This is the "magic moment" where you show the client your phone and say, "See? I got the alert instantly."

---

## Summary of Logic
*   **Is it a real CRM?** No. It deletes everything every time.
*   **Is it "After Hours"?** Yes. The logic assumes every demo call is an emergency to trigger the SMS.
*   **Who gets the text?** You (the user), acting as the "Technician".
