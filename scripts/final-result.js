document.getElementById('shareBtn').addEventListener('click', async () => {
  try {
    const match = window.location.pathname.match(/results_pages\/result(\d+)\.html$/);
    if (!match) {
      return;
    }

    const resultNum = match[1];
    const imagePath = `../images/share/result${resultNum}.png`; 

    const response = await fetch(imagePath);
    const blob = await response.blob();
    const file = new File([blob], `result${resultNum}.png`, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: '你是什麼炸物？\n快來測試你的炸物人格！\nhttps://leoouo.github.io/2025_PersonalityTest_Fetnet/',
      });
    } else {
      alert('你的瀏覽器不支援圖片分享，建議用手機開啟這個頁面哦！');
    }
  } catch (error) {
    console.error('分享錯誤', error);
  }
});

document.getElementById('downloadBtn').addEventListener('click', async () => {
  try {
    const match = window.location.pathname.match(/results_pages\/result(\d+)\.html$/);
    if (!match) {
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
    console.error('下載錯誤', error);
  }
});
