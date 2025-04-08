// 分享功能（保留）
document.getElementById('shareBtn').addEventListener('click', async () => {
  try {
    const match = window.location.pathname.match(/results_pages\/result(\d+)\.html$/);
    if (!match) {
      alert('無法辨識結果頁面！');
      return;
    }

    const resultNum = match[1];
    const imagePath = `../images/share/result${resultNum}.png`;

    const response = await fetch(imagePath);
    const blob = await response.blob();
    const file = new File([blob], `result${resultNum}.png`, { type: 'image/jpeg' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: '你是什麼炸物？',
      });
    } else {
      alert('你的瀏覽器不支援圖片分享，建議用手機開啟這個頁面哦！');
    }
  } catch (error) {
    console.error('分享錯誤:', error);
    alert('圖片讀取或分享失敗，請檢查圖片路徑是否正確。');
  }
});

// 下載功能（保留這個 ✅）
document.getElementById('downloadBtn').addEventListener('click', async () => {
  try {
    const match = window.location.pathname.match(/results_pages\/result(\d+)\.html$/);
    if (!match) {
      alert('無法辨識結果頁面！');
      return;
    }

    const resultNum = match[1];
    const imagePath = `../images/share/result${resultNum}.png`;

    const response = await fetch(imagePath);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `result${resultNum}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('下載錯誤:', error);
    alert('圖片下載失敗，請檢查圖片路徑是否正確。');
  }
});
