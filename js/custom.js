// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}

// 复制提醒
document.addEventListener("copy", function () {
    debounce(function () {
        new Vue({
            data: function () {
                this.$notify({
                    title: "哎嘿！复制成功🍬",
                    message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                    position: 'top-left',
                    offset: 50,
                    showClose: true,
                    type: "success",
                    duration: 5000
                });
            }
        })
    }, 300);
})




/*------------------------------------------------------------------------------------------------------------------------------------*/








// 切换链接对应的背景(加入了链接检验与防抖)
function getPicture() {
  debounce(getPicture_, 300);
}



function getPicture_() {
  let bg = document.getElementById("web_bg");
  checkImgExists(document.getElementById("pic-link").value).then(() => {
    // 有效的图片链接
    var link = "url(" + document.getElementById("pic-link").value + ")";
    bg.style.backgroundImage = link;
    localStorage.setItem("blogbg", link);
    localStorage.setItem("bing", "false");
    if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
    // 提示切换成功
    new Vue({
      data: function () {
        this.$notify({
          title: "可以啦🍨",
          message: "切换自定义背景成功！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }).catch(() => {
    // 无效的图片链接，提示无效
    new Vue({
      data: function () {
        this.$notify({
          title: "链接不对🤣",
          message: "请输入有效的图片链接！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 5000
        });
      }
    })
  })
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    }
    ImgObj.onerror = function (err) {
      reject(err);
    }
  })
}





// 设置字体
function setFont(n) {
  localStorage.setItem("font", n);
  const isDefault = n === "default";
  document.documentElement.style.setProperty(
    "--global-font",
    isDefault ? "-apple-system" : n
  );
  document.body.style.fontFamily = isDefault
    ? "-apple-system, Consolas_1, BlinkMacSystemFont, 'huangkaihuaLawyerfont', 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif"
    : `var(--global-font),-apple-system, IBM Plex Mono, monospace, '微软雅黑', 'huangkaihuaLawyerfont',  sans-serif`;
  setFontBorder();
}

// 设置字体选择框边框
function setFontBorder() {
  const curFont = localStorage.getItem("font");
  document.querySelectorAll(".swf").forEach((swf) => {
    swf.style.border = swf.id === `swf_${curFont}`
      ? "2px solid var(--theme-color)"
      : "2px solid var(--border-color)";
  });
}

// 初始设置
const initialFont = localStorage.getItem("font") || "LXGW";
localStorage.setItem("font", initialFont);
setFont(initialFont);



/**************************************************************************************/
/*// 切换 FPS 检测
function toggleFPS() {
  const fpsOn = window.localStorage.getItem("fpson") === "1";
  const fpsScriptId = "fps-script";

  if (fpsOn) {
    // 关闭 FPS 检测
    window.localStorage.setItem("fpson", "0");
    document.getElementById("toggleFPS").innerText = "开启 FPS 检测";

    // 移除 fps.js 脚本
    const fpsScript = document.getElementById(fpsScriptId);
    if (fpsScript) {
      document.head.removeChild(fpsScript);
    }
  } else {
    // 开启 FPS 检测
    window.localStorage.setItem("fpson", "1");
    document.getElementById("toggleFPS").innerText = "关闭 FPS 检测";

    // 加载 fps.js 脚本
    const fpsScript = document.createElement("script");
    fpsScript.id = fpsScriptId;
    fpsScript.src = "/js/fps.js"; // 确保路径正确
    document.head.appendChild(fpsScript);
  }
}

// 初始化 FPS 状态
function initFPS() {
  const fpsOn = window.localStorage.getItem("fpson") === "1";
  if (fpsOn) {
    document.getElementById("toggleFPS").innerText = "关闭 FPS 检测";
    const fpsScript = document.createElement("script");
    fpsScript.id = "fps-script";
    fpsScript.src = "/js/fps.js"; // 确保路径正确
    document.head.appendChild(fpsScript);
  } else {
    document.getElementById("toggleFPS").innerText = "开启 FPS 检测";
  }
}

// 页面加载时初始化
window.onload = function () {
  initFPS();
};*/







function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify({ time: Date.now(), data: data }));
}

function loadData(name, time) {
  let d = JSON.parse(localStorage.getItem(name));
  if (d) {
    let t = Date.now() - d.time;
    if (t < (time * 60 * 1000) && t > -1) return d.data;
  }
  return 0;
}

try {
  let data = loadData('blogbg', 1440);
  if (data) changeBg(data, 1);
  else localStorage.removeItem('blogbg');
} catch (error) {
  localStorage.removeItem('blogbg');
}

function changeBg(s, flag) {
  let bg = document.getElementById('web_bg');
  if (s.charAt(0) == '#') {
    bg.style.backgroundColor = s;
    bg.style.backgroundImage = 'none';
  } else {
    bg.style.backgroundImage = s;
  }
  if (!flag) {
    saveData('blogbg', s);
  }
}

var winbox = '';

function createWinbox() {
  let div = document.createElement('div');
  document.body.appendChild(div);
  winbox = WinBox({
    id: 'changeBgBox',
    index: 99,
    title: "控制台",
    x: "center",
    y: "center",
    minwidth: '300px',
    height: "60%",
    background: '#49b1f5',
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = '';
    },
  });



