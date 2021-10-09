<template>
  <div class="container">
    <div id="main" style="width: 70vw; height: 70vh"></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      myChart: null,
      name: "",
    };
  },
  created() {
    this.getParamName();
    // const router = useRouter();
    // console.log(router);
    // console.log(router.currentRoute._rawValue.hash.slice(1));
    // router.currentRoute._rawValue.meta.title = "test";
  },
  mounted() {
    this.initChart();
  },
  methods: {
    getParamName() {
      const router = useRouter();
      this.name = router.currentRoute._rawValue.hash.slice(1);
    },
    initChart() {
        var $this = this;
      var echarts = this.$echarts;
      var myChart = echarts.init(document.getElementById("main"));
      this.myChart = myChart;

      this.$axios
        .get(`http://localhost:3000/src/assets/json/${$this.name}.json`)
        .then(function (response) {
          echarts.registerMap(`${$this.name}`, response.data);
          var option = {
            tooltip: {
              trigger: "item",
            },
            title: {
              text: `${$this.name}设备分布情况`,
              x: "center",
            },
            geo: {
              map: `${$this.name}`,
              label: {},
              roam: false, // 禁止缩放
              itemStyle: {},
            },
            series: [
              {
                type: "effectScatter",
                coordinateSystem: "geo",
                rippleEffect: {
                  brushType: "stroke",
                },
                symbolSize: function (val, params) {
                  return 8;
                },
                data: [],
              },
            ],
          };
          myChart.setOption(option);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>