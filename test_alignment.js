const axios = require('axios');

const baseUrl = 'http://0.0.0.0:3000/api';

async function testAlignment() {
  try {
    console.log('🧪 Testing Flutter-NestJS alignment...\n');

    // Test 1: Check session status endpoint
    console.log('1️⃣ Testing session status endpoint:');
    try {
      const statusResponse = await axios.get(`${baseUrl}/sessions/today/94`);
      console.log('✅ Session status endpoint works:');
      console.log('   Response:', JSON.stringify(statusResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Session status endpoint failed:', error.response?.data || error.message);
    }

    // Test 2: Test session login with new format
    console.log('\n2️⃣ Testing session login with new format:');
    try {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 19).replace('T', ' ');
      
      const loginResponse = await axios.post(`${baseUrl}/sessions/login`, {
        userId: '94',
        clientTime: formattedTime
      });
      console.log('✅ Session login works:');
      console.log('   Response:', JSON.stringify(loginResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Session login failed:', error.response?.data || error.message);
    }

    // Test 3: Test session logout
    console.log('\n3️⃣ Testing session logout:');
    try {
      const now = new Date();
      const formattedTime = now.toISOString().slice(0, 19).replace('T', ' ');
      
      const logoutResponse = await axios.post(`${baseUrl}/sessions/logout`, {
        userId: '94',
        clientTime: formattedTime
      });
      console.log('✅ Session logout works:');
      console.log('   Response:', JSON.stringify(logoutResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Session logout failed:', error.response?.data || error.message);
    }

    // Test 4: Check session history
    console.log('\n4️⃣ Testing session history:');
    try {
      const historyResponse = await axios.get(`${baseUrl}/sessions/history/94`);
      console.log('✅ Session history works:');
      console.log('   Sessions found:', historyResponse.data.sessions?.length || 0);
    } catch (error) {
      console.log('❌ Session history failed:', error.response?.data || error.message);
    }

    console.log('\n✅ Alignment test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testAlignment(); 