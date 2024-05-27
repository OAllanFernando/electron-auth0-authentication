// services/api-service.js

const axios = require('axios');
const authService = require('./auth-service');

async function getPrivateData() {
  try {
    const result = await axios.get('http://localhost:3000/private', {
      headers: {
        'Authorization': `Bearer ${authService.getAccessToken()}`,
      },
    });
    console.log(result.code, "ssssssssssssssssssssssssssssssssssssss");
    return result.data;
  } catch (error) {
    console.error('Error while fetching private data:', error);
    return "Using this button you access a page protected by authentication. If you are not logged in, you will be redirected to the login page. If you are logged in, you will be redirected to the private data page. In this case, the /private endpoint is not defined, so you will see a 404 error.\n\n Thank you for using. \n Kind regards Allan software engineer";
  }
}

module.exports = {
  getPrivateData,
}