/*/*//*<h2 style="text-align:left; margin-bottom:20px;">显示设置</h2>

      <div>
         <p style="text-align:center; margin-bottom:20px;">
            <button id="toggleFPS" onclick="toggleFPS()" style="background:var(--theme-color); padding:10px; border-radius:18px; color:blue;">
            <i class="fa-solid fa-toggle-on"></i> 切换 FPS 检测
            </button>
      </p>
     </div>*//*/
*/





  winResize();
  window.addEventListener('resize', winResize);

  winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
      <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 恢复默认设置</button></p>

      <h2 style="text-align:left; margin-bottom:20px;">字体设置</h2>

      <p style="text-align:center; margin-bottom:20px;">
      非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方
      </p>
      <div id="swfs" style="display:flex; flex-wrap:wrap; gap:20px; justify-content:center;">
      <button class="swf" id="swf_huangkaihuaLawyerfont" onclick="setFont('huangkaihuaLawyerfont')" style="border-radius:18px; padding:10px 20px; background:var(--theme-color); color:black; font-family:'huangkaihuaLawyerfont'!important;">
       黄凯华律师字体
      </button>
      <button class="swf" id="swf_default" onclick="setFont('default')" style="border-radius:18px; padding:10px 20px; background:var(--theme-color); color:black;">
        系统默认
      </button>
      </div>

      <h2 style="text-align:left; margin-bottom:20px;">背景设置</h2>

      <h3>手机壁纸</h3>

      <div class="bgbox">
        
      </div>

      <h3>电脑壁纸</h3>

      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cloud.hkjsxb.com/20250315125747697.png)" class="pimgbox" onclick="changeBg('url(https://cloud.hkjsxb.com/20250315125747697.png)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cloud.hkjsxb.com/20250315125740369.png)" class="pimgbox" onclick="changeBg('url(https://cloud.hkjsxb.com/20250315125740369.png)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cloud.hkjsxb.com/20250315125722032.png)" class="pimgbox" onclick="changeBg('url(https://cloud.hkjsxb.com/20250315125722032.png)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)" class="imgbox" onclick="changeBg('url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/1.jpg)" class="imgbox" onclick="changeBg('url(/img/1.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/2.jpg)" class="imgbox" onclick="changeBg('url(/img/2.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/3.jpg)" class="imgbox" onclick="changeBg('url(/img/3.jpg)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/img/4.jpg)" class="imgbox" onclick="changeBg('url(/img/4.jpg)')"></a>
      </div>

      <h3>渐变色</h3>

      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
      </div>

      <h3>纯色</h3>
    
      <div class="bgbox">
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a>
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a> 
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>  
        <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a>
      </div>

      <h2 style="text-align:left; margin-bottom:20px;" id="自定义背景"><a href="#自定义背景" class="headerlink" title="自定义背景"></a>自定义背景</h2>
      <p><center>
      <input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://example.com/bg.jpg">
      </center></p>
      <p><center>
      <button type="button" onclick="getPicture()" style="background:var(--theme-color);width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:blue;line-height:2;">🌈切换背景🌈</button>
      </center></p>      
    </div>
  `;
}

function winResize() {
  let box = document.querySelector('#changeBgBox');
  if (!box || box.classList.contains('min') || box.classList.contains('max')) return;
  var offsetWid = document.documentElement.clientWidth;
  if (offsetWid <= 768) {
    winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
  } else {
    winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
  }
}

function toggleWinbox() {
  if (document.querySelector('#changeBgBox')) {
    winbox.toggleClass('hide');
  } else {
    createWinbox();
  }
}

function changeFont(font) {
  document.documentElement.style.setProperty('--global-font', font);
  localStorage.setItem('font', font);
}











/***************************************************************/







/**************即可短文***************************************************/

var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.dateSuffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.dateSuffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.dateSuffix.min;
      } else {
        result = GLOBAL_CONFIG.dateSuffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (txt) {
    const postCommentDom = document.querySelector("#post-comment");
    var domTop = postCommentDom.offsetTop;
    window.scrollTo(0, domTop - 80);
    if (txt == "undefined" || txt == "null") txt = "好棒！";
    function setText() {
      setTimeout(() => {
        var input = document.getElementsByClassName("el-textarea__inner")[0];
        if (!input) setText();
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("input", true, true);
        let inputValue = replaceAll(txt, "\n", "\n> ");
        input.value = "> " + inputValue + "\n\n";
        input.dispatchEvent(evt);
        input.focus();
        input.setSelectionRange(-1, -1);
        if (document.getElementById("comment-tips")) {
          document.getElementById("comment-tips").classList.add("show");
        }
      }, 100);
    }
    setText();
  },
  initIndexEssay: function () {
    setTimeout(() => {
      let essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
        passiveListeners: true,
        direction: "vertical",
        loop: true,
        autoplay: {
          disableOnInteraction: true,
          delay: 3000,
        },
        mousewheel: true,
      });

      let essay_bar_comtainer = document.getElementById("bbtalk");
      if (essay_bar_comtainer !== null) {
        essay_bar_comtainer.onmouseenter = function () {
          essay_bar_swiper.autoplay.stop();
        };
        essay_bar_comtainer.onmouseleave = function () {
          essay_bar_swiper.autoplay.start();
        };
      }
    }, 100);
  },
};

anzhiyu.initIndexEssay();
anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();