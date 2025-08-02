const mysql = require('mysql2/promise');

async function activateUser() {
  console.log('🔧 Activating user 0706166875...\n');

  const connection = await mysql.createConnection({
    host: '102.218.215.35',
    port: 3306,
    user: 'citlogis_bryan',
    password: '@bo9511221.qwerty',
    database: 'citlogis_ws'
  });

  try {
    // Update user status to 1 (active)
    const [result] = await connection.execute(
      'UPDATE SalesRep SET status = 1 WHERE phoneNumber = ?',
      ['0706166875']
    );
    
    console.log(`✅ Updated ${result.affectedRows} user(s)`);

    // Verify the update
    const [user] = await connection.execute(
      'SELECT id, name, phoneNumber, email, role, status FROM SalesRep WHERE phoneNumber = ?',
      ['0706166875']
    );
    
    if (user.length > 0) {
      const updatedUser = user[0];
      console.log(`\n✅ User updated successfully:`);
      console.log(`  ID: ${updatedUser.id}`);
      console.log(`  Name: ${updatedUser.name}`);
      console.log(`  Phone: ${updatedUser.phoneNumber}`);
      console.log(`  Role: ${updatedUser.role}`);
      console.log(`  Status: ${updatedUser.status} (now active)`);
    }

  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await connection.end();
  }
}

activateUser().catch(console.error); 