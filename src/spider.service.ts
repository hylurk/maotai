import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import xlsx from 'node-xlsx'
const fs = require('fs')

const spiderData = [
  {
    name : 'sheet1',
    data: []
  }
]

@Injectable()
export class SpiderService {
  private readonly logger = new Logger(SpiderService.name);
  constructor() {}

  async getSpider() {
    const url = 'http://quotes.money.163.com/f10/zycwzb_600519.html'
    const res = await axios.get(url)
    this.logger.log('打印净利润结果')
    const $ = cheerio.load(res.data);
    const lists = $('#scrollTable').children('div.col_r').children('table').children('tbody').children('tr').eq(10).children('td')
    const listData = []
    lists.each(function(i, item) {
      listData[i] = $(this).text()
    })
    spiderData[0].data = [['净利润', ...listData]]
    this.logger.log(spiderData)
    const buffer = xlsx.build([{name: 'sheet1', data: spiderData[0].data}])
    fs.writeFile('./resut.xls', buffer, function (err) {
      if (err) throw err;
      const obj = xlsx.parse("./" + "resut.xls");
      console.log(JSON.stringify(obj));
    });
    // this.logger.log($('#scrollTable > div.col_r > table > tbody > tr:nth-child(11)'))
  }
  /**
   *
   * 访问商品获取名称拿cookie
   * @returns
   * @memberof ProductService
   */
  // async getProduct() {
  //   const url = `https://item.jd.com/${productId}.html`;
  //   const res = await axios.get(url, {
  //     headers: {
  //       'User-Agent': this.loginService.ua,
  //       cookie: this.loginService.cookieToHeader(),
  //     },
  //   });
  //   this.loginService.cookieStore(res.headers);
  //   const $ = cheerio.load(res.data);
  //   const title = $('title').text();
  //   this.logger.log(`您设定的抢购商品为：${title}`);
  //   return;
  // }
}
