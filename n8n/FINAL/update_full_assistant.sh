#!/bin/bash

# Vapi Assistant Full Configuration Update
# This script updates your VAPI assistant with the complete configuration
# including greeting, system prompt, voice, and tools.

echo "=============================================="
echo "VAPI Assistant Full Configuration Update"
echo "=============================================="
echo ""

# Check if .env file exists in backend
if [ -f "../../backend/.env" ]; then
    echo "Loading credentials from backend/.env..."
    export $(grep -v '^#' ../../backend/.env | xargs)
else
    echo "⚠️  Warning: backend/.env not found"
fi

# Check for required environment variables
if [ -z "$VAPI_ASSISTANT_ID" ]; then
    echo "❌ Error: VAPI_ASSISTANT_ID not found in .env"
    echo "Please add VAPI_ASSISTANT_ID=your_assistant_id to backend/.env"
    exit 1
fi

if [ -z "$VAPI_API_KEY" ]; then
    echo "❌ Error: VAPI_API_KEY not found in .env"
    echo "Please add VAPI_API_KEY=your_api_key to backend/.env"
    exit 1
fi

echo "✓ VAPI_ASSISTANT_ID: $VAPI_ASSISTANT_ID"
echo "✓ VAPI_API_KEY: ${VAPI_API_KEY:0:10}..."
echo ""

# Run the update script
echo "Running full configuration update..."
echo ""

node update_full_assistant.js "$VAPI_ASSISTANT_ID" "$VAPI_API_KEY"

echo ""
echo "=============================================="
echo "Update complete!"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Test by calling your VAPI phone number"
echo "2. The agent should greet you with:"
echo "   'High Time Air Conditioning and Heating, how may I help you?'"
echo "3. The agent will speak FIRST (not wait for you)"
echo ""
