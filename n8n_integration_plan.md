# n8n Integration Plan for HVAC Agent Demo

## Goal
To integrate **n8n** (a workflow automation tool) into the HVAC Agent Demo, replacing or augmenting the existing Python (FastAPI) backend. This serves two purposes:
1.  **Learning**: Master n8n's visual workflow builder.
2.  **Production**: Create a more flexible, low-code backend for handling call logic, integrations, and notifications.

## Why n8n?
-   **Visual Logic**: See the flow of data from the call to the database to the SMS.
-   **Rapid Iteration**: Change logic (e.g., "Send email instead of SMS") without redeploying code.
-   **Integrations**: Native nodes for OpenAI, Supabase, Twilio, Google Sheets, etc.

## Proposed Architecture

Currently, the `backend/` (FastAPI) handles:
1.  Receiving Vapi webhooks.
2.  Analyzing calls with GPT-4.
3.  Saving to Supabase.
4.  Sending Twilio SMS.

**New Architecture with n8n:**
-   **Vapi.ai** sends webhooks directly to an **n8n Webhook Node**.
-   **n8n Workflow** handles the logic:
    1.  **Webhook**: Receives call data.
    2.  **OpenAI Node**: Analyzes the transcript (Emergency vs. Routine).
    3.  **Supabase Node**: Inserts the call record and analysis into the database.
    4.  **If/Else Switch**: Checks if `is_emergency` is true.
    5.  **Twilio Node**: Sends SMS to the technician if emergency.
-   **Frontend (Next.js)**: Continues to read from Supabase to display the dashboard.

*Note: The FastAPI backend can eventually be deprecated or kept for specific complex tasks.*

## Implementation Phases

### Phase 1: Setup & Hello World
1.  **Set up n8n**:
    -   *Option A (Recommended for learning)*: Sign up for n8n Cloud (free trial available).
    -   *Option B (Dev)*: Run locally via Docker (`docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n`).
    -   *Option C (Self-hosted)*: Deploy to a VPS (e.g., Railway, DigitalOcean).
2.  **Create Credentials**: Add API keys for OpenAI, Supabase, and Twilio in n8n.
3.  **Test Workflow**: Create a simple webhook that receives data and logs it.

### Phase 2: Replicate "Emergency Detection" Workflow
We will rebuild the core logic from `ai_handler.py` in n8n.

**Workflow Steps:**
1.  **Webhook (POST)**: Listen for Vapi `call.analysis.completed` or `call.ended` events.
2.  **Set Data**: Extract `transcript`, `summary`, and `customer_phone`.
3.  **OpenAI (Chat Model)**:
    -   System Prompt: "You are an HVAC dispatcher. Analyze this transcript..."
    -   Output: JSON with `{ "priority": "high", "category": "gas_leak" }`.
4.  **Supabase (Insert)**:
    -   Table: `calls`
    -   Map fields: `transcript`, `priority`, `category`.
5.  **Switch (If)**:
    -   Condition: `priority` string equals `high`.
6.  **Twilio (Send SMS)**:
    -   To: Technician Number.
    -   Body: "URGENT: Gas leak reported at [Address]. Call [Customer]."

### Phase 3: Integration & Testing
1.  **Update Vapi**: Change the Vapi assistant's `serverUrl` to the new n8n Webhook URL.
2.  **Test Call**: Make a demo call (e.g., "I smell gas").
3.  **Verify**:
    -   Check n8n execution logs (visual debug).
    -   Check Supabase table for new record.
    -   Check real phone for SMS.

### Phase 4: Advanced Features (Optional)
-   **Daily Reports**: Use an **Interval Node** (Cron) to run every day at 6 PM, query Supabase for today's calls, generate a summary with OpenAI, and email it to the owner.
-   **CRM Sync**: Add a node to push customer data to HubSpot or Google Sheets.

## Next Steps
1.  Confirm which n8n setup you want to use (Cloud vs. Local/Docker).
2.  I can generate the specific JSON for the n8n workflow that you can import directly to get started.
