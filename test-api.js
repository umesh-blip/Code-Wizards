// Simple test script to verify Gemini API key
// Run this locally to test your API key before deploying

const testGeminiAPI = async () => {
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  
  if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY') {
    console.log('❌ No valid API key found. Please set REACT_APP_GEMINI_API_KEY in your .env file');
    return;
  }

  console.log('🔑 API Key found:', API_KEY.substring(0, 10) + '...');
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Hello! Please respond with "API test successful" if you can see this message.'
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 50,
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Test Successful!');
      console.log('Response:', data.candidates[0].content.parts[0].text);
    } else {
      const errorText = await response.text();
      console.log('❌ API Test Failed:', response.status, errorText);
    }
  } catch (error) {
    console.log('❌ Network Error:', error.message);
  }
};

// Run the test
testGeminiAPI();
