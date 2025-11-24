# n8n Credentials Setup Guide

## Overview
This guide walks you through setting up all the API credentials needed for the HVAC Demo workflow in n8n.

---

## Step 1: Gather Your API Keys

You'll need the following credentials. If you don't have them yet, follow the links to get them:

### 1. **OpenAI API Key**
- **Where to get it**: https://platform.openai.com/api-keys
- **What it's for**: AI analysis of call transcripts
- **Format**: `sk-proj-...` (starts with "sk-")

### 2. **Twilio Credentials**
- **Where to get it**: https://console.twilio.com/
- **What you need**:
  - Account SID (starts with "AC...")
  - Auth Token (hidden by default, click "show")
  - Phone Number (e.g., +15551234567)
- **What it's for**: Sending SMS notifications

### 3. **Supabase Credentials**
- **Where to get it**: https://supabase.com/dashboard/project/_/settings/api
- **What you need**:
  - Project URL (e.g., https://xxxxx.supabase.co)
  - Anon/Public Key (starts with "eyJ...")
- **What it's for**: Storing call data in the dashboard

### 4. **Your Demo Phone Number**
- **What it is**: YOUR personal cell phone number
- **Format**: +1XXXXXXXXXX (include country code)
- **What it's for**: Receiving the "technician alert" SMS during demos

---

## Step 2: Add Credentials to n8n

### A. Open n8n
1. Go to http://localhost:5678
2. If this is your first time, create an owner account

### B. Import the Workflow
1. Click the menu (☰) in top right
2. Select **"Import from File"**
3. Choose: `/Users/sethdixon/AI SLOP/HVAC Agent Demo/n8n/workflow_demo.json`
4. Click **"Import"**

### C. Set Up OpenAI Credential
1. Click on the **"Analyze Call with AI"** node (it will have a red warning)
2. Click **"Create New Credential"** under "Credential to connect with"
3. Name it: `OpenAI - HVAC Demo`
4. Paste your OpenAI API Key
5. Click **"Save"**

### D. Set Up Twilio Credential
1. Click on any of the SMS nodes (e.g., "SMS to Tech (Emergency)")
2. Under "Generic Auth Type", select **"HTTP Basic Auth"**
3. Click **"Create New Credential"**
4. Name it: `Twilio - HVAC Demo`
5. Fill in:
   - **Username**: Your Twilio Account SID (starts with AC...)
   - **Password**: Your Twilio Auth Token
6. Click **"Save"**
7. Repeat for all 4 SMS nodes (or select the same credential)

### E. Set Up Supabase Credential
1. Click on the **"Clear Old Demo Data"** node
2. Click **"Create New Credential"**
3. Name it: `Supabase - HVAC Demo`
4. Fill in:
   - **Host**: Your Supabase URL (without https://)
   - **Service Role Secret**: Your Supabase Anon Key
5. Click **"Save"**
6. Repeat for all Supabase nodes

---

## Step 3: Set Environment Variables

n8n needs to know your phone numbers. We'll set these as environment variables.

### Option A: Set in n8n UI (Recommended)
1. Go to **Settings** (gear icon in sidebar)
2. Click **"Variables"**
3. Add these variables:
   - `DEMO_USER_PHONE`: Your cell phone (e.g., +15551234567)
   - `TWILIO_PHONE_NUMBER`: Your Twilio phone number (e.g., +15559876543)

### Option B: Set in Docker Compose
Edit `/Users/sethdixon/AI SLOP/HVAC Agent Demo/n8n/docker-compose.yml` and add:
```yaml
environment:
  - DEMO_USER_PHONE=+15551234567
  - TWILIO_PHONE_NUMBER=+15559876543
```

Then restart n8n:
```bash
cd /Users/sethdixon/AI\ SLOP/HVAC\ Agent\ Demo/n8n
docker compose restart
```

---

## Step 4: Test the Workflow

1. Click the **"Execute Workflow"** button in n8n
2. Click on the **"Webhook: Call Ended"** node
3. Click **"Listen for Test Event"**
4. Send a test webhook (I can help you with this)

---

## Quick Reference: What Goes Where

| Service | Credential Type | Used In Nodes |
|---------|----------------|---------------|
| OpenAI | API Key | "Analyze Call with AI" |
| Twilio | HTTP Basic Auth | All 4 SMS nodes |
| Supabase | Supabase | All database nodes |
| Phone Numbers | Environment Variables | Referenced in SMS nodes |

---

## Next Steps

Once you've added all credentials:
1. Save the workflow
2. Activate it (toggle in top right)
3. You'll get webhook URLs for each trigger
4. We'll configure Vapi to call these URLs
