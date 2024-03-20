// src/utils/api.js

async function saveBookmark(userId, nebuId) {
    try {
      const response = await fetch('/api/bookmark/saveBookmarkNebu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, nebuId }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to save bookmark:", error);
      throw error; // Rethrow to handle it in the component
    }
  }
  
  export { saveBookmark };
  