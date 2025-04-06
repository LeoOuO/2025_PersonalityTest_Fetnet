// 初始化 chose 陣列為 10 題，每題 6 個選項，全為 0
const chose = Array.from({ length: 10 }, () => Array(6).fill(0));

// 儲存至 localStorage
localStorage.setItem("chose", JSON.stringify(chose));
