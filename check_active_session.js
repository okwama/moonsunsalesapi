const mysql = require('mysql2/promise');

const dbConfig = {
  host: '102.218.215.35',
  port: 3306,
  user: 'citlogis_bryan',
  password: '@bo9511221.qwerty',
  database: 'citlogis_finance'
};

async function checkActiveSession() {
  let connection;
  
  try {
    console.log('🔍 Checking for active sessions...\n');
    
    // Connect to database
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');

    // Check for active sessions for user 94
    console.log('1️⃣ Checking active sessions for user 94:');
    const [activeSessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE userId = 94 AND status = 1 ORDER BY sessionStart DESC'
    );
    
    if (activeSessions.length > 0) {
      console.log(`✅ Found ${activeSessions.length} active session(s):`);
      activeSessions.forEach((session, index) => {
        console.log(`\nActive Session ${index + 1}:`);
        console.log(`  ID: ${session.id}`);
        console.log(`  User ID: ${session.userId}`);
        console.log(`  Status: ${session.status} (1 = Active)`);
        console.log(`  Session Start: ${session.sessionStart}`);
        console.log(`  Session End: ${session.sessionEnd || 'Not ended yet'}`);
        console.log(`  Duration: ${session.duration || 'Not calculated yet'} minutes`);
        console.log(`  Timezone: ${session.timezone}`);
        
        // Calculate current duration
        const startTime = new Date(session.sessionStart);
        const now = new Date();
        const currentDuration = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
        console.log(`  Current Duration: ${currentDuration} minutes`);
      });
    } else {
      console.log('❌ No active sessions found for user 94');
    }

    // Check today's sessions
    console.log('\n2️⃣ Checking today\'s sessions for user 94:');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const [todaySessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE userId = 94 AND DATE(sessionStart) = ? ORDER BY sessionStart DESC',
      [today]
    );
    
    console.log(`📊 Found ${todaySessions.length} sessions for today (${today}):`);
    todaySessions.forEach((session, index) => {
      console.log(`\nToday's Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  Status: ${session.status} (1=Active, 2=Ended, 0=Inactive)`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Session End: ${session.sessionEnd || 'Not ended'}`);
      console.log(`  Duration: ${session.duration || 'Not calculated'} minutes`);
    });

    // Check all recent sessions
    console.log('\n3️⃣ Checking recent sessions (last 5):');
    const [recentSessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE userId = 94 ORDER BY sessionStart DESC LIMIT 5'
    );
    
    console.log(`📊 Recent sessions:`);
    recentSessions.forEach((session, index) => {
      console.log(`\nRecent Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  Status: ${session.status} (1=Active, 2=Ended, 0=Inactive)`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Session End: ${session.sessionEnd || 'Not ended'}`);
      console.log(`  Duration: ${session.duration || 'Not calculated'} minutes`);
    });

  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✅ Database connection closed');
    }
  }
}

// Run the check
checkActiveSession(); 