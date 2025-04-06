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
  