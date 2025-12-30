/**
 * Script kiểm tra các API endpoints
 * Chạy: npx ts-node scripts/test-api.ts
 */

const BASE_URL = 'http://localhost:3000';

async function testRegisterAPI() {
  console.log('\n📝 Testing Register API...');
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      }),
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testLoginAPI() {
  console.log('\n🔑 Testing Login API...');
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function testTranslateAPI() {
  console.log('\n🌐 Testing Translate API...');
  try {
    const response = await fetch(`${BASE_URL}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Hello World',
        targetLanguage: 'vi',
      }),
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...');
  await testRegisterAPI();
  await testLoginAPI();
  await testTranslateAPI();
  console.log('\n✅ Tests completed!');
  process.exit(0);
}

runTests();
