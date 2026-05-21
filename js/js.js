document.addEventListener('DOMContentLoaded', function() {
    // 监听所有语言切换按钮的点击事件
    const langLinks = document.querySelectorAll('.ignore a');
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转行为

            // 2. 从链接里提取目标语言 (比如 'english')
            const href = this.getAttribute('href');
            const langMatch = href.match(/changeLanguage\('(.*?)'\)/);
            if (!langMatch || !langMatch[1]) return;
            const targetLang = langMatch[1];

            // 3. 调用原插件的切换语言方法
            translate.changeLanguage(targetLang);

            // 4. 给页面加上当前语言的类名 (延迟100ms，等插件处理完)
            setTimeout(() => {
                // 先移除所有语言类名
                document.documentElement.classList.remove('lang-en', 'lang-zhs', 'lang-zht', 'lang-fr', 'lang-ko');
                // 根据语言添加对应类名
                switch(targetLang) {
                    case 'english':
                        document.documentElement.classList.add('lang-en');
                        break;
                    case 'chinese_simplified':
                        document.documentElement.classList.add('lang-zhs');
                        break;
                    case 'chinese_traditional':
                        document.documentElement.classList.add('lang-zht');
                        break;
                    case 'french':
                        document.documentElement.classList.add('lang-fr');
                        break;
                    case 'korean':
                        document.documentElement.classList.add('lang-ko');
                        break;
                }
            }, 100);

            // ========== 新增：保存当前语言到浏览器本地存储 ==========
            localStorage.setItem('siteLang', targetLang);
        });
    });

    // ========== 新增：页面加载时，自动读取保存的语言并切换 ==========
    const savedLang = localStorage.getItem('siteLang');
    if (savedLang) {
        translate.changeLanguage(savedLang);
        setTimeout(() => {
            document.documentElement.classList.remove('lang-en', 'lang-zhs', 'lang-zht', 'lang-fr', 'lang-ko');
            switch(savedLang) {
                case 'english':
                    document.documentElement.classList.add('lang-en');
                    break;
                case 'chinese_simplified':
                    document.documentElement.classList.add('lang-zhs');
                    break;
                case 'chinese_traditional':
                    document.documentElement.classList.add('lang-zht');
                    break;
                case 'french':
                    document.documentElement.classList.add('lang-fr');
                    break;
                case 'korean':
                    document.documentElement.classList.add('lang-ko');
                    break;
            }
        }, 100);
    }
});
Vue.component("carousel", {
  template: `
    <div class="card-carousel">
      <!-- 轮播容器 -->
      <div class="card-carousel--wrapper" :style="{ transform: \`translateX(\${currentOffset}px)\` }">
        <!-- 轮播项：循环渲染图片+文字 -->
        <div class="card-carousel--card" v-for="(item, index) in items" :key="index">
          <img :src="item.img" alt="轮播图片">
          <!-- 显示每个图片对应的文字 -->
		  <a :href="item.url" class="card-text" @click="handleJump(item.url)">
		              {{ item.text }}
		</a>
        </div>
      </div>
      <!-- 左右切换按钮（可选，保留你的逻辑） -->
      <button class="carousel-btn prev" @click="moveCarousel(-1)" :disabled="atHeadOfList">←</button>
      <button class="carousel-btn next" @click="moveCarousel(1)" :disabled="atEndOfList">→</button>
    </div>
  `,
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 460,
      // 修正：items 数组格式（去掉多余的嵌套大括号）
      items: [
        { img: 'images/lin_2.png', text: 'Linux高端机', url: '2-linux.html'},
        { img: 'images/Min_1.png', text: '蓝色mini机',url: 'mini-blue.html' },
        { img: 'images/Min_2.png', text: '手持喷码机',url: 'a1-series.html' },
        { img: 'images/lx.png', text: 'Linux7寸喷码机',url: '1-linux.html' },
        { img: 'images/jd.png', text: '3头鸡蛋机',url: '3-head egg machine.html' }
      ]
    };
  },
  computed: {
    atEndOfList() {
      // 修正：计算逻辑（原逻辑符号错误，导致按钮禁用异常）
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    }
  },
  methods: {
    moveCarousel(direction) {
      // 向左/向右移动的逻辑（修正方向判断，原逻辑反了）
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor; // 右移：offset 减少
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor; // 左移：offset 增加
      }
    }
  }
});

// 挂载Vue实例（如果你的页面还没加，补充这个）
new Vue({
  el: '#app'
});






// 获取所有导航项
const navItems = document.querySelectorAll('.nav-item');

// 给每个导航项添加点击事件
navItems.forEach(item => {
  item.addEventListener('click', function() {
    // 先移除所有 active 类
    navItems.forEach(nav => nav.classList.remove('active'));
    // 给当前点击的项添加 active 类
    this.classList.add('active');
  });
});
