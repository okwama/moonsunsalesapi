// Test script to verify coordinate fix is working
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testCoordinateFix() {
  try {
    console.log('🧪 Testing Journey Plans Coordinate Fix...\n');

    // Test journey plans endpoint
    console.log('📋 Testing /journey-plans endpoint...');
    
    const response = await axios.get(`${BASE_URL}/journey-plans`, {
      params: {
        page: 1,
        limit: 2,
        date: '2025-08-10'
      }
    });

    console.log('✅ Response Status:', response.status);
    console.log('✅ Response Structure:', {
      success: response.data.success,
      total: response.data.pagination?.total,
      dataLength: response.data.data?.length
    });

    // Check journey plan data
    if (response.data.data && response.data.data.length > 0) {
      const journeyPlan = response.data.data[0];
      console.log('\n📋 Journey Plan Details:');
      console.log('- ID:', journeyPlan.id);
      console.log('- Status:', journeyPlan.status);
      console.log('- Date:', journeyPlan.date);
      
      if (journeyPlan.client) {
        console.log('\n🏪 Client Details:');
        console.log('- ID:', journeyPlan.client.id);
        console.log('- Name:', journeyPlan.client.name);
        console.log('- Latitude:', journeyPlan.client.latitude);
        console.log('- Longitude:', journeyPlan.client.longitude);
        console.log('- Country ID:', journeyPlan.client.countryId);
        
        // Check if coordinates are present
        if (journeyPlan.client.latitude !== null && journeyPlan.client.longitude !== null) {
          console.log('\n✅ SUCCESS: Client coordinates are present!');
          console.log(`📍 Location: ${journeyPlan.client.latitude}, ${journeyPlan.client.longitude}`);
        } else {
          console.log('\n❌ FAILURE: Client coordinates are still null');
        }
      } else {
        console.log('\n❌ FAILURE: No client data in response');
      }
    } else {
      console.log('\n⚠️ No journey plans found for the test date');
    }

    console.log('\n🎉 Test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testCoordinateFix();
