# Advanced HVAC Workflow Design

## Objective
Build a production-grade, "maximum complexity" n8n workflow that handles the entire lifecycle of an incoming call from Vapi.ai. This workflow will replace the Python backend's logic and add significant intelligence and routing capabilities.

## Workflow Modules

### 1. Trigger & Ingestion
*   **Node: Vapi Webhook**
    *   **Event**: `call.analysis.completed` (contains the full transcript, summary, and recording).
    *   **Data**: Extract `customer_phone`, `transcript`, `call_summary`, `call_cost`.

### 2. The "AI Brain" (Intelligence Layer)
Instead of a single prompt, we will use a chain of thought:
*   **Node: AI Classifier (OpenAI)**
    *   **Goal**: Categorize the call.
    *   **Categories**: `Emergency`, `Sales/Quote`, `Scheduling`, `Spam`, `Complaint`.
    *   **Output**: JSON `{ "category": "Emergency", "confidence": 0.95 }`.
*   **Node: Entity Extractor (OpenAI)**
    *   **Goal**: Extract structured data.
    *   **Fields**: `Customer Name`, `Service Address`, `Issue Description`, `Equipment Type` (e.g., Furnace, AC, Heat Pump).

### 3. CRM & Data Layer (Supabase)
*   **Node: Customer Lookup**
    *   **Action**: Query `customers` table by `phone_number`.
*   **Node: Customer Upsert**
    *   **Logic**: If customer exists, update `last_contacted`. If new, create record with extracted Name/Address.
*   **Node: Log Call**
    *   **Action**: Insert into `calls` table linked to `customer_id`. Store the recording URL and cost.

### 4. Operational Logic (Routing)
*   **Node: Region Detector**
    *   **Logic**: Analyze Area Code or Zip Code (from address).
    *   **Rules**:
        *   Region A (North): Furnace/Heating focus.
        *   Region B (South): AC/Cooling focus.
*   **Node: Schedule Check**
    *   **Logic**: Check `timestamp`. Is it M-F, 8am-5pm? Or Weekend/Night?
*   **Node: Technician Router**
    *   **Logic**: Select technician phone number based on **Region** AND **Schedule**.
    *   *Example*: "North + After Hours" -> Text Bob. "South + Business Hours" -> Text Alice.

### 5. Action & Notification Layer
*   **Branch A: Emergency**
    *   **Technician SMS**: "URGENT: [Category] at [Address]. [Summary]. <Click to Call>"
    *   **Slack Alert**: Post to `#emergency-dispatch` with red alert color.
*   **Branch B: Sales/Routine**
    *   **Office Email**: Send summary to office manager for follow-up.
    *   **Customer SMS**: "Thanks for calling Bob's HVAC. We've received your request and will call you back shortly."
*   **Branch C: Spam**
    *   **Action**: Do nothing (or log to "Blocked Numbers").

## Implementation Steps (in this chat)
1.  **Credentials Definition**: Define what keys we need for all these services.
2.  **JSON Construction**: I will build this workflow node-by-node in a large JSON file.
3.  **Review**: We will inspect the JSON to ensure the logic (e.g., the "If/Else" rules) matches your business rules.
