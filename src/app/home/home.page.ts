import { Component, OnInit, ElementRef } from '@angular/core';

import { getData, getLastData } from '../apis/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // 今天的日期格式
  public date = new Date();
  // 每次请求接口的日期
  public dateStr = '';
  // 所有数据的对象数据
  public dataList: any[] = [];
  // 新闻列表
  public newsList: any[] = [];
  // 轮播图
  public newsSlides: any[] = [];
  // 轮播图的配置
  public slideOptions: object = {};
  // 是否是刷新操作
  public refreshing: boolean = false;

  constructor(private view: ElementRef) {

  }

  ngOnInit() {
    this.getData().then(() => {
      this.getLastData(this.dateStr);
    });
  }

  // 下拉刷新
  doRefresh(event: any) {
    this.refreshing = true;
    this.getData().then(() => {
      this.getLastData(this.dateStr);
      event.target.complete();
      this.refreshing = false;
    });
  }

  scrollToTop(duration: number) {
    this.view.nativeElement.querySelector('#view').scrollToTop(duration);
  }

  // 获取最新的数据
  async getData() {
    const query = {};
    const res = await getData(query);
    if (res) {
      console.log(res.data);
      if (this.refreshing) {
        this.dataList = [res.data];
      } else {
        this.dataList.push(res.data);
      }
      this.dateStr = res.data.date;
      this.newsSlides = res.data.top_stories;
      // 每个轮播图的渐变色转换为16进制颜色
      this.newsSlides.forEach(item => {
        item.image_hue = '#' + parseInt(item.image_hue).toString(16);
      });
    }
  }
  // 根据日期获取数据
  async getLastData(date: string) {
    const query = {
      date
    };
    const res: any = await getLastData(query);
    if (res) {
      console.log(res);
      this.dateStr = res.data.date;
      res.data.date = this.calcDate(this.dateStr);
      this.dataList.push(res.data);
      console.log(this.dataList);
    }
  }
  // 下拉加载更多,每次获取三天的数据
  async loadMore(event: any) {
    for (let i = 0; i < 3; i++) {
      // 这里用了异步，否则会出现三次请求相同的数据(三次的this.dateStr相同)
      await this.getLastData(this.dateStr);
    }
    event.target.complete();
  }
  // 将dateStr转为日期格式
  // 20190101 -> 2019/01/01
  // 然后就可以进行日期计算了
  calcDate(date: string) {
    const year = date.substr(0, 4);
    const month = date.substr(4, 2);
    const day = date.substr(-2);

    const result = [year, month, day].join('/');
    return new Date(result);
  }
}
