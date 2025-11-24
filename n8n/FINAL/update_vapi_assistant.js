#!/usr/bin/env node

/**
 * Vapi Assistant Update Script
 * Updates a Vapi assistant with tools from VAPI_TOOLS.json
 *
 * Usage: node update_vapi_assistant.js <ASSISTANT_ID> <API_KEY>
 */

const fs = require('fs');
const path = require('path');

// Check command line arguments
if (process.argv.length !== 4) {
    console.error('Usage: node update_vapi_assistant.js <ASSISTANT_ID> <API_KEY>');
    console.error('Example: node update_vapi_assistant.js asst_abc123 your-api-key-here');
    process.exit(1);
}

const ASSISTANT_ID = process.argv[2];
const API_KEY = process.argv[3];

// Read the tools from the JSON file
const toolsFilePath = path.join(__dirname, 'VAPI_TOOLS.json');
let tools;

try {
    const toolsData = fs.readFileSync(toolsFilePath, 'utf8');
    tools = JSON.parse(toolsData);
    console.log(`✓ Loaded ${tools.length} tools from VAPI_TOOLS.json`);
} catch (error) {
    console.error('Error reading VAPI_TOOLS.json:', error.message);
    process.exit(1);
}

// Prepare the request body
const requestBody = {
    tools: tools
};

console.log('\n📤 Updating Vapi Assistant:', ASSISTANT_ID);
console.log('Request Body:');
console.log(JSON.stringify(requestBody, null, 2));
console.log('\n');

// Make the API call using fetch (Node 18+) or fallback to https module
async function updateAssistant() {
    try {
        const response = await fetch(`https://api.vapi.ai/assistant/${ASSISTANT_ID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ Error updating assistant:');
            console.error('Status:', response.status);
            console.error('Response:', JSON.stringify(data, null, 2));
            process.exit(1);
        }

        console.log('✅ Assistant updated successfully!');
        console.log('\nResponse:');
        console.log(JSON.stringify(data, null, 2));

        if (data.tools) {
            console.log(`\n✓ ${data.tools.length} tools now configured on assistant`);
        }

    } catch (error) {
        console.error('❌ Error making API request:', error.message);
        process.exit(1);
    }
}

updateAssistant();
