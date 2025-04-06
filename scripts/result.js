// 初始化 chose 陣列（從 localStorage 取出）
const chose = JSON.parse(localStorage.getItem("chose")) || Array.from({ length: 10 }, () => Array(6).fill(0));

// 假設 cal[10][6][6] 每一項都是 1（可之後更換為實際資料）
const cal = [[[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]],
            [[1,0,0,0,0,0], [0,2,0,0,0,0], [0,0,3,0,0,0], [0,0,0,4,0,0], [0,0,0,0,5,0], [0,0,0,0,0,6]]
            ]

// 建立 result[10][6] 並初始化為 0
const result = Array.from({ length: 10 }, () => Array(6).fill(0));

// 執行計算：result[q][kind] += chose[q][i] * cal[q][kind][i]
for (let q = 0; q < 10; q++) {
  for (let i = 0; i < 6; i++) {
    if (chose[q][i] === 1) {
      for (let kind = 0; kind < 6; kind++) {
        result[q][kind] += chose[q][i] * cal[q][i][kind]; // 即 cal 為1 時就等於直接 +1
      }
    }
  }
}

// 將結果顯示到畫面上
const resultContainer = document.getElementById("result-container");

result.forEach((qResult, qIndex) => {
  const group = document.createElement("div");
  group.className = "result-group";

  const title = document.createElement("h2");
  title.textContent = `第 ${qIndex + 1} 題`;
  group.appendChild(title);

  qResult.forEach((value, kind) => {
    const item = document.createElement("div");
    item.className = "result-item";
    item.textContent = `變數 ${kind}: ${value}`;
    group.appendChild(item);
  });

  resultContainer.appendChild(group);
});

// 計算總分
let totalScore = 0;
for (let q = 0; q < result.length; q++) {
  for (let k = 0; k < result[q].length; k++) {
    totalScore += result[q][k];
  }
}

// 根據總分跳轉不同結果頁面
let targetPage = "";
if (totalScore <= 27) {
  targetPage = "../results_pages/result1.html";
} else if (totalScore <= 31) {
  targetPage = "../results_pages/result2.html";
} else {
  targetPage = "../results_pages/result3.html";
}

window.location.href = targetPage;

