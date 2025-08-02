const mysql = require('mysql2/promise');

const dbConfig = {
  host: '102.218.215.35',
  port: 3306,
  user: 'citlogis_bryan',
  password: '@bo9511221.qwerty',
  database: 'citlogis_finance'
};

async function checkSessions() {
  let connection;
  
  try {
    console.log('🔍 Checking sessions in database...\n');
    
    // Connect to database
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');

    // Check all sessions for user 94
    console.log('1️⃣ Checking all sessions for user 94:');
    const [sessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE userId = 94 ORDER BY sessionStart DESC'
    );
    
    console.log(`📊 Found ${sessions.length} sessions for user 94:`);
    sessions.forEach((session, index) => {
      console.log(`\nSession ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  User ID: ${session.userId}`);
      console.log(`  Status: ${session.status} (1=Active, 2=Ended, 0=Inactive)`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Session End: ${session.sessionEnd || 'Not ended'}`);
      console.log(`  Duration: ${session.duration || 'Not calculated'} minutes`);
      console.log(`  Timezone: ${session.timezone}`);
    });

    // Check active sessions specifically
    console.log('\n2️⃣ Checking active sessions (status = 1):');
    const [activeSessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE userId = 94 AND status = 1 ORDER BY sessionStart DESC'
    );
    
    console.log(`📊 Found ${activeSessions.length} active sessions for user 94:`);
    activeSessions.forEach((session, index) => {
      console.log(`\nActive Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Timezone: ${session.timezone}`);
    });

    // Check today's sessions
    console.log('\n3️⃣ Checking today\'s sessions:');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const [todaySessions] = await connection.execute(
      'SELECT * FROM LoginHistory WHERE userId = 94 AND DATE(sessionStart) = ? ORDER BY sessionStart DESC',
      [today]
    );
    
    console.log(`📊 Found ${todaySessions.length} sessions for today (${today}):`);
    todaySessions.forEach((session, index) => {
      console.log(`\nToday's Session ${index + 1}:`);
      console.log(`  ID: ${session.id}`);
      console.log(`  Status: ${session.status}`);
      console.log(`  Session Start: ${session.sessionStart}`);
      console.log(`  Session End: ${session.sessionEnd || 'Not ended'}`);
    });

    // Check table structure
    console.log('\n4️⃣ Checking LoginHistory table structure:');
    const [columns] = await connection.execute('DESCRIBE LoginHistory');
    console.log('📊 Table columns:');
    columns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(NULL)' : '(NOT NULL)'} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
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
checkSessions(); 