document.addEventListener("DOMContentLoaded", () => {
  const questionIndex = parseInt(document.getElementById("question-number").dataset.question);
  let chose = JSON.parse(localStorage.getItem("chose")) || Array.from({ length: 10 }, () => Array(6).fill(0));

  const options = document.querySelectorAll('.option');
  chose[questionIndex].forEach((val, i) => {
    if (val === 1 && options[i]) {
      options[i].classList.add("selected");
    }
  });

  options.forEach((opt, index) => {
    opt.addEventListener("click", () => {
      chose[questionIndex] = Array(6).fill(0);
      options.forEach(o => o.classList.remove("selected"));
      chose[questionIndex][index] = 1;
      opt.classList.add("selected");
      localStorage.setItem("chose", JSON.stringify(chose));
    });
  });

  const nextBtn = document.querySelector(".button-right");
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  const prevBtn = document.querySelector(".button-left");
  if (prevBtn) prevBtn.addEventListener("click", goPrev);

  function goNext() {
    if (chose[questionIndex].every(v => v === 0)) {
      showWarning();
      return;
    }
    const next = nextBtn.dataset.next;
    window.location.href = next;
  }

  function goPrev() {
    const prev = prevBtn.dataset.prev;
    window.location.href = prev;
  }

  function showWarning() {
    const warning = document.getElementById("warning");
  
    // 確保 warning 存在
    if (!warning) return;
    
    if (warning.style.display === "block") return;
    // 顯示警告框
    warning.style.display = "block";
  
    // 3 秒自動關閉
    setTimeout(() => {
      warning.style.display = "none";
      warning.dataset.bound = "";
    }, 3000);
  }
  

  const progressEl = document.getElementById("progress");
  const currentProgress = parseInt(progressEl.dataset.progress) || 0;
  const prevProgress = parseInt(localStorage.getItem("prevProgress")) || 0;
  
  // 初始化樣式（先移除動畫）
  progressEl.style.transition = "none";
  progressEl.style.width = prevProgress + "%";
  
  // 強制重繪 (reflow)
  progressEl.offsetWidth;  // 這一行是關鍵！
  
  // 開啟動畫並套用最終寬度
  progressEl.style.transition = "width 0.5s ease";
  progressEl.style.width = currentProgress + "%";
  
  // 儲存目前進度
  localStorage.setItem("prevProgress", currentProgress);
  
});
