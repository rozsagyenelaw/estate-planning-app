import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import expressions from 'angular-expressions';

// Configure angular-expressions parser (same as in docxTemplateService.js)
expressions.filters.not = function(input) {
    return !input;
};

function angularParser(tag) {
    try {
        const expr = expressions.compile(tag);
        return {
            get: function(scope, context) {
                let obj = {};
                Object.keys(context.scopePathItem).forEach(function(key) {
                    obj[key] = context.scopePathItem[key];
                });
                Object.keys(scope).forEach(function(key) {
                    obj[key] = scope[key];
                });
                return expr(obj);
            }
        };
    } catch (e) {
        return {
            get: function() {
                return '';
            }
        };
    }
}

// Load the template
const content = fs.readFileSync('public/templates/single_estate_planning_template.docx', 'binary');
const zip = new PizZip(content);

let doc;
try {
    doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        parser: angularParser,
    });
    console.log('✅ Template loaded successfully with angular parser!');
} catch (error) {
    console.error('❌ Error loading template:', error.message);
    process.exit(1);
}

// Import the data preparation function to use real data mapping
import { prepareTemplateData } from './src/services/docxTemplateService.js';

// Create realistic form data
const formData = {
    client: {
        firstName: 'John',
        middleName: 'M.',
        lastName: 'Smith',
        dateOfBirth: '1970-05-15',
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        county: 'Los Angeles',
    },
    maritalStatus: 'single',
    trustName: 'The John M. Smith Living Trust',
    trustDate: 'October 28, 2025',
    children: [
        { firstName: 'Alice', lastName: 'Smith', dateOfBirth: '2010-03-10' },
        { firstName: 'Bob', lastName: 'Smith', dateOfBirth: '2015-07-25' }
    ],
    guardians: [
        { firstName: 'Jane', lastName: 'Doe' },
        { firstName: 'Bob', lastName: 'Johnson' }
    ],
    successorTrustees: [
        { firstName: 'Udo', lastName: 'Gyene' },
        { firstName: 'Ilona', lastName: 'Farag' }
    ],
    durablePOA: {
        client: [
            { firstName: 'Alice', lastName: 'Brown', dateOfBirth: '1980-01-15' },
            { firstName: 'Bob', lastName: 'White', dateOfBirth: '1975-06-20' }
        ]
    },
    healthcarePOA: {
        client: [
            { firstName: 'Carol', lastName: 'Green' },
            { firstName: 'Dan', lastName: 'Blue' }
        ]
    },
};

// Use the real data preparation function
const testData = prepareTemplateData(formData);

console.log('\n=== TESTING WITH REAL DATA PREPARATION ===');
console.log('Children:', testData.children);
console.log('Guardians:', testData.guardians);
console.log('Successors:', testData.successors);
console.log('POA Agents:', testData.poaAgents);
console.log('Healthcare Agents:', testData.healthcareAgents);
console.log('===\n');

// Try to render with test data
try {
    doc.render(testData);
    console.log('✅ Template rendered successfully with test data!');
    console.log('✅ NO ERRORS - Template is working correctly!');
    
    // Save output
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync('/tmp/test_output.docx', buf);
    console.log('✅ Test document saved to /tmp/test_output.docx');
    
    process.exit(0);
} catch (error) {
    console.error('❌ Error rendering template:');
    console.error('Message:', error.message);
    console.error('Name:', error.name);
    if (error.properties) {
        console.error('Properties:', JSON.stringify(error.properties, null, 2));
    }
    process.exit(1);
}
