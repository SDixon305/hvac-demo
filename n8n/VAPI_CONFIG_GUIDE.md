# VAPI Tool Configuration Guide

I've broken this down into 3 separate tools. For each one, click "Create Tool" in VAPI and copy/paste the exact text below into the corresponding fields.

---

## Tool 1: Customer Lookup

**1. Tool Name**
Copy and paste this:
`lookup_customer`

**2. Tool Description**
Copy and paste this:
`Look up a customer by phone number to see if they are an existing client.`

**3. Parameters (The tricky part!)**
Copy this **ENTIRE** block of code below and paste it into the "Parameters" or "Schema" box:
```json
{
    "type": "object",
    "properties": {
        "phone_number": {
            "type": "string",
            "description": "The customer's phone number."
        }
    },
    "required": [
        "phone_number"
    ]
}
```

**4. Server URL**
Copy and paste this:
`https://hvac-demo-seth.loca.lt/webhook/lookup-customer`

---

## Tool 2: Dispatch Emergency

**1. Tool Name**
Copy and paste this:
`dispatch_emergency`

**2. Tool Description**
Copy and paste this:
`Dispatch a technician for an emergency situation.`

**3. Parameters**
Copy this **ENTIRE** block of code below and paste it into the "Parameters" or "Schema" box:
```json
{
    "type": "object",
    "properties": {
        "customer_name": {
            "type": "string",
            "description": "Name of the customer."
        },
        "address": {
            "type": "string",
            "description": "Service address."
        },
        "issue": {
            "type": "string",
            "description": "Brief description of the emergency."
        }
    },
    "required": [
        "customer_name",
        "address",
        "issue"
    ]
}
```

**4. Server URL**
Copy and paste this:
`https://hvac-demo-seth.loca.lt/webhook/dispatch-emergency`

---

## Tool 3: Check Calendar

**1. Tool Name**
Copy and paste this:
`check_calendar`

**2. Tool Description**
Copy and paste this:
`Check for available appointment slots for routine service.`

**3. Parameters**
Copy this **ENTIRE** block of code below and paste it into the "Parameters" or "Schema" box:
```json
{
    "type": "object",
    "properties": {
        "service_type": {
            "type": "string",
            "description": "Type of service needed (e.g., maintenance, tune-up)."
        }
    },
    "required": []
}
```

**4. Server URL**
Copy and paste this:
`https://hvac-demo-seth.loca.lt/webhook/check-calendar`
