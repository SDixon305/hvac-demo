# HVAC Agent Demo - Master Workflow (Final Version)

This folder contains the **single, definitive workflow** you need to run the entire HVAC Agent Demo. Ignore all previous versions in other folders.

## 1. What's Included?

- **`HVAC_Master_Workflow.json`**: The complete n8n workflow that handles:
  - Incoming Vapi Calls (Webhooks)
  - Real-time Database Updates (Supabase)
  - Emergency SMS Alerts (Twilio)
  - Tool Logic (Check Availability, Book Appointment, Lookup Customer)
  - **Simulation Mode** (Fake calls for testing)

- **`VAPI_TOOLS.json`**: The exact tool definitions you need to copy-paste into your Vapi Assistant.

## 2. Installation Steps

1.  **Import Workflow**:
    - Open your local n8n.
    - Go to "Workflows" -> "Import from File".
    - Select `n8n/FINAL/HVAC_Master_Workflow.json`.

2.  **Configure Credentials**:
    - Open the workflow.
    - Double-click the **Supabase** nodes and select your credential (or create one using the URL and Key provided in previous steps).
    - Double-click the **Twilio** node and select your credential.

3.  **Set Up Vapi**:
    - Go to your Vapi Dashboard -> Assistant -> Tools.
    - Copy the content of `n8n/FINAL/VAPI_TOOLS.json`.
    - **IMPORTANT**: Replace `{{YOUR_NGROK_URL}}` with your actual public n8n URL (e.g., `https://your-name.ngrok-free.app`).

4.  **Activate**:
    - Toggle the workflow to **Active** in n8n.

## 3. How to Test

### Option A: Real Call
1.  Call your Vapi phone number: **1-844-671-3994**.
2.  Speak to the agent.
3.  Watch the **Live Dashboard** on your frontend update in real-time.

### Option B: Simulation (No Credits Used)
1.  Open the workflow in n8n.
2.  Find the **"Simulate Webhook"** node at the bottom.
3.  Click "Execute Node" (or send a POST request to `YOUR_NGROK_URL/webhook/simulate-call`).
4.  This will create a fake "Emergency" call in your dashboard instantly.

## 4. Troubleshooting

- **"Error fetching options from Supabase"**: This means your credentials in n8n are wrong. Re-enter the Supabase URL and Anon Key.
- **Dashboard not updating**: Ensure your frontend is connected to the same Supabase project (`hvac-agent-demo`).
