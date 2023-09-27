export default function formatDate(uploadTimeStr) {
    const uploadTime = new Date(uploadTimeStr);
    const now = new Date();
    console.log('Upload Time:', uploadTime);
    console.log('Current Time:', now);
    const timeDiff = (now - uploadTime) / 1000; // Difference in seconds
    console.log('Time Difference in seconds:', timeDiff);
  
    if (timeDiff < 60) {
      return 'Just-now';
    }
  
    if (
      uploadTime.getDate() === now.getDate() &&
      uploadTime.getMonth() === now.getMonth() &&
      uploadTime.getFullYear() === now.getFullYear()
    ) {
      return uploadTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    return uploadTime.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
  }