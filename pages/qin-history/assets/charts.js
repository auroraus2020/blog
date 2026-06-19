(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg = style.getPropertyValue('--bg').trim();

  var tl = echarts.init(document.getElementById('chart-timeline'), null, { renderer: 'svg' });

  // Timeline data
  var periods = [
    { name: '传说时代 / 商周', start: -2200, end: -900 },
    { name: '西周附庸', start: -900, end: -771 },
    { name: '春秋崛起', start: -770, end: -476 },
    { name: '战国变法', start: -475, end: -221 },
    { name: '大秦帝国', start: -221, end: -207 }
  ];

  var events = [
    { name: '女修吞玄鸟卵', year: -2100, pos: 'bottom' },
    { name: '费昌投商汤', year: -1600, pos: 'top' },
    { name: '中潏保西垂', year: -1300, pos: 'bottom' },
    { name: '恶来战死牧野', year: -1046, pos: 'top' },
    { name: '非子受封于秦', year: -900, pos: 'bottom' },
    { name: '襄公获封诸侯', year: -770, pos: 'top' },
    { name: '穆公称霸西戎', year: -623, pos: 'bottom' },
    { name: '献公东迁栎阳', year: -383, pos: 'top' },
    { name: '商鞅变法', year: -356, pos: 'bottom' },
    { name: '惠文称王', year: -325, pos: 'top' },
    { name: '长平之战', year: -260, pos: 'bottom' },
    { name: '秦王政即位', year: -247, pos: 'top' },
    { name: '统一天下', year: -221, pos: 'bottom' },
    { name: '焚书坑儒', year: -213, pos: 'top' },
    { name: '始皇驾崩', year: -210, pos: 'bottom' },
    { name: '大泽乡起义', year: -209, pos: 'top' },
    { name: '巨鹿之战', year: -207, pos: 'bottom' },
    { name: '秦朝灭亡', year: -207, pos: 'top' }
  ];

  // Build series data
  var topEvents = events.filter(function(e) { return e.pos === 'top'; });
  var bottomEvents = events.filter(function(e) { return e.pos === 'bottom'; });

  tl.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        var y = Math.abs(p.value[0]);
        return '<strong>' + p.name + '</strong><br/>前' + y + '年';
      }
    },
    grid: { left: 90, right: 90, top: 50, bottom: 70 },
    xAxis: {
      type: 'value',
      min: -2250,
      max: -190,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: muted,
        fontSize: 12,
        formatter: function(v) { return '前' + Math.abs(v) + '年'; }
      },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 3,
      show: false
    },
    series: [
      // Period blocks
      {
        type: 'custom',
        renderItem: function(params, api) {
          var children = periods.map(function(p, i) {
            var s = api.coord([p.start, 0]);
            var e = api.coord([p.end, 0]);
            var yc = api.coord([0, 1.48])[1];
            var colors = [accent2 + '1a', accent2 + '2a', accent2 + '3d', accent2 + '55', accent2 + '70'];
            return {
              type: 'rect',
              shape: { x: s[0], y: yc - 4, width: e[0] - s[0], height: 8 },
              style: { fill: colors[i] || accent2 + '80' },
              z2: 1
            };
          });
          // Labels for each period
          var labels = periods.map(function(p) {
            var s = api.coord([p.start, 0]);
            var e = api.coord([p.end, 0]);
            var midX = (s[0] + e[0]) / 2;
            return {
              type: 'text',
              x: midX, y: api.coord([0, 1.2])[1],
              style: { text: p.name, fill: muted, fontSize: 11, textAlign: 'center' },
              z2: 2
            };
          });
          return { type: 'group', children: children.concat(labels) };
        },
        data: [0],
        z: 1
      },
      // Center line
      {
        type: 'custom',
        renderItem: function(params, api) {
          var x0 = api.coord([-2250, 0]);
          var x1 = api.coord([-190, 0]);
          var y = api.coord([0, 1.5])[1];
          return {
            type: 'line',
            shape: { x1: x0[0], y1: y, x2: x1[0], y2: y },
            style: { stroke: rule, lineWidth: 1 },
            z2: 3
          };
        },
        data: [0],
        z: 3
      },
      // Top event markers
      {
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: { color: accent },
        data: topEvents.map(function(e) { return { name: e.name, value: [e.year, 1.5] }; }),
        z: 10
      },
      // Bottom event markers
      {
        type: 'scatter',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: { color: accent2 },
        data: bottomEvents.map(function(e) { return { name: e.name, value: [e.year, 1.5] }; }),
        z: 10
      }
    ],
    graphic: events.map(function(e) {
      var y = e.pos === 'top' ? 1.25 : 1.78;
      var align = e.pos === 'top' ? 'bottom' : 'top';
      var offsetY = e.pos === 'top' ? -6 : 6;
      return {
        type: 'group',
        left: function() {
          var xm = tl.getModel().getComponent('xAxis', 0);
          var range = xm.axis.scale.getExtent();
          var ratio = (e.year - range[0]) / (range[1] - range[0]);
          return 80 + ratio * (tl.getWidth() - 160);
        },
        top: function() {
          var ym = tl.getModel().getComponent('yAxis', 0);
          var range = ym.axis.scale.getExtent();
          var ratio = (y - range[0]) / (range[1] - range[0]);
          var gridH = tl.getHeight() - 100;
          return 40 + (1 - ratio) * gridH;
        },
        children: [
          {
            type: 'text',
            style: {
              text: e.name,
              fill: ink,
              fontSize: 12,
              fontWeight: 600,
              textAlign: 'center',
              textVerticalAlign: align
            },
            top: offsetY,
            left: function() { return -e.name.length * 5.5; }
          },
          {
            type: 'text',
            style: {
              text: '前' + Math.abs(e.year) + '年',
              fill: muted,
              fontSize: 10,
              textAlign: 'center',
              textVerticalAlign: align
            },
            top: offsetY + (e.pos === 'top' ? -14 : 14),
            left: function() { return -Math.abs(e.year).toString().length * 5; }
          }
        ]
      };
    })
  });

  window.addEventListener('resize', function() { tl.resize(); });
})();
