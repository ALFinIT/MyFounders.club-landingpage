#!/usr/bin/env node

/**
 * Database Connection & Form Testing Script
 * Tests Supabase connection, API endpoints, and data syncing
 */

import path from 'path';
import fs from 'fs';

// Configuration
const SUPABASE_URL = 'https://ibpqvfqhmecgyevjbtqo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_m8LmfPh0IJ0g2byAa1pfSQ_WC96lNZc';
const BASE_URL = 'http://localhost:3000';
const TEST_DATA_DIR = path.join(process.cwd(), '.test-results');

// Create test results directory
if (!fs.existsSync(TEST_DATA_DIR)) {
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Test data with timestamps to make each test unique
const timestamp = Date.now();
const uniqueSuffix = Math.random().toString(36).substring(7);

const TEST_DATA = {
  whatsapp: {
    firstName: `Test User ${uniqueSuffix}`,
    phone: `+1234567890${timestamp.toString().slice(-4)}`,
  },
  application: {
    fullName: `Founder ${uniqueSuffix}`,
    companyName: `Test Company ${uniqueSuffix}`,
    email: `test${timestamp}@example.com`,
    phone: `+1234567891${timestamp.toString().slice(-4)}`,
    onePitchSentence: `We are building the future of startup investing with AI-powered matching at ${new Date().toISOString()}`,
    proofOfWork: 'https://github.com/example/project',
    commitmentAmount: 'AED 500',
    agreeCommitment: true,
  },
};

// Test Results Storage
const results = {
  timestamp: new Date().toISOString(),
  testsRun: 0,
  testsPassed: 0,
  testsFailed: 0,
  details: [],
};

// Helper Functions
async function testConnection(name, url, headers = {}) {
  try {
    const response = await fetch(url, { headers, timeout: 5000 });
    const status = response.status;
    const isSuccess = status >= 200 && status < 300;
    
    return {
      name,
      passed: isSuccess,
      status,
      message: isSuccess ? `✓ Connected successfully (${status})` : `✗ Failed with status ${status}`,
    };
  } catch (err) {
    return {
      name,
      passed: false,
      status: null,
      message: `✗ Connection failed: ${err.message}`,
    };
  }
}

async function testAPIEndpoint(name, method, endpoint, body = null, expectedStatus = 200) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    const passed = response.status === expectedStatus;

    return {
      name,
      passed,
      status: response.status,
      endpoint,
      method,
      requestBody: body,
      responseStatus: response.status,
      responseBody: data,
      message: passed ? `✓ ${method} ${endpoint} succeeded` : `✗ Expected ${expectedStatus}, got ${response.status}`,
    };
  } catch (err) {
    return {
      name,
      passed: false,
      status: null,
      endpoint,
      method,
      requestBody: body,
      responseBody: null,
      message: `✗ API call failed: ${err.message}`,
    };
  }
}

