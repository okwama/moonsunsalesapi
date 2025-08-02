const axios = require('axios');

const baseUrl = 'http://192.168.100.2:3000/api';

async function testSessionState() {
  try {
    console.log('🧪 Testing session state accuracy...\n');

    // Test 1: Check current session status
    console.log('1️⃣ Checking current session status:');
    try {
      const statusResponse = await axios.get(`${baseUrl}/sessions/today/94`);
      console.log('✅ Session status response:');
      console.log('   isActive:', statusResponse.data.isActive);
      console.log('   hasSession:', statusResponse.data.hasSession);
      console.log('   status:', statusResponse.data.status);
      console.log('   duration:', statusResponse.data.duration, 'minutes');
    } catch (error) {
      console.log('❌ Session status check failed:', error.response?.data || error.message);
    }

    // Test 2: Check session history
    console.log('\n2️⃣ Checking session history:');
    try {
      const historyResponse = await axios.get(`${baseUrl}/sessions/history/94`);
      const sessions = historyResponse.data.sessions || [];
      const activeSessions = sessions.filter(s => s.status === '1');
      const todaySessions = sessions.filter(s => {
        const sessionDate = new Date(s.sessionStart);
        const today = new Date();
        return sessionDate.toDateString() === today.toDateString();
      });
      
      console.log('✅ Session history:');
      console.log('   Total sessions:', sessions.length);
      console.log('   Active sessions:', activeSessions.length);
      console.log('   Today\'s sessions:', todaySessions.length);
      
      if (todaySessions.length > 0) {
        console.log('   Today\'s session details:');
        todaySessions.forEach((session, index) => {
          console.log(`     Session ${index + 1}:`);
          console.log(`       Status: ${session.status}`);
          console.log(`       Start: ${session.sessionStart}`);
          console.log(`       End: ${session.sessionEnd || 'Not ended'}`);
          console.log(`       Duration: ${session.duration || 'Not calculated'} minutes`);
        });
      }
    } catch (error) {
      console.log('❌ Session history check failed:', error.response?.data || error.message);
    }

    // Test 3: Check database directly
    console.log('\n3️⃣ Checking database directly:');
    const mysql = require('mysql2/promise');
    const dbConfig = {
      host: '102.218.215.35',
      port: 3306,
      user: 'citlogis_bryan',
      password: '@bo9511221.qwerty',
      database: 'citlogis_ws'
    };

    try {
      const connection = await mysql.createConnection(dbConfig);
      
      // Check active sessions for user 94
      const [activeSessions] = await connection.execute(
        'SELECT * FROM LoginHistory WHERE userId = 94 AND status = 1 ORDER BY sessionStart DESC'
      );
      
      console.log('✅ Database check:');
      console.log('   Active sessions in DB:', activeSessions.length);
      
      if (activeSessions.length > 0) {
        activeSessions.forEach((session, index) => {
          console.log(`   Session ${index + 1}:`);
          console.log(`     ID: ${session.id}`);
          console.log(`     Start: ${session.sessionStart}`);
          console.log(`     Status: ${session.status}`);
        });
      }
      
      await connection.end();
    } catch (error) {
      console.log('❌ Database check failed:', error.message);
    }

    console.log('\n✅ Session state test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testSessionState(); 