# Vapi Tool Parameters (Schema Only)

It looks like you are pasting the **Full Tool Definition** into a box that only wants the **Parameters Schema**.

If you are in the Vapi Dashboard clicking **"Create Tool"**, you need to fill out the form fields (Name, Description) manually, and then paste **ONLY** the JSON blocks below into the "Parameters" or "Schema" box.

## Tool 1: lookup_customer

**Name:** `lookup_customer`
**Description:** Look up a customer by their name in the database. Always use this when a customer says they are an existing customer.

**Parameters / Schema:**
```json
{
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
```

---

## Tool 2: check_technician_availability

**Name:** `check_technician_availability`
**Description:** Check if a technician is available for emergency dispatch. Use this ONLY when you detect an emergency situation.

**Parameters / Schema:**
```json
{
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
```

---

## Tool 3: book_appointment

**Name:** `book_appointment`
**Description:** Book a non-emergency service appointment. Use this for routine maintenance, inspections, or non-urgent repairs.

**Parameters / Schema:**
```json
{
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
```
