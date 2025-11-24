#!/usr/bin/env node

/**
 * Vapi Assistant Full Configuration Update Script
 * Updates a Vapi assistant with complete configuration including:
 * - System prompt
 * - First message
 * - Voice settings
 * - Tools
 * - All other settings
 *
 * Usage: node update_full_assistant.js <ASSISTANT_ID> <API_KEY>
 */

const fs = require('fs');
const path = require('path');

// Check command line arguments
if (process.argv.length !== 4) {
    console.error('Usage: node update_full_assistant.js <ASSISTANT_ID> <API_KEY>');
    console.error('Example: node update_full_assistant.js asst_abc123 your-api-key-here');
    process.exit(1);
}

const ASSISTANT_ID = process.argv[2];
const API_KEY = process.argv[3];

// Read the full configuration from the JSON file
const configFilePath = path.join(__dirname, 'VAPI_ASSISTANT_FULL_CONFIG.json');
let config;

try {
    const configData = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configData);
    console.log(`✓ Loaded full assistant configuration from VAPI_ASSISTANT_FULL_CONFIG.json`);
    console.log(`  - Name: ${config.name}`);
    console.log(`  - First Message: ${config.firstMessage}`);
    console.log(`  - Tools: ${config.tools.length}`);
} catch (error) {
    console.error('Error reading VAPI_ASSISTANT_FULL_CONFIG.json:', error.message);
    process.exit(1);
}

console.log('\n📤 Updating Vapi Assistant:', ASSISTANT_ID);
console.log('Configuration Preview:');
console.log(JSON.stringify(config, null, 2));
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
        console.log(`  - Tools: ${data.tools?.length || 0}`);

        if (data.tools && data.tools.length > 0) {
            console.log('\n✓ Tools configured:');
            data.tools.forEach((tool, idx) => {
                console.log(`  ${idx + 1}. ${tool.function?.name}`);
            });
        }

        console.log('\n🎉 Your assistant is now ready to answer calls with proper context!');
        console.log('   The agent will greet callers with:');
        console.log(`   "${data.firstMessage}"`);

    } catch (error) {
        console.error('❌ Error making API request:', error.message);
        process.exit(1);
    }
}

updateAssistant();
