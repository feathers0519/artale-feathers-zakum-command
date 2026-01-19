// =====================
// Zakum Boss 控制台 JS
// =====================

// --- 綠魔方計時器 ---
// 控制綠魔方出現倒數計時，根據不同階段切換時間與警告
let cycleTimer;
function startCycleTimer(mode) {
    // mode: 1=手階段, 2=本體階段
    clearInterval(cycleTimer);
    const display = document.getElementById('cube-timer');
    const warningBox = document.getElementById('cube-warning');
    const config = mode === 1 ? {target: 150, limit: 150} : {target: 90, limit: 120};
    let elapsed = 0;
    display.classList.remove('blink');
    warningBox.innerText = "";
    cycleTimer = setInterval(() => {
        elapsed++;
        let remain = config.target - elapsed;
        // 顯示剩餘時間或警戒期
        display.innerText = remain >= 0 ? `${String(Math.floor(remain/60)).padStart(2,'0')}:${String(remain%60).padStart(2,'0')}` : "⚠️ 警戒期";
        // 10秒內警告
        let showWarning = (mode === 1) ? (remain <= 10 && remain > 0) : ((config.target - elapsed) <= 10 && elapsed < config.limit);
        if (showWarning) {
            display.classList.add('blink'); display.style.color = '#76ff03';
            warningBox.innerText = "🟩 綠魔方出現預警！"; warningBox.classList.add('blink');
        } else {
            display.classList.remove('blink'); display.style.color = '#fff';
            warningBox.innerText = ""; warningBox.classList.remove('blink');
        }
        // 區間結束
        if (elapsed >= config.limit) {
            clearInterval(cycleTimer);
            display.innerText = "00:00"; display.style.color = "#aaa";
            warningBox.innerText = "區間結束"; warningBox.classList.remove('blink');
        }
    }, 1000);
}

// --- 綠魔方解說 ---
// 顯示綠魔方相關圖片與說明
const cubeData = {
    1: {
        imgs: ["https://i.meee.com.tw/55zy1dg.jpg"],
        text: "<b>備註：</b>系統時間魔方出現頻率在手階段時為每2分半-2分40秒出現一次，本體階段為1分半至2分鐘。"
    },
    2: {
        imgs: ["https://i.meee.com.tw/aQ6mIdQ.jpg", "https://i.meee.com.tw/dBRl0fN.jpg"],
        text: "<b>備註：</b>分辨方式為本體召喚魔方一次會出現兩顆。本體召喚出綠魔方後，一二階需要開始計算本體所施放的技能次數，在第5次時會出現黑水，第三階時在第6次時會出現黑水。",
        caption: "(本體綠魔方示意圖)"
    }
};
function showCubeInfo(id) {
    // 根據 id 顯示對應魔方資訊
    const container = document.getElementById('cube-display-area');
    const data = cubeData[id];
    let html = `<div class=\"cube-info-text\">${data.text}</div>`;
    html += `<div class=\"cube-info-imgs\">`;
    data.imgs.forEach(url => {
        html += `<img src=\"${url}\" class=\"cube-info-img\">`;
    });
    if (data.caption) html += `<div class=\"cube-info-caption\">${data.caption}</div>`;
    html += `</div>`;
    container.innerHTML = html;
}

