Vue.component("carousel", {
  template: "#v-carousel",
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 460,
      items: [
        { img: 'images/fy.png' },
             { img: 'images/xz.png' },
			 { img: 'images/zm.png' },
			 { img: 'images/lx.png' },
             { img: 'images/jd.png' }
      ]
    }
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
  }
});

new Vue({
  el:"#app"
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