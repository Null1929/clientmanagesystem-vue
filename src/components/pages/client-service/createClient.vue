<template>
  <div>
    <table>
      <tr>
        <td>
          <label>客户编号</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientId" disabled/>
        </td>
        <td>
          <label>名称</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientName"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>地区</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientDistrict"/>
        </td>
        <td>
          <label>客户经理</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientManager"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>客户等级</label>
        </td>
        <td>
          <el-select v-model="client.clientDegree" placeholder="请选择">
            <el-option
                v-for="item in clientDegreeList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </td>
        <td>
          <label>客户满意度</label>
        </td>
        <td>
          <el-select v-model="client.clientSatisfaction" placeholder="请选择">
            <el-option
                v-for="item in starts"
                :key="item.key"
                :label="item.value"
                :value="item.key">
            </el-option>
          </el-select>
        </td>
      </tr>

      <tr>
        <td>
          <label>客户信用度</label>
        </td>
        <td>
          <el-select v-model="client.clientCredit" placeholder="请选择">
            <el-option
                v-for="item in starts"
                :key="item.key"
                :label="item.value"
                :value="item.key">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>
          <label>地址</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientAddress"/>
        </td>
        <td>
          <label>邮政编码</label>
        </td>
        <td>
          <el-input type="number" v-model="client.clientPostcode"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>电话</label>
        </td>
        <td>
          <el-input type="number" v-model="client.clientNumber"/>
        </td>
        <td>
          <label>传真</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientFax"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>网址</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientUrl"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>营业执照注册号</label>
        </td>
        <td>
          <el-input type="number" v-model="client.clientLicense"/>
        </td>
        <td>
          <label>法人</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientCorporation"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>注册资金(万元)</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientRegisteredcapital"/>
        </td>
        <td>
          <label>年营业额(万元)</label>
        </td>
        <td>
          <el-input type="text" v-model="client.clientAnnualturnover"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>开户银行</label>
        </td>
        <td>
          <el-select v-model="client.bank" placeholder="请选择">
            <el-option
                v-for="item in bankNameList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </td>
        <td>
          <label>银行账号</label>
        </td>
        <td>
          <el-input type="number" v-model="client.bankAccount"/>
        </td>
      </tr>

      <tr>
        <td>
          <label>地税登记号</label>
        </td>
        <td>
          <el-input type="number" v-model="client.propertyTaxRegistrationNumber"/>
        </td>
        <td>
          <label>国税登记号</label>
        </td>
        <td>
          <el-input type="number" v-model="client.nationalTaxRegistrationNumber"/>
        </td>
      </tr>
      <tr>
        <td>
          <el-button @click="addClient()" round>添加</el-button>
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemCreateClient',

  data() {
    return {
      client: {
        clientId: null,
        clientName: null,
        clientDistrict: null,
        clientManager: null,
        clientDegree: '',
        clientSatisfaction: '',
        clientCredit: '',
        clientAddress: null,
        clientPostcode: null,
        clientNumber: null,
        clientFax: null,
        clientUrl: null,
        clientLicense: null,
        clientCorporation: null,
        clientRegisteredcapital: null,
        clientAnnualturnover: null,
        bank: null,
        bankAccount: null,
        propertyTaxRegistrationNumber: null,
        nationalTaxRegistrationNumber: null,
      },

      starts: [
        {
          key:1,
          value:"很差"
        },
        {
          key:2,
          value:"差"
        },
        {
          key:3,
          value:"一般"
        },
        {
          key:4,
          value:"好"
        },
        {
          key:5,
          value:"很好"
        }
      ],

      clientDegreeList: [1,2,3,4,5],

      bankCodeList: ['SRCB', 'BGB', 'SHRCB', 'BJBANK', 'WHCCB', 'BOZK', 'KORLABANK', 'SPABANK', 'SDEB', 'HURCB', 'WRCB', 'BOCY', 'CZBANK', 'HDBANK', 'BOC', 'BOD', 'CCB', 'ZYCBANK', 'SXCB', 'GZRCU', 'ZJKCCB', 'BOJZ', 'BOP', 'HKB', 'SPDB', 'NXRCU', 'NYNB', 'GRCB', 'BOSZ', 'HZCB', 'HSBK', 'HBC', 'JXBANK', 'HRXJB', 'BODD', 'AYCB', 'EGBANK', 'CDB', 'TCRCB', 'NJCB', 'ZZBANK', 'DYCB', 'YBCCB', 'SCRCU', 'KLB', 'LSBANK', 'YDRCB', 'CCQTGB', 'FDB', 'JSRCU', 'JNBANK', 'CMB', 'JINCHB', 'FXCB', 'WHRCB', 'HBYCBANK', 'TZCB', 'TACCB', 'XCYH', 'CEB', 'NXBANK', 'HSBANK', 'JJBANK', 'NHQS', 'MTBANK', 'LANGFB', 'ASCB', 'KSRB', 'YXCCB', 'DLB', 'DRCBCL', 'GCB', 'NBBANK', 'BOYK', 'SXRCCU', 'GLBANK', 'BOQH', 'CDRCB', 'QDCCB', 'HKBEA', 'HBHSBANK', 'WZCB', 'TRCB', 'QLBANK', 'GDRCC', 'ZJTLCB', 'GZB', 'GYCB', 'CQBANK', 'DAQINGB', 'CGNB', 'SCCB', 'CSRCB', 'SHBANK', 'JLBANK', 'CZRCB', 'BANKWF', 'ZRCBANK', 'FJHXBC', 'ZJNX', 'LZYH', 'JSB', 'BOHAIB', 'CZCB', 'YQCCB', 'SJBANK', 'XABANK', 'BSB', 'JSBANK', 'FSCB', 'HNRCU', 'COMM', 'XTB', 'CITIC', 'HXBANK', 'HNRCC', 'DYCCB', 'ORBANK', 'BJRCB', 'XYBANK', 'ZGCCB', 'CDCB', 'HANABANK', 'CMBC', 'LYBANK', 'GDB', 'ZBCB', 'CBKF', 'H3CB', 'CIB', 'CRCBANK', 'SZSBK', 'DZBANK', 'SRBANK', 'LSCCB', 'JXRCU', 'ICBC', 'JZBANK', 'HZCCB', 'NHB', 'XXBANK', 'JRCB', 'YNRCC', 'ABC', 'GXRCU', 'PSBC', 'BZMD', 'ARCU', 'GSRCU', 'LYCB', 'JLRCU', 'URMQCCB', 'XLBANK', 'CSCB', 'JHBANK', 'BHB', 'NBYZ', 'LSBC', 'BOCD', 'SDRCU', 'NCB', 'TCCB', 'WJRCB', 'CBBQS', 'HBRCU'],
      bankNameList: ['深圳农村商业银行', '广西北部湾银行', '上海农村商业银行', '北京银行', '威海市商业银行', '周口银行', '库尔勒市商业银行', '平安银行', '顺德农商银行', '湖北省农村信用社', '无锡农村商业银行', '朝阳银行', '浙商银行', '邯郸银行', '中国银行', '东莞银行', '中国建设银行', '遵义市商业银行', '绍兴银行', '贵州省农村信用社', '张家口市商业银行', '锦州银行', '平顶山银行', '汉口银行', '上海浦东发展银行', '宁夏黄河农村商业银行', '广东南粤银行', '广州农商银行', '苏州银行', '杭州银行', '衡水银行', '湖北银行', '嘉兴银行', '华融湘江银行', '丹东银行', '安阳银行', '恒丰银行', '国家开发银行', '江苏太仓农村商业银行', '南京银行', '郑州银行', '德阳商业银行', '宜宾市商业银行', '四川省农村信用', '昆仑银行', '莱商银行', '尧都农商行', '重庆三峡银行', '富滇银行', '江苏省农村信用联合社', '济宁银行', '招商银行', '晋城银行JCBANK', '阜新银行', '武汉农村商业银行', '湖北银行宜昌分行', '台州银行', '泰安市商业银行', '许昌银行', '中国光大银行', '宁夏银行', '徽商银行', '九江银行', '农信银清算中心', '浙江民泰商业银行', '廊坊银行', '鞍山银行', '昆山农村商业银行', '玉溪市商业银行', '大连银行', '东莞农村商业银行', '广州银行', '宁波银行', '营口银行', '陕西信合', '桂林银行', '青海银行', '成都农商银行', '青岛银行', '东亚银行', '湖北银行黄石分行', '温州银行', '天津农商银行', '齐鲁银行', '广东省农村信用社联合社', '浙江泰隆商业银行', '赣州银行', '贵阳市商业银行', '重庆银行', '龙江银行', '南充市商业银行', '三门峡银行', '常熟农村商业银行', '上海银行', '吉林银行', '常州农村信用联社', '潍坊银行', '张家港农村商业银行', '福建海峡银行', '浙江省农村信用社联合社', '兰州银行', '晋商银行', '渤海银行', '浙江稠州商业银行', '阳泉银行', '盛京银行', '西安银行', '包商银行', '江苏银行', '抚顺银行', '河南省农村信用', '交通银行', '邢台银行', '中信银行', '华夏银行', '湖南省农村信用社', '东营市商业银行', '鄂尔多斯银行', '北京农村商业银行', '信阳银行', '自贡市商业银行', '成都银行', '韩亚银行', '中国民生银行', '洛阳银行', '广东发展银行', '齐商银行', '开封市商业银行', '内蒙古银行', '兴业银行', '重庆农村商业银行', '石嘴山银行', '德州银行', '上饶银行', '乐山市商业银行', '江西省农村信用', '中国工商银行', '晋中市商业银行', '湖州市商业银行', '南海农村信用联社', '新乡银行', '江苏江阴农村商业银行', '云南省农村信用社', '中国农业银行', '广西省农村信用', '中国邮政储蓄银行', '驻马店银行', '安徽省农村信用社', '甘肃省农村信用', '辽阳市商业银行', '吉林农信', '乌鲁木齐市商业银行', '中山小榄村镇银行', '长沙银行', '金华银行', '河北银行', '鄞州银行', '临商银行', '承德银行', '山东农信', '南昌银行', '天津银行', '吴江农商银行', '城市商业银行资金清算中心', '河北省农村信用社'],

    };
  },

  mounted() {
    httpRequest.get('/databaseservice/dataBase/getServiceTypeByClient').then((response) => {
      this.serviceTypeList = response.data.data
    });
  },

  methods: {
    addClient() {
      httpRequest.post('/clientservice/client/addClient', this.client)
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data)
              this.$router.push('/client/pageClients')
            } else {
              alert(response.data.resDesc);
              window.location.reload();
            }
          });
    },
  },
};
</script>

<style lang="scss" scoped></style>