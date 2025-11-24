#!/bin/bash

# Vapi Assistant Update Script
# Usage: ./update_vapi_assistant.sh <ASSISTANT_ID> <API_KEY>

# Check if arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <ASSISTANT_ID> <API_KEY>"
    echo "Example: $0 asst_abc123 your-api-key-here"
    exit 1
fi

ASSISTANT_ID=$1
API_KEY=$2

# Read the tools from the JSON file
TOOLS=$(cat VAPI_TOOLS.json)

# Create the request body
REQUEST_BODY=$(cat <<EOF
{
  "tools": $TOOLS
}
EOF
)

echo "Updating Vapi Assistant: $ASSISTANT_ID"
echo "Request Body:"
echo "$REQUEST_BODY" | jq '.'

# Make the API call
curl -X PATCH "https://api.vapi.ai/assistant/$ASSISTANT_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "$REQUEST_BODY" \
  | jq '.'

echo ""
echo "Update complete!"