// --- 機制說明 ---
// 顯示三種機制（熱能、武器腐蝕、防禦腐蝕）圖示與說明
const mechData = {
    1: { img: "https://i.meee.com.tw/iuzXMOd.png", text: `<div class='mech-title'>熱能 (傷害提升)</div>
                    1. 每層增傷 8%<br>2. 上限 10 層<br>3. 3/4/7/8 手有熱能檢驗機制<br>4. 11 層以上火焰檢測秒殺<br>5. 法師效果減半
                    <table class='info-table' style='margin-top:8px;'>
                        <thead><tr><th>部位</th><th>機制</th><th>層數</th><th>圖標</th></tr></thead>
                        <tbody>
                            <tr><td>1號手</td><td>火坑</td><td>2層</td><td><img src='https://i.meee.com.tw/1aS1ROb.jpg'></td></tr>
                            <tr><td>4/8號手</td><td>紅印</td><td>1層</td><td><img src='https://i.meee.com.tw/BNM3HdD.jpg'></td></tr>
                        </tbody>
                    </table>
                `
    },
    2: { img: "https://i.meee.com.tw/swNaVJN.png", text: `
                    <div class='mech-title'>武器腐蝕 (傷害下降)</div>
                    1. 降低表攻<br>2. 10 層傷害近乎歸零<br>3. >5 層建議吃魔方<br>4. 可預判撞手卡無敵<br>5. 影響物理，對法師影響不大<br>6. 無檢測機制
                    <table class='info-table' style='margin-top:8px;'>
                        <thead><tr><th>部位</th><th>機制</th><th>層數</th><th>圖標</th></tr></thead>
                        <tbody>
                            <tr><td>3號手</td><td>腐蝕</td><td>1層</td><td><img src='https://i.meee.com.tw/f4A3Bm0.jpg'></td></tr>
                            <tr><td>5號手</td><td>落石</td><td>1層</td><td><img src='https://i.meee.com.tw/VOkxHvz.jpg'></td></tr>
                            <tr><td>本體</td><td>-</td><td>3層</td><td><img src='https://i.meee.com.tw/vfIknB7.jpg'></td></tr>
                            <tr><td>本體</td><td>魔精靈</td><td>1層</td><td><img src='https://i.meee.com.tw/1miTJbA.jpg'></td></tr>
                        </tbody>
                    </table>
                `
    },
    3: { img: "https://i.meee.com.tw/qvMhyW4.png", text: `
                    <div class='mech-title'>防禦腐蝕 (防禦下降)</div>
                    1. 受傷提高<br>2. 敏職疊加至 6 層將死亡<br>3. >7 層防禦檢測秒殺
                    <table class='info-table' style='margin-top:8px;'>
                        <thead><tr><th>部位</th><th>機制</th><th>層數</th><th>圖標</th></tr></thead>
                        <tbody>
                            <tr><td>4/8號手</td><td>藍印</td><td>1層</td><td><img src='https://i.meee.com.tw/U8hhTX3.jpg'></td></tr>
                            <tr><td>5號手</td><td>落石</td><td>1層</td><td><img src='https://i.meee.com.tw/VOkxHvz.jpg'></td></tr>
                            <tr><td>本體</td><td>-</td><td>3層</td><td><img src='https://i.meee.com.tw/vfIknB7.jpg'></td></tr>
                            <tr><td>本體</td><td>魔精靈</td><td>1層</td><td><img src='https://i.meee.com.tw/1miTJbA.jpg'></td></tr>
                        </tbody>
                    </table>
                `
    }
};
function showMech(id) {
    // 根據 id 顯示機制圖示與說明
    const img = document.getElementById('mech-img');
    img.src = mechData[id].img;
    img.style.display = 'block';
    document.getElementById('mech-remark').innerHTML = mechData[id].text;
}

// --- 優先度 ---
// 顯示攻擊優先度圖示與文字
const priorityData = {
    1: { img: "https://i.meee.com.tw/PVHW3Mf.jpg", text: "優先級：最高 (必打)" },
    2: { img: "https://i.meee.com.tw/rZm62Hx.jpg", text: "優先級：次高" },
    3: { img: "https://i.meee.com.tw/jox3UNN.jpg", text: "優先級：最末" }
};
function showPriority(id) {
    // 根據 id 顯示優先度
    const img = document.getElementById('priority-img');
    img.src = priorityData[id].img;
    img.style.display = 'block';
    document.getElementById('priority-remark').innerText = priorityData[id].text;
}

