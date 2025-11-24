# 🚀 Tunnel is Running (Stable URL)

I have restarted the tunnel with a **stable subdomain** so it shouldn't change again.

**Your Public URL:** `https://hvac-demo-seth.loca.lt`

---

## Final Configuration Steps

### 1. Configure Vapi Server URL
1. Go to your Vapi Dashboard -> **Phone Numbers**.
2. Select your number.
3. Find the **"Server URL"** field.
4. Paste this exact URL:
   ```
   https://hvac-demo-seth.loca.lt/webhook/call-ended
   ```

### 2. Add the Tools
1. In Vapi, go to the **"Assistants"** section -> Select Assistant -> **"Tools"**.
2. **Delete** the old tools if you added them.
3. **Copy the JSON** from the file `n8n/VAPI_TOOLS.json`.
   *   *Note:* I have updated this file with the new stable URL.
4. Paste it and **Save**.

---

## 3. Test It!
1. Call your Vapi phone number.
2. Say: *"Hi, I'm an existing customer, John Doe."*
3. Watch n8n! You should see the **Lookup Customer** webhook trigger instantly.
4. Hang up.
5. Watch n8n! You should see the **Call Ended** webhook trigger, followed by an SMS to your phone.
