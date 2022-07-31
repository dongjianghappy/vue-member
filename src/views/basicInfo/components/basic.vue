<template>
<div class="module-wrap">
  <div class="module-content basic-info" style="padding-bottom: 25px !important;">

    <div class="info-module">
      <span class="name">基本信息</span>
      <div class="line"></div>
      <span data-coding="" class="update-info editbtn">编辑</span>
    </div>
    <ul class="info">
      <!--    <li>
                <label>ID</label>
                <div></div>
            </li>-->
      <li>
        <label>用户名</label>
        <div>dongjiang&nbsp;&nbsp;&nbsp;&nbsp;ID 110506372</div>
      </li>
      <li>
        <label>昵称</label>
        <div class="con">东江哥</div>
        <input type="text" field="nickname" value="东江哥" class="input-sm">
      </li>
      <li>
        <label>签名</label>
        <div class="con"></div>
        <input type="text" field="signature" value="" class="input-sm">
      </li>
      <li>
        <label>真实姓名</label>
        <div class="con"></div>
        <input type="text" field="realname" value="" class="input-sm">
      </li>
      <li>
        <label>姓别</label>
        <div class="con">男</div>
        <span id="sex-groud" style="display:none">
          <input name="sex" type="radio" value="1" class="sex" checked=""> 男&nbsp;&nbsp;
          <input name="sex" type="radio" value="0" class="sex"> 女
        </span>
      </li>

      <li>
        <label>生日</label>
        <div class="con"><span id="year"></span>年 <span id="month"></span>月 <span id="day"></span>日</div>
        <span class="selectgroup">
          <select id="select_year" rel="" field="year">
            <option value="0">--</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            <option value="1979">1979</option>
            <option value="1978">1978</option>
            <option value="1977">1977</option>
            <option value="1976">1976</option>
            <option value="1975">1975</option>
            <option value="1974">1974</option>
            <option value="1973">1973</option>
            <option value="1972">1972</option>
            <option value="1971">1971</option>
            <option value="1970">1970</option>
            <option value="1969">1969</option>
            <option value="1968">1968</option>
            <option value="1967">1967</option>
            <option value="1966">1966</option>
            <option value="1965">1965</option>
            <option value="1964">1964</option>
            <option value="1963">1963</option>
            <option value="1962">1962</option>
            <option value="1961">1961</option>
            <option value="1960">1960</option>
            <option value="1959">1959</option>
            <option value="1958">1958</option>
            <option value="1957">1957</option>
            <option value="1956">1956</option>
            <option value="1955">1955</option>
            <option value="1954">1954</option>
            <option value="1953">1953</option>
            <option value="1952">1952</option>
            <option value="1951">1951</option>
            <option value="1950">1950</option>
            <option value="1949">1949</option>
            <option value="1948">1948</option>
            <option value="1947">1947</option>
            <option value="1946">1946</option>
            <option value="1945">1945</option>
            <option value="1944">1944</option>
            <option value="1943">1943</option>
            <option value="1942">1942</option>
            <option value="1941">1941</option>
            <option value="1940">1940</option>
            <option value="1939">1939</option>
            <option value="1938">1938</option>
            <option value="1937">1937</option>
            <option value="1936">1936</option>
            <option value="1935">1935</option>
            <option value="1934">1934</option>
            <option value="1933">1933</option>
            <option value="1932">1932</option>
            <option value="1931">1931</option>
            <option value="1930">1930</option>
            <option value="1929">1929</option>
            <option value="1928">1928</option>
            <option value="1927">1927</option>
            <option value="1926">1926</option>
            <option value="1925">1925</option>
            <option value="1924">1924</option>
            <option value="1923">1923</option>
            <option value="1922">1922</option>
            <option value="1921">1921</option>
            <option value="1920">1920</option>
            <option value="1919">1919</option>
            <option value="1918">1918</option>
            <option value="1917">1917</option>
            <option value="1916">1916</option>
            <option value="1915">1915</option>
            <option value="1914">1914</option>
            <option value="1913">1913</option>
            <option value="1912">1912</option>
            <option value="1911">1911</option>
            <option value="1910">1910</option>
            <option value="1909">1909</option>
            <option value="1908">1908</option>
            <option value="1907">1907</option>
            <option value="1906">1906</option>
            <option value="1905">1905</option>
            <option value="1904">1904</option>
            <option value="1903">1903</option>
            <option value="1902">1902</option>
            <option value="1901">1901</option>
            <option value="1900">1900</option>
          </select>年
          <select id="select_month" rel="" field="month">
            <option value="0">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>月
          <select id="select_day" rel="" field="day">
            <option value="0">--</option>
          </select>日
        </span>
      </li>

      <li>
        <label>所在地</label>
        <div class="con">
          <span id="province"></span>
          <span id="city"></span>
          <span id="area"></span>
        </div>
        <span class="selectgroup">
          <select id="select_province" rel="" field="province">
            <option value="">省份</option>
            <option value="1">北京市</option>
            <option value="22">天津市</option>
            <option value="44">上海市</option>
            <option value="66">重庆市</option>
            <option value="108">河北省</option>
            <option value="406">山西省</option>
            <option value="622">内蒙古</option>
            <option value="804">辽宁省</option>
            <option value="945">吉林省</option>
            <option value="1036">黑龙江省</option>
            <option value="1226">江苏省</option>
            <option value="1371">浙江省</option>
            <option value="1500">安徽省</option>
            <option value="1679">福建省</option>
            <option value="1812">江西省</option>
            <option value="1992">山东省</option>
            <option value="2197">河南省</option>
            <option value="2456">湖北省</option>
            <option value="2613">湖南省</option>
            <option value="2822">广东省</option>
            <option value="3015">广西</option>
            <option value="3201">海南省</option>
            <option value="3235">四川省</option>
            <option value="3561">贵州省</option>
            <option value="3728">云南省</option>
            <option value="3983">西藏</option>
            <option value="4136">陕西省</option>
            <option value="4334">甘肃省</option>
            <option value="4499">青海省</option>
            <option value="4588">宁夏</option>
            <option value="4624">新疆</option>
            <option value="4802">香港</option>
            <option value="4822">澳门</option>
            <option value="4825">台湾省</option>
          </select>
          <select id="select_city" rel="" field="city">
            <option value="">地级市</option>
          </select>
          <select id="select_area" rel="" field="area">
            <option value="">市、县、区</option>
          </select>
        </span>
      </li>
      <li><label>血型</label>
        <div class="con"> 型</div>
        <span class="selectgroup">
          <select field="bloodtype" class="">
            <option value="A">A型</option>
            <option value="B">B型</option>
            <option value="AB">AB型</option>
            <option value="O">O型</option>
          </select>
        </span>
      </li>
      <!--    <li><label>博客地址</label>
                <div class="con"></div>
                <input type="text" field="blog" value="" class="" >
            </li>-->
      <li><label>简介</label>
        <div class="con"></div>
        <textarea field="introduction" class=""></textarea>
      </li>
    </ul>
  </div>

  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module">
      <span class="name">联系信息</span>
      <div class="line"></div>
      <span class="update-info editbtn">编辑</span>
    </div>
    <ul class="info">
      <li>
        <label>邮箱</label>
        <div class="con">125772116@qq.com</div>
        <input type="text" field="email" value="125772116@qq.com" class="input-sm">
      </li>
      <li>
        <label>电话</label>
        <div class="con"></div>
        <input type="text" field="phone" value="" class="input-sm">
      </li>
      <li>
        <label>QQ</label>
        <div class="con"></div>
        <input type="text" field="qq" value="" class="input-sm">
      </li>
      <li>
        <label>微信</label>
        <div class="con"></div>
        <input type="text" field="weixin" value="" class="input-sm">
      </li>
    </ul>
  </div>

  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module">
      <span class="name">博客信息</span>
      <div class="line"></div>
      <span class="update-info editbtn">编辑</span>
    </div>
    <ul class="info">
      <li>
        <label>标签</label>
        <div class="con"></div>
        <textarea field="blog_tag" class=""></textarea>
      </li>
      <li>
        <label>描述</label>
        <div class="con"></div>
        <textarea field="blog_desc" class=""></textarea>
      </li>
    </ul>
  </div>

  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module">
      <span class="name">职业信息</span>
      <div class="line"></div>
      <span class="update-info editbtn">编辑</span>
    </div>
    <ul class="info">
      <li>
        <label for="username">职业</label>
        <div class="con"></div>
        <textarea field="industry" class=""></textarea>
      </li>
    </ul>
  </div>

  <div class="module-content basic-info" style="padding-bottom: 25px !important;">
    <div class="info-module">
      <span class="name">教育信息</span>
      <div class="line"></div>
      <span class="update-info editbtn">编辑</span>
    </div>
    <ul class="info">
      <li>
        <label for="username"></label>
        <div class="con"></div>
        <textarea field="education" class=""></textarea>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'AsideView',

})
</script>