// --- 30分鐘倒數 ---
// Zakum 本體戰鬥倒數計時，並於特定時間點顯示提示
let battleTimer; let totalSec = 1800;
const milestones = [
    { t: 1680, id: "ms-2800", msg: "28:00 固定魔方必吃！" },
    { t: 1530, id: "ms-2530", msg: "25:30 固定魔方必吃！" },
    { t: 1380, id: "ms-2300", msg: "23:00 不吃方塊，開始疊火！" },
    { t: 1230, id: "ms-2030", msg: "20:30 固定魔方出現！" },
    { t: 1080, id: "ms-1800", msg: "18:00 固定魔方出現！" },
    { t: 930, id: "ms-1530", msg: "15:30 固定魔方出現！" },
    { t: 780, id: "ms-1300", msg: "13:00 最後固定魔方！" }
];
function startBattle() {
    // 啟動倒數計時
    clearInterval(battleTimer);
    battleTimer = setInterval(() => {
        if (totalSec <= 0) { clearInterval(battleTimer); return; }
        totalSec--; updateBattleClock(); checkMilestones();
    }, 1000);
}
function checkMilestones() {
    // 檢查是否到達提示時間點，顯示提示
    const statusEl = document.getElementById('battle-status');
    const listEl = document.querySelectorAll('.milestone');
    let activeFound = false;
    for (let ms of milestones) {
        const diff = totalSec - ms.t;
        const el = document.getElementById(ms.id);
        if (diff > 0 && diff <= 10) {
            el.classList.add('highlight');
            statusEl.innerHTML = `⚠️ <span class=\"pre-warning\">請停下攻擊往中間集合等待綠魔方出現</span> (${diff}秒)`;
            statusEl.className = "battle-status-box blink";
            if (diff === 10) copyCmd("請停下攻擊往中間集合等待綠魔方出現");
            activeFound = true; break;
        }
        if (diff <= 0 && diff > -5) {
            el.classList.remove('highlight'); el.classList.add('active');
            statusEl.innerHTML = `✅ <span class=\"active-msg\">${ms.msg}</span>`;
            statusEl.className = "battle-status-box";
            if (diff === 0) copyCmd(ms.msg);
            activeFound = true; break;
        }
        if (diff === -5) el.classList.remove('active');
    }
    if (!activeFound) {
        statusEl.innerHTML = "戰鬥進行中..."; statusEl.className = "battle-status-box";
        listEl.forEach(e => { if (!e.classList.contains('active')) e.classList.remove('highlight'); });
    }
}
function updateBattleClock() {
    // 更新倒數時間顯示
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    document.getElementById('battle-clock').innerText = `${m}:${s}`;
}
function resetBattle() {
    // 重設倒數計時
    clearInterval(battleTimer); totalSec = 1800; updateBattleClock();
    document.getElementById('battle-status').innerText = "等待戰鬥開始...";
    document.querySelectorAll('.milestone').forEach(el => el.classList.remove('active', 'highlight'));
}

// --- 技能圖示 ---
// 顯示 Zakum 技能圖示與說明
const skillData = {
    1: { img: "https://i.meee.com.tw/ZUc5hJl.jpg", text: "火圈：鏢賊先吃，無檢測。" },
    2: { img: "https://i.meee.com.tw/YpaZreO.jpg", text: "7手雷電：無反應時間，秒殺。" },
    3: { img: "https://i.meee.com.tw/BgiiVIM.jpg", text: "紅印：4/8手，反應時間短。" },
    4: { img: "https://i.meee.com.tw/SvsJjNK.jpg", text: "火柱：本體，有手就能躲。" },
    5: { img: "https://i.meee.com.tw/3Dn3qAX.jpg", text: "三角：本體，反應時間短。" },
    6: { img: "https://i.meee.com.tw/lxrkzlk.jpg", text: "圓圈(防檢)：本體，反應時間短。" },
    7: { img: "https://i.meee.com.tw/bcVe4Wb.jpg", text: "在地板出現紫色特效，幾秒後爆炸。<b>若被擊中，雙腐蝕各+5層！</b>(此機制有固定模式)" }
};
function showSkill(id) {
    // 根據 id 顯示技能圖示與說明
    const img = document.getElementById('skill-icon-img');
    img.src = skillData[id].img;
    img.style.display = 'block';
    document.getElementById('skill-remark').innerHTML = skillData[id].text;
}

