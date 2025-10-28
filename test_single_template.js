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
                const scopeList = context.scopeList;
                const num = context.num;
                for (let i = 0, len = num + 1; i < len; i++) {
                    obj = Object.assign(obj, scopeList[i]);
                }

                // Add angular-expressions iteration variables ($first, $last, $index)
                const scopePath = context.scopePath;
                const currentArray = scopePath.length > 0 ? scopeList[scopePath.length - 1] : [];
                const arrayLength = Array.isArray(currentArray) ? currentArray.length : 0;

                // Standard angular iteration variables
                obj.$index = num;
                obj.$first = num === 0;
                obj.$last = arrayLength > 0 && num === arrayLength - 1;
                obj.$middle = !obj.$first && !obj.$last;
                obj.$even = num % 2 === 0;
                obj.$odd = num % 2 === 1;

                // Add loop helper for backward compatibility
                obj.loop = {
                    index: num,
                    first: obj.$first,
                    last: obj.$last,
                };

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

// Fix split template tags in document.xml (same as in docxTemplateService.js)
let documentXml = zip.file('word/document.xml').asText();

// Merge tags split across XML elements
const tagPattern = /\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}/gs;
documentXml = documentXml.replace(tagPattern, (match, content) => {
    if (!content.includes('<')) {
        return match;
    }
    const textOnly = content.replace(/<[^>]+>/g, '');
    return '{' + textOnly + '}';
});

// Update the ZIP with merged XML
zip.file('word/document.xml', documentXml);

console.log('✅ Template tags merged');

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
