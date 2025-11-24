# Vapi Tools - Individual Copy/Paste

If Vapi gives you an error when pasting the full array, add these tools **one by one**.

## Tool 1: Lookup Customer

```json
{
  "type": "function",
  "function": {
    "name": "lookup_customer",
    "description": "Look up a customer by their name in the database. Always use this when a customer says they are an existing customer.",
    "parameters": {
      "type": "object",
      "properties": {
        "first_name": {
          "type": "string",
          "description": "Customer's first name"
        },
        "last_name": {
          "type": "string",
          "description": "Customer's last name"
        }
      },
      "required": [
        "first_name",
        "last_name"
      ]
    }
  },
  "async": false,
  "messages": [
    {
      "type": "request-start",
      "content": "Let me look that up for you..."
    },
    {
      "type": "request-complete",
      "content": "Found your information."
    }
  ],
  "server": {
    "url": "https://many-islands-watch.loca.lt/webhook/vapi-call-status"
  }
}
```

## Tool 2: Check Technician Availability

```json
{
  "type": "function",
  "function": {
    "name": "check_technician_availability",
    "description": "Check if a technician is available for emergency dispatch. Use this ONLY when you detect an emergency situation.",
    "parameters": {
      "type": "object",
      "properties": {
        "emergency_type": {
          "type": "string",
          "description": "Type of emergency (e.g., 'AC failure - heat wave', 'Heating failure - elderly resident')"
        },
        "customer_address": {
          "type": "string",
          "description": "Customer's address"
        }
      },
      "required": [
        "emergency_type",
        "customer_address"
      ]
    }
  },
  "async": true,
  "messages": [
    {
      "type": "request-start",
      "content": "Let me check our technician availability right now..."
    },
    {
      "type": "request-complete",
      "content": "I've confirmed availability."
    }
  ],
  "server": {
    "url": "https://many-islands-watch.loca.lt/webhook/vapi-call-status"
  }
}
```

## Tool 3: Book Appointment

```json
{
  "type": "function",
  "function": {
    "name": "book_appointment",
    "description": "Book a non-emergency service appointment. Use this for routine maintenance, inspections, or non-urgent repairs.",
    "parameters": {
      "type": "object",
      "properties": {
        "customer_name": {
          "type": "string",
          "description": "Customer's full name"
        },
        "service_type": {
          "type": "string",
          "description": "Type of service needed"
        },
        "preferred_date": {
          "type": "string",
          "description": "Customer's preferred date (e.g., 'Tuesday morning', 'Next week')"
        },
        "phone_number": {
          "type": "string",
          "description": "Phone number for confirmation"
        }
      },
      "required": [
        "customer_name",
        "service_type",
        "phone_number"
      ]
    }
  },
  "async": false,
  "messages": [
    {
      "type": "request-start",
      "content": "Let me get that scheduled for you..."
    },
    {
      "type": "request-complete",
      "content": "Your appointment has been booked."
    }
  ],
  "server": {
    "url": "https://many-islands-watch.loca.lt/webhook/vapi-call-status"
  }
}
```
