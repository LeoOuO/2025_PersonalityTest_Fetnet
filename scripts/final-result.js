document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.querySelectorAll(".bottom-btn")[2];
  
    downloadBtn.addEventListener("click", () => {
      // 確保頁面捲到最上方，避免未渲染內容
      window.scrollTo(0, 0);
  
      setTimeout(() => {
        // 抓整頁實際高度
        const body = document.body;
        const html = document.documentElement;
        const fullHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
  
        html2canvas(document.body, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#f0ebdf",
          width: html.scrollWidth,
          height: fullHeight,
          windowWidth: html.scrollWidth,
          windowHeight: fullHeight
        }).then(canvas => {
          const link = document.createElement("a");
          const date = new Date().toISOString().slice(0, 10);
          link.download = `測驗結果_${date}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
  
          showDownloadSuccess();
        });
      }, 500); // 等待 DOM fully paint
    });
  
    function showDownloadSuccess() {
      let successBox = document.getElementById("download-success");
  
      if (!successBox) {
        successBox = document.createElement("div");
        successBox.id = "download-success";
        successBox.textContent = "✅ 測驗結果已下載成功 🎉";
        document.body.appendChild(successBox);
      }
  
      Object.assign(successBox.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#5a4a3a",
        color: "white",
        padding: "0.75rem 1.5rem",
        borderRadius: "1rem",
        zIndex: "9999",
        fontSize: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        opacity: "1",
        display: "block",
        transition: "opacity 0.3s ease"
      });
  
      setTimeout(() => {
        successBox.style.opacity = "0";
        setTimeout(() => {
          successBox.style.display = "none";
        }, 300);
      }, 3000);
    }
  });

  document.getElementById('shareBtn').addEventListener('click', async () => {
    try {
      // 修改這行：從 result_pages/resultX.html 中擷取 X
      const match = window.location.pathname.match(/result_pages\/result(\d+)\.html$/);
      if (!match) {
        alert('無法辨識結果頁面！');
        return;
      }
  
      const resultNum = match[1]; // 抓到 "1", "2", ..., "9"
      const imagePath = `../images/share/result${resultNum}.jpg`; // 圖片路徑
  
      // 抓圖轉 blob 再成 File 物件
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const file = new File([blob], `result${resultNum}.jpg`, { type: 'image/jpeg' });
  
      // 分享功能
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
    
document.getElementById('downloadBtn').addEventListener('click', async () => {
    try {
      const match = window.location.pathname.match(/result_pages\/result(\d+)\.html$/);
      if (!match) {
        alert('無法辨識結果頁面！');
        return;
      }
  
      const resultNum = match[1];
      const imagePath = `../images/share/result${resultNum}.jpg`;
  
      const response = await fetch(imagePath);
      const blob = await response.blob();
  
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `result${resultNum}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // 釋放資源
    } catch (error) {
      console.error('下載錯誤:', error);
      alert('圖片下載失敗，請檢查圖片路徑是否正確。');
    }
  });
  
  