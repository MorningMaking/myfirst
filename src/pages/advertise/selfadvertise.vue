<template>
    <div class="selfadcontainer">
        <div class="aditemcontainer">
            <div class="adeversurface">
                <h1>1</h1>
                <img :src="defauladcover[0].url" alt="">
                <input type="file" ref="imagePut1" @change="changeFirstImage($event)" style="display:none"
           accept="image/gif,image/jpeg,image/jpg,image/png"/>
                <div class="changemask"   @click="toggleFirstImg()">
                    <span>更换</span>
                </div>  
            </div>
            <div class="advertisemsg">
                <div>
                     <h1>广告主题:</h1>
                     <input type="text" placeholder="请输入广告主题" maxlength="30" v-model="adverlist[0].title">
                     <span>{{adverlist[0].title.length+'/30'}}</span>
                </div>
                <div class="adurl">
                     <h1>链接地址:</h1>
                     <input type="text" placeholder="请输入链接地址" v-model="adverlist[0].url" >
                     <img src="../../assets/img/clear.png" alt="" @click="adverlist[0].url=''">
                </div>
            </div>
        </div>
        <div class="aditemcontainer">
            <div class="adeversurface">
                <h1>2</h1>
                <img :src="defauladcover[1].url" alt="" ref="adtwo">
                <input type="file" ref="imagePut2" @change="changeSecondImage($event)" style="display:none"
           accept="image/gif,image/jpeg,image/jpg,image/png"/>
                <div class="changemask"   @click="toggleSecondImg()">
                    <span>更换</span>
                </div>
            </div>
            <div class="advertisemsg">
                <div>
                     <h1>广告主题:</h1>
                     <input type="text" placeholder="请输入广告主题" maxlength="30" v-model="adverlist[1].title">
                     <span>{{adverlist[1].title.length+'/30'}}</span>
                </div>
                <div class="adurl">
                     <h1>链接地址:</h1>
                     <input type="text" placeholder="请输入链接地址" v-model="adverlist[1].url">
                     <img src="../../assets/img/clear.png" alt=""  @click="adverlist[1].url=''">
                </div>
            </div>
        </div>
        <div class="aditemcontainer">
            <div class="adeversurface">
                <h1>3</h1>
                <img :src="defauladcover[2].url" alt="">
                <input type="file" ref="imagePut3" @change="changeThirdImage($event)" style="display:none"
           accept="image/gif,image/jpeg,image/jpg,image/png"/>
                <div class="changemask"   @click="toggleThirdImg()">
                    <span>更换</span>
                </div>
            </div>
            <div class="advertisemsg">
                <div>
                     <h1>广告主题:</h1>
                     <input type="text" placeholder="请输入广告主题" maxlength="30" v-model="adverlist[2].title">
                     <span>{{adverlist[2].title.length+'/30'}}</span>
                </div>
                <div class="adurl">
                     <h1>链接地址:</h1>
                     <input type="text" placeholder="请输入链接地址" v-model="adverlist[2].url">
                      <img src="../../assets/img/clear.png" alt=""  @click="adverlist[2].url=''">
                </div>
            </div>
        </div>
        <div class="submitbtn">
            <span @click="submitad">发布</span>
        </div>
    </div>    
</template>

<script>
import { createSelfAd, getRoomSelfAd } from "@/common/api/advertise";
import { imageUpload } from "@/common/api/imageUpload";
import { Toast,MessageBox} from "mint-ui";

