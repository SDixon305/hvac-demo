# Demo-Optimized HVAC Workflow Design

## Objective
Create a theatrical, reliable demo workflow. The goal is not "real" CRM management, but a flawless **simulation** that impresses "Bob" (the potential client).

## Key Constraints & Features
1.  **Simulated "Existing Client" Flow**: The AI will "look up" the caller and "confirm" their details.
2.  **Hardcoded "After Hours"**: Always treat calls as emergency/after-hours to trigger the SMS flow.
3.  **User = Technician**: The SMS notification goes to *your* cell phone to demonstrate the alert.
4.  **Dashboard "Fresh Start"**: Every demo call should reset the dashboard to show:
    *   The Call just completed (Real).
    *   2 "Dummy" calls (Static) to make it look active.

## Workflow Architecture

We will build **Two** distinct workflows in n8n (or two triggers in one workflow):

### Part 1: The "Real-Time" Tool (During Call)
*   **Trigger**: Webhook `POST /webhook/lookup-customer` (Called by Vapi Function).
*   **Logic**:
    *   Receive `phone_number`.
    *   **Wait** (Optional): Add 500ms delay to simulate "searching".
    *   **Return JSON**:
        ```json
        {
          "found": true,
          "name": "John Doe",
          "address": "123 Demo Lane, HVAC City",
          "last_service": "6 months ago",
          "cell_on_file": true
        }
        ```
*   **Effect**: The Vapi Voice AI says: *"I see you're in our system, John. Are you still at 123 Demo Lane?"*

### Part 2: The "Post-Call" Processor (After Hangup)
*   **Trigger**: Webhook `POST /webhook/call-ended` (Vapi `end-of-call-report`).
*   **Step 1: AI Analysis (OpenAI)**
    *   Analyze transcript for: `Issue`, `Sentiment`, `Emergency Level` (Always High for demo?).
*   **Step 2: Dashboard Prep (Supabase)**
    *   **Action**: `DELETE FROM calls` (Wipe previous demo data).
    *   **Action**: `INSERT` 2 Dummy Rows (e.g., "Routine Maintenance - Completed", "Filter Change - Scheduled").
    *   **Action**: `INSERT` Real Call (The one just finished).
*   **Step 3: The "Magic" SMS (Twilio)**
    *   **To**: [User's Cell Phone]
    *   **Body**: "🚨 **EMERGENCY DISPATCH** 🚨\n\nClient: John Doe\nIssue: [AI Summary]\nAddress: 123 Demo Lane\n\nReply 'ACCEPT' to claim."

## Implementation Plan
1.  **Build JSON**: Construct the n8n workflow with these two parallel paths.
2.  **Vapi Config**: You will need to add the `lookup-customer` tool definition to your Vapi Assistant (I will provide the schema).
3.  **Testing**: We run a call, verify the "lookup" works, and then check your phone for the SMS.