// --- 怪物圖鑑 ---
// 顯示本體階段召喚怪物圖示與說明
const monsterData = {
    1: { img: "https://i.meee.com.tw/N9M0fvp.jpg", text: "本體階段隨時召喚，碰撞傷害後可以清除熱能層數 (請勿殺害，很有用！)" },
    2: { img: "https://i.meee.com.tw/1miTJbA.jpg", text: "本體魔精靈只能法師攻擊 (物理無效)。碰撞會疊加腐蝕！法師需第一時間清空 1 樓。" }
};
function showMonster(id) {
    // 根據 id 顯示怪物圖示與說明
    const img = document.getElementById('monster-icon-img');
    img.src = monsterData[id].img;
    img.style.display = 'block';
    document.getElementById('monster-remark').innerText = monsterData[id].text;
}

// --- 八手機制 ---
// 顯示八手機制說明與圖示
const handRemarks = {
    1: `<b>1 手 (冰火坑手)：</b>暈眩、火坑(+2熱量)、冰坑(歸零)。(好手)<div class='hand-imgs'><div class='hand-img-item'><img src='https://i.meee.com.tw/1aS1ROb.jpg'><div class='hand-img-caption'>火坑</div></div><div class='hand-img-item'><img src='https://i.meee.com.tw/cOwWnAj.jpg'><div class='hand-img-caption'>冰坑</div></div></div>`,
    2: `<b>2 手 (銷技手)：</b>虛弱、消技、亡靈、封印。<b>要預設消技可能，法師/龍騎/刀賊要立刻補魔心/聖火/錢盾。</b>`,
    3: `<b>3 手 (武器腐蝕手)：</b>增加武器腐蝕。<b>建議預判撞手卡無敵禎，腐蝕 5 層以上建議吃魔方。</b><div class='hand-imgs'><div class='hand-img-item'><img src='https://i.meee.com.tw/f4A3Bm0.jpg'><div class='hand-img-caption'>腐蝕發動</div></div></div>`,
    4: `<b>4 手 (紅藍印手)：</b><br>藍印：防腐+1，反應長。<br>紅印：熱能+1，11層火檢。⚠️長技能小心。<div class='hand-imgs'><div class='hand-img-item'><img src='https://i.meee.com.tw/BNM3HdD.jpg'><div class='hand-img-caption'>紅印前兆</div></div><div class='hand-img-item'><img src='https://i.meee.com.tw/IiGRqVD.jpg'><div class='hand-img-caption'>紅印攻擊</div></div><div class='hand-img-item'><img src='https://i.meee.com.tw/U8hhTX3.jpg'><div class='hand-img-caption'>藍印前兆</div></div><div class='hand-img-item'><img src='https://i.meee.com.tw/UNiDnFf.jpg'><div class='hand-img-caption'>藍印攻擊</div></div><div class='hand-img-item'><img src='https://i.meee.com.tw/bJxXr84.jpg'><div class='hand-img-caption'>護甲腐蝕</div></div></div>`,
    5: `<b>5 手 (隕石手)：</b>暈眩/落石(雙腐蝕+1)。<b>地板發光後落石，務必躲避。</b><div class='hand-imgs'><div class='hand-img-item'><img src='https://i.meee.com.tw/hmZBc04.jpg'><div class='hand-img-caption'>AOE暈眩</div></div><div class='hand-img-item'><img src='https://i.meee.com.tw/VOkxHvz.jpg'><div class='hand-img-caption'>雙腐蝕+1</div></div></div>`,
    6: `<b>6 手 (無作用手)：</b>卡無敵工具人。`,
    7: `<b>7 手 (雷電手)：</b>雷電火檢(11層)。偵測即發動，無反應時間。`,
    8: `<b>8 手 (紅藍印手)：</b>同 4 手機制。<div class='hand-imgs'><div class='hand-img-item'><img src='https://i.meee.com.tw/BNM3HdD.jpg'><div class='hand-img-caption'>紅印前兆</div></div><div class='hand-img-item'><img src='https://i.meee.com.tw/U8hhTX3.jpg'><div class='hand-img-caption'>藍印前兆</div></div></div>`
};
function showHandRemark(num) {
    // 根據 num 顯示八手機制說明
    document.getElementById('hand-remark-content').innerHTML = handRemarks[num];
}

