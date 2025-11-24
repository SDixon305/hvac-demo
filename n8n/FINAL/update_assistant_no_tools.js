#!/usr/bin/env node

/**
 * Vapi Assistant Configuration Update Script (without tools)
 * Updates a Vapi assistant with configuration from VAPI_ASSISTANT_CONFIG_NO_TOOLS.json
 *
 * Usage: node update_assistant_no_tools.js <ASSISTANT_ID> <API_KEY>
 */

const fs = require('fs');
const path = require('path');

// Check command line arguments
if (process.argv.length !== 4) {
    console.error('Usage: node update_assistant_no_tools.js <ASSISTANT_ID> <API_KEY>');
    console.error('Example: node update_assistant_no_tools.js asst_abc123 your-api-key-here');
    process.exit(1);
}

const ASSISTANT_ID = process.argv[2];
const API_KEY = process.argv[3];

// Read the configuration from the JSON file
const configFilePath = path.join(__dirname, 'VAPI_ASSISTANT_CONFIG_NO_TOOLS.json');
let config;

try {
    const configData = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configData);
    console.log(`✓ Loaded assistant configuration from VAPI_ASSISTANT_CONFIG_NO_TOOLS.json`);
    console.log(`  - Name: ${config.name}`);
    console.log(`  - First Message: ${config.firstMessage}`);
} catch (error) {
    console.error('Error reading VAPI_ASSISTANT_CONFIG_NO_TOOLS.json:', error.message);
    process.exit(1);
}

console.log('\n📤 Updating Vapi Assistant:', ASSISTANT_ID);

// Make the API call using fetch (Node 18+)
async function updateAssistant() {
    try {
        const response = await fetch(`https://api.vapi.ai/assistant/${ASSISTANT_ID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(config)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ Error updating assistant:');
            console.error('Status:', response.status);
            console.error('Response:', JSON.stringify(data, null, 2));
            process.exit(1);
        }

        console.log('✅ Assistant updated successfully!');
        console.log('\nResponse Summary:');
        console.log(`  - ID: ${data.id}`);
        console.log(`  - Name: ${data.name}`);
        console.log(`  - First Message: ${data.firstMessage}`);
        console.log(`  - Model: ${data.model?.provider} / ${data.model?.model}`);
        console.log(`  - Voice: ${data.voice?.provider} / ${data.voice?.voiceId}`);

        console.log('\n🎉 Your assistant has been updated!');
        console.log('   The agent will now:');
        console.log('   - NOT announce when using tools');
        console.log('   - Continue speaking naturally during tool calls');
        console.log('   - Act as if it has instant access to information');

    } catch (error) {
        console.error('❌ Error making API request:', error.message);
        process.exit(1);
    }
}

updateAssistant();
