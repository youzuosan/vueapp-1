<template>
  <div class="addressWrap">
        <h1>{{ msg }}</h1>
        <!-- 地址title -->
        <ul class="addressTitle">
            <li v-for="_i in addressTitle">{{_i}}</li>
        </ul>
        <ul>
            <li ref="tabA" @click="eventA">选择省</li>
            <li ref="tabB" @click="eventB" style="display:none">选择市</li>
            <li ref="tabC" @click="eventC" style="display:none">选择区</li>
        </ul>
        <!-- 省 -->
        <div ref="provinceId" class="nameList">
              <ul>
                <li v-for = "i in province" @click="provinceEvent(i)">{{i.name}}</li>
              </ul>
        </div>
         <!-- 市 -->
        <div ref="cityId" class="nameList" style="display:none">
              <ul>
                <li v-for = "i in city" @click="cityEvent(i)">{{i.name}}</li>
              </ul>
        </div>
         <!-- 区-->
        <div ref="areaId" class="nameList" style="display:none">
               <ul>
                <li v-for = "i in area" @click="areaEvent(i)">{{i.name}}</li>
              </ul>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addressmenu',
  data(){
      return {
          msg:'vue 配送地址',
          province: '',
          city: '',
          area: '',
          addressTitle : ['配送地址：']
      }
  },
  created(){
    axios.get('http://localhost:9527/productDetail/province')
      .then((_data)=>{
          this.province = _data.data.province
      });
    axios.get('http://localhost:9527/productDetail/city')
      .then((_data)=>{
          this.city = _data.data.city
      });
    axios.get('http://localhost:9527/productDetail/area')
      .then((_data)=>{
          this.area = _data.data.area
      });
  },
  methods:{
    provinceEvent(_i){
      this.$refs.provinceId.style.display = "none"
      this.$refs.cityId.style.display = "block"
      this.$refs.tabB.style.display='block'
      this.$refs.tabA.innerHTML = _i.name
      this.addressTitle.push(_i.name)
    },
    cityEvent(_i){
      this.$refs.cityId.style.display = "none"
      this.$refs.areaId.style.display = "block"
      this.$refs.tabC.style.display='block'
      this.$refs.tabB.innerHTML = _i.name
      this.addressTitle.push(_i.name)

    },
    areaEvent(_i){
       this.$refs.areaId.style.display = "none"
       this.$refs.tabC.innerHTML = _i.name
       console.log(this.addressTitle)
       this.addressTitle.splice(3,1)
       this.addressTitle.push(_i.name)
    },
    //省按钮
    eventA(){
      this.$refs.tabB.style.display='none'
      this.$refs.tabC.style.display='none'
      this.$refs.provinceId.style.display = "block"
      this.$refs.cityId.style.display = "none"
      this.$refs.areaId.style.display = "none"
      this.addressTitle.splice(1,3)
      this.$refs.tabA.innerHTML = '选择省'
      this.$refs.tabB.innerHTML = '选择市'
      this.$refs.tabC.innerHTML = '选择区'
    },
    //市按钮
    eventB(){
      this.$refs.tabC.style.display='none'
      this.$refs.provinceId.style.display = "none"
      this.$refs.cityId.style.display = "block"
      this.$refs.areaId.style.display = "none"
      this.addressTitle.splice(2,2)
      this.$refs.tabB.innerHTML = '选择市'
      this.$refs.tabC.innerHTML = '选择区'
    },
    //区按钮
    eventC(){
      this.$refs.provinceId.style.display = "none"
      this.$refs.cityId.style.display = "none"
      this.$refs.areaId.style.display = "block"
    }
  }
}
</script>

<style scoped>
 *{margin:0;padding:0;border:0;}
  ul,ol,li{list-style: none;}
  /**/
  .addressWrap ul.addressTitle{
    background: #fff;border:1px solid #000;margin:10px;padding:0;border-radius: 10px;
  }
  .addressWrap ul.addressTitle li{background: #fff;padding:0;margin:10px;}
  /**/
  .addressWrap{
    width:500px;height: 400px;background: #eee;border:1px solid #ddd;margin:0 auto;
  }
  .addressWrap ul{
    clear: both;padding: 10px;background: #5d5d5d;display: block;overflow: hidden;
  }
  .addressWrap ul li{
    font-size: 14px;padding:5px;
    float: left;margin-left: 10px;background: #ddd;cursor: pointer;
  }
  .addressWrap ul li:hover{
    background: #eee;
  }
  /**/
  .nameList{
    clear: both;margin:10px;background: #5e5e5e;padding: 10px;
  }
  .nameList ul{
    clear: both;padding: 10px;background: #5d5d5d;display: block;overflow: hidden;
  }
  .nameList ul li{
    font-size: 14px;padding:5px;
    float: left;margin-left: 10px;background: #ddd;cursor: pointer;
  }
  .nameList ul li:hover{
    background: #eee;
  }
</style>
