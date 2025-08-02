const mysql = require('mysql2/promise');

const dbConfig = {
  host: '102.218.215.35',
  port: 3306,
  user: 'citlogis_bryan',
  password: '@bo9511221.qwerty',
  database: 'citlogis_finance'
};

async function checkLatestSessions() {
  let connection;
  
  try {
    console.log('🔍 Checking latest sessions...\n');
    
    // Connect to database
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');

    // Check the most recent 10 sessions for user 94
    console.log('1️⃣ Checking most recent 10 sessions for user 94:');
    const [recentSessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE userId = 94 ORDER BY id DESC LIMIT 10'
    );
    
    console.log(`📊 Found ${recentSessions.length} recent sessions:`);
    recentSessions.forEach((session, index) => {
      console.log(`\nRecent Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  User ID: ${session.userId}`);
      console.log(`  Status: ${session.status} (1=Active, 2=Ended, 0=Inactive)`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Session End: ${session.sessionEnd || 'Not ended'}`);
      console.log(`  Duration: ${session.duration || 'Not calculated'} minutes`);
      console.log(`  Timezone: ${session.timezone}`);
    });

    // Check if any sessions were created today
    console.log('\n2️⃣ Checking sessions created today:');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const [todaySessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE DATE(sessionStart) = ? ORDER BY id DESC',
      [today]
    );
    
    console.log(`📊 Found ${todaySessions.length} sessions created today (${today}):`);
    todaySessions.forEach((session, index) => {
      console.log(`\nToday's Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  User ID: ${session.userId}`);
      console.log(`  Status: ${session.status}`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Session End: ${session.sessionEnd || 'Not ended'}`);
    });

    // Check the highest ID to see if new sessions are being created
    console.log('\n3️⃣ Checking highest session ID:');
    const [maxIdResult] = await connection.execute('SELECT MAX(id) as maxId FROM LoginHistory');
    const maxId = maxIdResult[0].maxId;
    console.log(`📊 Highest session ID: ${maxId}`);

    // Check if there are any sessions with status = 1 (active)
    console.log('\n4️⃣ Checking all active sessions:');
    const [activeSessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE status = 1 ORDER BY id DESC'
    );
    
    console.log(`📊 Found ${activeSessions.length} active sessions total:`);
    activeSessions.forEach((session, index) => {
      console.log(`\nActive Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  User ID: ${session.userId}`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Timezone: ${session.timezone}`);
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
checkLatestSessions(); 