// --- 控手計算機 ---
// 控制熱能層數選擇、計算建議控手時間
const heatSelect = document.getElementById('current-heat');
for (let i = 0; i <= 10; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = `${i} 層 (+${i * 8}%)`;
    if (i === 0) opt.selected = true;
    heatSelect.appendChild(opt);
}
function adjustHeat(val) {
    // 調整熱能層數
    let n = parseInt(heatSelect.value) + val;
    if (n > 10) n = 0; else if (n < 0) n = 10;
    heatSelect.value = n;
    calculateHandTime();
}
function calculateHandTime() {
    // 計算建議控手時間
    const b = parseFloat(document.getElementById('base-min').value);
    const h = parseInt(heatSelect.value);
    const card = document.getElementById('calc-card');
    const rem = document.getElementById('layer-remark');
    const warn = document.getElementById('flame-warning');
    rem.style.display = (h === 9) ? 'block' : 'none';
    if (h >= 10) { card.classList.add('flame-danger'); warn.style.display = 'block'; } else { card.classList.remove('flame-danger'); warn.style.display = 'none'; }
    const t = Math.round((b / (1 + (h * 0.08))) * 60) + 30;
    document.getElementById('suggested-time').innerText = `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
    window.lastCalc = `${Math.floor(t / 60)}分${t % 60}秒`;
}
function sendCalcMsg() { copyCmd(`控手提醒：建議剩餘 ${window.lastCalc} 時動手！`); }

// --- 黑水計數 ---
// 控制黑水技能次數計數與提示
let currentCount = 0; let maxCount = 5;
function setPhase(n, id) {
    // 切換階段，設定最大次數
    maxCount = n;
    currentCount = 0;
    updateCountDisplay();
    document.getElementById('p12').style.background = (n === 5) ? '#0288d1' : '#37474f';
    document.getElementById('p3').style.background = (n === 6) ? '#0288d1' : '#37474f';
}
function resetCount() { currentCount = 0; updateCountDisplay(); }
function addCount() {
    // 增加黑水次數
    currentCount++;
    if (currentCount > maxCount) currentCount = 1;
    updateCountDisplay();
}
function updateCountDisplay() {
    // 更新黑水次數顯示與提示
    const el = document.getElementById('skill-count');
    const msg = document.getElementById('count-msg');
    el.innerText = currentCount;
    msg.style.display = 'none';
    el.classList.remove('blink');
    el.style.color = '#fff';
    if (currentCount === maxCount - 1) {
        msg.innerText = "⚠️ 下一次需要閃避"; msg.style.display = 'block'; msg.style.color = '#ffeb3b';
        el.classList.add('blink'); el.style.color = '#ffeb3b';
        copyCmd("下一次黑水！準備掛繩子！");
    }
    else if (currentCount === maxCount) {
        msg.innerText = "🌊 黑水施放！掛繩子！"; msg.style.display = 'block'; msg.style.color = '#ff1744';
        el.classList.add('blink'); el.style.color = '#ff1744';
        copyCmd("黑水施放！全體掛繩子！");
    }
}

// --- 複製指令提示 ---
// 複製指令到剪貼簿並顯示提示
function copyCmd(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('copy-toast');
        toast.innerText = `已複製：${text}`;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 2000);
    });
}
calculateHandTime();