async function testSupabaseDirectConnection() {
  try {
    // Test basic Supabase connectivity via REST API
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/applications?limit=1`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        timeout: 5000,
      }
    );

    const passed = response.status === 200;
    return {
      name: 'Direct Supabase REST API Connection',
      passed,
      status: response.status,
      message: passed ? '✓ Supabase REST API accessible' : `✗ Failed with status ${response.status}`,
    };
  } catch (err) {
    return {
      name: 'Direct Supabase REST API Connection',
      passed: false,
      status: null,
      message: `✗ Connection failed: ${err.message}`,
    };
  }
}

async function verifyLocalDatabase() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    let localDBExists = false;
    let files = [];

    if (fs.existsSync(dataDir)) {
      files = fs.readdirSync(dataDir);
      localDBExists = files.length > 0;

      // Read content of files
      const content = {};
      for (const file of files) {
        try {
          const filePath = path.join(dataDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const parsed = JSON.parse(fileContent);
          content[file] = {
            count: Array.isArray(parsed) ? parsed.length : 1,
            sample: Array.isArray(parsed) ? parsed[0] : parsed,
          };
        } catch (e) {
          content[file] = { error: e.message };
        }
      }

      return {
        name: 'Local Database Verification',
        passed: true,
        message: `✓ Local database active with ${files.length} file(s)`,
        details: {
          dataDirectory: dataDir,
          filesFound: files,
          content,
        },
      };
    } else {
      return {
        name: 'Local Database Verification',
        passed: false,
        message: '✗ Local database directory not found at ' + dataDir,
        details: { dataDirectory: dataDir, filesFound: [] },
      };
    }
  } catch (err) {
    return {
      name: 'Local Database Verification',
      passed: false,
      message: `✗ Error: ${err.message}`,
    };
  }
}

async function runTests() {
  console.log('\n' + '='.repeat(70));
  console.log('DATABASE & FORM INTEGRATION TEST SUITE');
  console.log('='.repeat(70) + '\n');

  // Test 1: Direct Supabase Connection
  console.log('TEST 1: Supabase Connection...');
  let test = await testSupabaseDirectConnection();
  logTest(test);

  // Test 2: Local Database
  console.log('\nTEST 2: Local Database Setup...');
  test = await verifyLocalDatabase();
  logTest(test);

  // Test 3: WhatsApp API
  console.log('\nTEST 3: WhatsApp Signup API...');
  test = await testAPIEndpoint(
    'WhatsApp Signup API',
    'POST',
    '/api/whatsapp',
    TEST_DATA.whatsapp,
    200
  );
  logTest(test);

  // Test 4: Applications API
  console.log('\nTEST 4: Application Form API...');
  test = await testAPIEndpoint(
    'Application Form API',
    'POST',
    '/api/applications',
    TEST_DATA.application,
    200
  );
  logTest(test);

  // Test 5: Missing Fields Validation
  console.log('\nTEST 5: Form Validation (Missing Fields)...');
  test = await testAPIEndpoint(
    'Application API - Missing Fields',
    'POST',
    '/api/applications',
    { fullName: 'Test' }, // Missing required fields
    400
  );
  logTest(test);

  // Test 6: Admin API - Applications
  console.log('\nTEST 6: Admin API - Get Applications...');
  test = await testAPIEndpoint(
    'Admin Applications API',
    'GET',
    '/api/admin/applications',
    null,
    200
  );
  logTest(test);

  // Test 7: Admin API - WhatsApp
  console.log('\nTEST 7: Admin API - Get WhatsApp Signups...');
  test = await testAPIEndpoint(
    'Admin WhatsApp API',
    'GET',
    '/api/admin/whatsapp',
    null,
    200
  );
  logTest(test);

  // Test 8: Admin API - Newsletter
  console.log('\nTEST 8: Admin API - Get Newsletter Signups...');
  test = await testAPIEndpoint(
    'Admin Newsletter API',
    'GET',
    '/api/admin/newsletter',
    null,
    200
  );
  logTest(test);

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total Tests: ${results.testsRun}`);
  console.log(`Passed: ${results.testsPassed} ✓`);
  console.log(`Failed: ${results.testsFailed} ✗`);
  console.log(`Success Rate: ${((results.testsPassed / results.testsRun) * 100).toFixed(1)}%`);
  console.log('='.repeat(70) + '\n');

  // Save results
  const resultsFile = path.join(TEST_DATA_DIR, `test-results-${Date.now()}.json`);
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`📊 Full test results saved to: ${resultsFile}\n`);

  // Test Data Reference
  console.log('TEST DATA USED:');
  console.log('WhatsApp Form:');
  console.log(JSON.stringify(TEST_DATA.whatsapp, null, 2));
  console.log('\nApplication Form:');
  console.log(JSON.stringify(TEST_DATA.application, null, 2));
}

function logTest(test) {
  const status = test.passed ? '✓ PASS' : '✗ FAIL';
  console.log(`${status}: ${test.message}`);

  results.testsRun++;
  if (test.passed) {
    results.testsPassed++;
  } else {
    results.testsFailed++;
  }

  results.details.push(test);
}

// Run the tests
runTests().catch((err) => {
  console.error('Test suite error:', err);
  process.exit(1);
});