export default {
  data() {
    return {
      roomId: "",
      urlstatus:true,
      adverlist: [
        {
          cover: null,
          title: "百度",
          url: "http://www.baidu.com"
        },
        {
          cover: null,
          title: "新浪",
          url: "http://www.sina.com"
        },
        {
          cover: null,
          title: "网易",
          url: "http://www.163.com"
        }
      ],
      defauladcover: [
        {
          url:
            "https://apps-1255573444.file.myqcloud.com/gamecenter/default/default1.jpg"
        },
        {
          url:
            "https://apps-1255573444.file.myqcloud.com/gamecenter/default/default2.jpg"
        },
        {
          url:
            "https://apps-1255573444.file.myqcloud.com/gamecenter/default/default3.jpg"
        }
      ]
    };
  },
  methods: {
    toggleFirstImg() {
      this.$refs.imagePut1.click();
    },
    toggleSecondImg() {
      this.$refs.imagePut2.click();
    },
    toggleThirdImg() {
      this.$refs.imagePut3.click();
    },
    changeFirstImage(e) {
      let file = e.target.files[0];
      this.adverlist[0].cover = file;
      this.defauladcover[0].url = window.URL.createObjectURL(file);
    },
    changeSecondImage(e) {
      let file = e.target.files[0];
      this.adverlist[1].cover = file;
      this.defauladcover[1].url = window.URL.createObjectURL(file);
    },
    changeThirdImage(e) {
      let file = e.target.files[0];
      this.adverlist[2].cover = file;
      this.defauladcover[2].url = window.URL.createObjectURL(file);
    },

    async submitad() {
      let urlcheck=new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]")
    //  if(urlcheck.test()){}
      this.urlstatus=true
      this.adverlist.map((item,index)=>{
        if(!urlcheck.test(item.url)){
            MessageBox("提示", "广告主题"+"\""+item.title+"\""+"输入的网址不合法");
            this.urlstatus=false
        }
      })
      if(this.urlstatus){
         await this.uploadimg();
       // console.log(this.adverlist);
        let res = await createSelfAd(this.roomId, JSON.stringify(this.adverlist));
        let instance = Toast("配置广告成功");
        setTimeout(() => {
          instance.close();
          this.$router.push("/room");
        }, 1500);
        console.log(res);
      }
    
    },
    async uploadimg() {
      for (let i = 0; i < this.adverlist.length; i++) {
        let item = this.adverlist[i];
        if (item.cover !== null) {
          //必须是文件类型才上传到腾讯云
          if (typeof item.cover === "object") {
            let res = await imageUpload(item.cover);
            //   console.log(res);
            item.cover = "https://" + res;
          }
          // console.log(item.cover);
        } else {
          item.cover = this.defauladcover[i].url;
        }
      }
    }
  },
  mounted() {
    this.roomId = this.$route.params.roomId;
    getRoomSelfAd(this.roomId).then(res => {
      if (res.data.advert != "") {
        let adarr = JSON.parse(res.data.advert);
        if (adarr.length > 0) {
          this.adverlist = adarr;
          this.defauladcover = [];
          for (let i = 0; i < adarr.length; i++) {
            this.defauladcover.push({ url: adarr[i].cover });
          }
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
.selfadcontainer {
  flex: 1;
  .aditemcontainer {
    margin-bottom: 20px;
    .adeversurface {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 171px;
      background: #fff;
      border-radius: 10px;
      position: relative;
      margin-bottom: 10px;
      > h1 {
        position: absolute;
        left: 0;
        width: 60px;
        height: 60px;
        font-size: 40px;
        text-align: center;
        margin-left: 10px;
        color: rgba(12, 45, 114, 1);
        border: 2px solid rgba(12, 45, 114, 1);
        border-radius: 50%;
      }
      > img {

        width: 388px;
        height: 248px;
        border-radius: 10px;
      }
      .changemask {
        position: absolute;
        width: 388px;
        height: 248px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        top: 20px;
        display: flex;
        justify-content: center;
        > span {
          margin-top: 94px;
          color: #fff;
          font-size: 36px;
          height: 60px;
          color: rgba(255, 255, 255, 1);
          padding: 3px 35px;
          border: 2px solid #fff;
          border-radius: 10px;
        }
      }
    }
    .advertisemsg {
      > div {
        height: 100px;
        background: #fff;
        border-bottom: 1px solid #ddd;
        padding: 0px 20px;
        display: flex;
        align-items: center;

        > h1 {
          font-size: 32px;
          color: rgba(51, 51, 51, 1);
          line-height: 9px;
          margin-right: 10px;
        }
        input {
          flex: 2;
          font-size: 32px;
        }
        > span {
          font-size: 22px;
          color: rgba(179, 179, 182, 1);
        }
      }
      .adurl{
  //      padding-right:52px;
        >img{
          margin-left: 5px;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  .submitbtn {
    display: flex;
    justify-content: center;
    margin: 40px 0px;
    > span {
      padding: 12px 215px;
      background: rgba(12, 45, 114, 1);
      border-radius: 10px;
      font-size: 36px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
