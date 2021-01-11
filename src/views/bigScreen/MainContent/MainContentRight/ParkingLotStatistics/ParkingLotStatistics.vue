<template>
  <div :class="['parkingLotStatistics', isBlue ? 'blueBorderBgc' : 'redBorderBgc']">
    <div class="testDrag">
      <div
        :class="['testDragContent', isBlue?'testDragContentBlue':'testDragContentRed']"
        id="testDragContent"
        ref="testDragContent"
      >
        <!--    <template v-for="(item, index) in parkList">
          <div
            :class="`circle${index}`"
            :style="isBlue?`background-image: url('/images/BlueImage/parkLotCount/yuan${index+1}.png')`:`background-image: url('/images/parkLot/yuan${index+1}.png')`"
            :key="index"
          >
            <span class="title">{{item.name}}</span>
            <span class="text">
              <span class="number">{{item.remain}}</span>
              <span class="symbol">/</span>
              <span>{{item.total}}</span>
            </span>
          </div>
        </template>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      parkList: [],
      parkLister: [
        { name: "总停车位", park: 481, total: 1172 },
        { name: "唐寅故居停车场", park: 365, total: 1000 },
        { name: "丝绸博物馆", park: 20, total: 25 },
        { name: "桃花坞文化产业园", park: 60, total: 87 },
        { name: "昆剧院", park: 36, total: 60 }
        /* { name: "停车场E", park: 20, total: 200 },
        { name: "停车场F", park: 20, total: 200 },
        { name: "停车场G", park: 20, total: 200 },
        { name: "停车场H", park: 20, total: 200 } */
      ],
      blueParkList: [
        {
          name: "总停车位",
          symbolSize: 106,
          draggable: true,
          category: 0,
          symbol:
            "image://../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan1.png",
          label: {
            normal: {
              color: "rgba(255,255,255,.45)",
              //             fontSize: 20,
              fontWeight: "normal",
              formatter: [
                "{a|总停车位}",
                // '{a|劣化度}',
                "{b|24}  {c|/}  {d|100}"
              ].join("\n\n"),
              rich: {
                a: {
                  color: "#fef1e8",
                  fontSize: this.fontSize(0.225),
                  //lineHeight: 30,
                  align: "center",
                  fontWeight: "normal"
                },
                b: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.225),
                  //   lineHeight: 40,
                  align: "center",
                  fontWeight: "normal"
                },
                c: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.225),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                d: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.225),
                  //   lineHeight: 40,
                  align: "center",
                  //   fontWeight:'bold',
                  z: 1
                },
                x: {
                  fontSize: 40,
                  fontFamily: "Microsoft YaHei",
                  borderColor: "#fdf9f1",
                  lineHeight: 10
                }
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(247, 80, 54, 1)",
              borderWidth: 1
            }
          }
        },
        {
          name: "唐寅故居停车场",
          symbolSize: 67,
          draggable: true,
          category: 1,
          symbol:
            "image://../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan4.png",
          label: {
            normal: {
              color: "rgba(255,255,255,.45)",
              //             fontSize: 20,
              fontWeight: "normal",
              formatter: [
                "{a|停车场A}",
                // '{a|劣化度}',
                "{b|12}  {c|/}  {d|234}"
              ].join("\n\n"),
              rich: {
                a: {
                  color: "#fef1e8",
                  fontSize: this.fontSize(0.15),
                  //lineHeight: 30,
                  align: "center",
                  fontWeight: "normal"
                },
                b: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.125),
                  //   lineHeight: 40,
                  align: "center",
                  fontWeight: "normal"
                },
                c: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.15),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                d: {
                  color: "white",
                  fontSize: this.fontSize(0.15),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                x: {
                  fontSize: 40,
                  fontFamily: "Microsoft YaHei",
                  borderColor: "#fdf9f1",
                  lineHeight: 10
                }
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(211, 102, 28, 1)",
              borderWidth: 1
            }
          }
        },
        {
          name: "丝绸博物馆",
          symbolSize: 57,
          draggable: true,
          category: 1,
          symbol:
            "image://../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan3.png",
          label: {
            normal: {
              color: "rgba(255,255,255,.45)",
              //             fontSize: 20,
              fontWeight: "normal",
              formatter: [
                "{a|停车场B}",
                // '{a|劣化度}',
                "{b|12}  {c|/}  {d|234}"
              ].join("\n\n"),
              rich: {
                a: {
                  color: "#fef1e8",
                  fontSize: this.fontSize(0.125),
                  //lineHeight: 30,
                  align: "center",
                  fontWeight: "normal"
                },
                b: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.125),
                  //   lineHeight: 40,
                  align: "center",
                  fontWeight: "normal"
                },
                c: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.15),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                d: {
                  color: "white",
                  fontSize: this.fontSize(0.15),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                x: {
                  fontSize: 40,
                  fontFamily: "Microsoft YaHei",
                  borderColor: "#fdf9f1",
                  lineHeight: 10
                }
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(255, 255, 0, 1)",
              borderWidth: 1
            }
          }
        },
        {
          name: "桃花坞文化创意产业园",
          symbolSize: 82,
          draggable: true,
          category: 1,
          symbol:
            "image://../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan2.png",
          label: {
            normal: {
              color: "rgba(255,255,255,.45)",
              //             fontSize: 20,
              fontWeight: "normal",
              formatter: [
                "{a|停车场C}",
                // '{a|劣化度}',
                "{b|12}  {c|/}  {d|234}"
              ].join("\n\n"),
              rich: {
                a: {
                  color: "#fef1e8",
                  fontSize: this.fontSize(0.175),
                  //lineHeight: 30,
                  align: "center",
                  fontWeight: "normal"
                },
                b: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.175),
                  //   lineHeight: 40,
                  align: "center",
                  fontWeight: "normal"
                },
                c: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.175),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                d: {
                  color: "white",
                  fontSize: this.fontSize(0.175),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                x: {
                  fontSize: 40,
                  fontFamily: "Microsoft YaHei",
                  borderColor: "#fdf9f1",
                  lineHeight: 10
                }
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(255, 188, 0, 1)",
              borderWidth: 1
            }
          }
        },
        {
          name: "昆剧院",
          symbolSize: 81,
          draggable: true,
          category: 1,
          symbol:
            "image://../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan5.png",
          label: {
            normal: {
              color: "rgba(255,255,255,.45)",
              //             fontSize: 20,
              fontWeight: "normal",
              formatter: [
                "{a|停车场D}",
                // '{a|劣化度}',
                "{b|12}  {c|/}  {d|234}"
              ].join("\n\n"),
              rich: {
                a: {
                  color: "#fef1e8",
                  fontSize: this.fontSize(0.175),
                  //lineHeight: 30,
                  align: "center",
                  fontWeight: "normal"
                },
                b: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.15),
                  //   lineHeight: 40,
                  align: "center",
                  fontWeight: "normal"
                },
                c: {
                  color: "#fdf9f1",
                  fontSize: this.fontSize(0.15),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                d: {
                  color: "white",
                  fontSize: this.fontSize(0.15),
                  //   lineHeight: 40,
                  align: "center"
                  //   fontWeight:'bold',
                },
                x: {
                  fontSize: 40,
                  fontFamily: "Microsoft YaHei",
                  borderColor: "#fdf9f1",
                  lineHeight: 10
                }
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(226, 98, 3, 1)",
              borderWidth: 1
            }
          }
        }
      ],
      links: [
        /*  {
          source: "总停车位",
          target: "停车场A",
          lineStyle: {
            color: "transparent"
          }
        },
        {
          source: "总停车位",
          target: "停车场B",
          lineStyle: {
            color: "transparent"
          }
        },
        {
          source: "总停车位",
          target: "停车场C",
          lineStyle: {
            color: "transparent"
          }
        },
        {
          source: "总停车位",
          target: "停车场D",
          lineStyle: {
            color: "transparent"
          }
        } */
      ]
    };
  },
  created() {
    //this.initEchars();
  },
  mounted() {
    this.initEchars();
  },
  computed: {
    ...mapGetters(["isBlue"])
  },
  watch: {
    isBlue(newValue, oldValue) {
      if (newValue !== oldValue) this.initEchars();
    }
  },
  methods: {
    fontSize(res) {
      let clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (!clientWidth) return;
      let fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    initLoad() {
      let dv = this.$refs.testDragContent; // document.getElementById('dv')
      let x = 0;
      let y = 0;
      let l = 0;
      let t = 0;
      let isDown = false;
      //鼠标按下事件
      dv.onmousedown = function(e) {
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //开关打开
        isDown = true;
        //设置样式
        dv.style.cursor = "move";
      };
      //鼠标移动
      window.onmousemove = function(e) {
        if (isDown == false) {
          return;
        }
        //获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var nt = ny - (y - t);

        dv.style.left = nl + "px";
        dv.style.top = nt + "px";
      };
      //鼠标抬起事件
      dv.onmouseup = function() {
        //开关关闭
        isDown = false;
        dv.style.cursor = "default";
      };
    },
    initEchars() {
      this.deal();
      this.dealLink();
      let liquid = this.$echarts.init(
        document.getElementById("testDragContent")
      );
      let option = {
        tooltip: {
          show: false
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",

        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 1000,
              edgeLength: 50
            },
            //roam: true,
            label: {
              normal: {
                show: true
              }
            },

            data: this.parkList,
            links: this.links,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 5,
                curveness: 0
              }
            },
            categories: [
              {
                name: "0"
              },
              {
                name: "1"
              },
              {
                name: "2"
              }
            ]
          }
        ]
      };
      liquid.setOption(option);
    },
    deal() {
      let temp = [4, 1, 2, 3];
      for (let i = 0; i < this.parkLister.length; i++) {
        if (i === 0) {
          this.parkLister[i].num = 0;
          continue;
        }
        this.parkLister[i].num = temp[i % temp.length];
      }
      this.parkList = this.parkLister.map((item, index) => {
        switch (item.num) {
          case 0:
            return this.imageType0(item.name, item.park, item.total);
            break;
          case 1:
            return this.imageType1(item.name, item.park, item.total);
            break;
          case 2:
            return this.imageType2(item.name, item.park, item.total);
            break;
          case 3:
            return this.imageType3(item.name, item.park, item.total);
            break;
          case 4:
            return this.imageType4(item.name, item.park, item.total);
            break;
        }
      });
    },
    dealLink() {
      this.links = this.parkList.map((item, index) => {
        return {
          source: this.parkList[0].name,
          target: item.name,
          lineStyle: {
            color: "transparent"
          }
        };
      });
      this.links.shift();
    },
    imageType0(name, park, total) {
      return {
        name: name,
        symbolSize: 106,
        draggable: true,
        category: 0,
        symbol: this.isBlue
          ? `image:// ${require("../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan1.png")}`
          : `image:// ${require("../../../../../assets/static/image/bigscreen/RedImage/parkLot/yuan1.png")}`,
        label: {
          normal: {
            color: "rgba(255,255,255,.45)",
            //             fontSize: 20,
            fontWeight: "normal",
            formatter: [
              `{a|${name}}`,
              // '{a|劣化度}',
              `{b|${park}}  {c|/}  {d|${total}}`
            ].join("\n\n"),
            rich: {
              a: {
                color: "#fef1e8",
                fontSize: this.fontSize(0.2),
                //lineHeight: 30,
                align: "center",
                fontWeight: "normal"
              },
              b: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.225),
                //   lineHeight: 40,
                align: "center",
                fontWeight: "normal"
              },
              c: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.225),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              d: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.225),
                //   lineHeight: 40,
                align: "center",
                //   fontWeight:'bold',
                z: 1
              },
              x: {
                fontSize: 40,
                fontFamily: "Microsoft YaHei",
                borderColor: "#fdf9f1",
                lineHeight: 10
              }
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(247, 80, 54, 1)",
            borderWidth: 1
          }
        }
      };
    },
    imageType1(name, park, total) {
      return {
        name: name,
        symbolSize: 67,
        draggable: true,
        category: 1,
        symbol: this.isBlue
          ? `image:// ${require("../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan4.png")}`
          : `image:// ${require("../../../../../assets/static/image/bigscreen/RedImage/parkLot/yuan4.png")}`,

        label: {
          normal: {
            color: "rgba(255,255,255,.45)",
            //             fontSize: 20,
            fontWeight: "normal",
            formatter: [
              `{a|${name}}`,
              // '{a|劣化度}',
              `{b|${park}}  {c|/}  {d|${total}}`
            ].join("\n\n"),
            rich: {
              a: {
                color: "#fef1e8",
                fontSize: this.fontSize(0.15),
                //lineHeight: 30,
                align: "center",
                fontWeight: "normal"
              },
              b: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.125),
                //   lineHeight: 40,
                align: "center",
                fontWeight: "normal"
              },
              c: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.15),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              d: {
                color: "white",
                fontSize: this.fontSize(0.15),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              x: {
                fontSize: 40,
                fontFamily: "Microsoft YaHei",
                borderColor: "#fdf9f1",
                lineHeight: 10
              }
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(211, 102, 28, 1)",
            borderWidth: 1
          }
        }
      };
    },
    imageType2(name, park, total) {
      return {
        name: name,
        symbolSize: 57,
        draggable: true,
        category: 1,
        symbol: this.isBlue
          ? `image:// ${require("../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan3.png")}`
          : `image:// ${require("../../../../../assets/static/image/bigscreen/RedImage/parkLot/yuan3.png")}`,

        label: {
          normal: {
            color: "rgba(255,255,255,.45)",
            //             fontSize: 20,
            fontWeight: "normal",
            formatter: [
              `{a|${name}}`,
              // '{a|劣化度}',
              `{b|${park}}  {c|/}  {d|${total}}`
            ].join("\n\n"),
            rich: {
              a: {
                color: "#fef1e8",
                fontSize: this.fontSize(0.125),
                //lineHeight: 30,
                align: "center",
                fontWeight: "normal"
              },
              b: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.125),
                //   lineHeight: 40,
                align: "center",
                fontWeight: "normal"
              },
              c: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.15),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              d: {
                color: "white",
                fontSize: this.fontSize(0.15),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              x: {
                fontSize: 40,
                fontFamily: "Microsoft YaHei",
                borderColor: "#fdf9f1",
                lineHeight: 10
              }
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(255, 255, 0, 1)",
            borderWidth: 1
          }
        }
      };
    },
    imageType3(name, park, total) {
      return {
        name: name,
        symbolSize: 82,
        draggable: true,
        category: 1,
        symbol: this.isBlue
          ? `image://${require("../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan2.png")}`
          : `image://${require("../../../../../assets/static/image/bigscreen/RedImage/parkLot/yuan2.png")}`,

        label: {
          normal: {
            color: "rgba(255,255,255,.45)",
            //             fontSize: 20,
            fontWeight: "normal",
            formatter: [
               `{a|${name}}`,
              // '{a|劣化度}',
              `{b|${park}}  {c|/}  {d|${total}}`
            ].join("\n\n"),
            rich: {
              a: {
                color: "#fef1e8",
                fontSize: this.fontSize(0.125),
                //lineHeight: 30,
                align: "center",
                fontWeight: "normal"
              },
              b: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.125),
                //   lineHeight: 40,
                align: "center",
                fontWeight: "normal"
              },
              c: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.125),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              d: {
                color: "white",
                fontSize: this.fontSize(0.175),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              x: {
                fontSize: 40,
                fontFamily: "Microsoft YaHei",
                borderColor: "#fdf9f1",
                lineHeight: 10
              }
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(255, 188, 0, 1)",
            borderWidth: 1
          }
        }
      };
    },
    imageType4(name, park, total) {
      return {
        name: name,
        symbolSize: 81,
        draggable: true,
        category: 1,
        symbol: this.isBlue
          ? `image://${require("../../../../../assets/static/image/bigscreen/BlueImage/parkLotCount/yuan5.png")}`
          : `image://${require("../../../../../assets/static/image/bigscreen/RedImage/parkLot/yuan5.png")}`,
        label: {
          normal: {
            color: "rgba(255,255,255,.45)",
            //             fontSize: 20,
            fontWeight: "normal",
            formatter: [
              `{a|${name}}`,
              // '{a|劣化度}',
              `{b|${park}}  {c|/}  {d|${total}}`
            ].join("\n\n"),
            rich: {
              a: {
                color: "#fef1e8",
                fontSize: this.fontSize(0.15),
                //lineHeight: 30,
                align: "center",
                fontWeight: "normal"
              },
              b: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.15),
                //   lineHeight: 40,
                align: "center",
                fontWeight: "normal"
              },
              c: {
                color: "#fdf9f1",
                fontSize: this.fontSize(0.15),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              d: {
                color: "white",
                fontSize: this.fontSize(0.15),
                //   lineHeight: 40,
                align: "center"
                //   fontWeight:'bold',
              },
              x: {
                fontSize: 40,
                fontFamily: "Microsoft YaHei",
                borderColor: "#fdf9f1",
                lineHeight: 10
              }
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(226, 98, 3, 1)",
            borderWidth: 1
          }
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
/* /images/BlueImage/parkLotCount */
.parkingLotStatistics {
  /* overflow: auto; */
  flex: 1;
  margin-top: 0px !important;
  background-size: 0.625rem 3.4rem;
  background-repeat: no-repeat;
  position: relative;
}
.blueBorderBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/rader/biankuang.png");
}

.redBorderBgc {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/biankuang1.png");
}
.parkingLotStatistics::after {
  position: absolute;
  content: "停车场车位统计";
  font-size: 0.175rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  left: 0.65rem;
  top: 0.025rem;
}
.testDrag {
  /* border: 1px solid red; */
  position: absolute;
  top: 6%;
  width: 95%;
  height: 93%;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  .testDragContent {
    background-size: 4.1rem 2.75rem;
    background-repeat: no-repeat;
    background-position: 0.25rem 0.0625rem;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.testDragContentBlue {
  background-image: url("../../../../../assets/static/image/bigscreen/BlueImage/xiayuanbeijing.png");
}
.testDragContentRed {
  background-image: url("../../../../../assets/static/image/bigscreen/RedImage/xiayuanbeijing.png");
}
</style>