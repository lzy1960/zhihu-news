import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { getArticle, getExtraInfo } from '../apis/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  public article: any = {};
  public id: number;
  public imageHue: string;
  // 下方评论点赞等数量
  public extraInfo: any;

  constructor(
    public activatedRoute: ActivatedRoute,
  ) { }

  // 获取文章的各种数量
  async getExtraInfo() {
    const query = {
      id: this.id
    };
    const res = await getExtraInfo(query);
    if (res) {
      console.log(res);
      this.extraInfo = res.data;
      console.log(this.extraInfo);
    }
  }

  async getArticle() {
    const query = {
      id: this.id
    };
    const res = await getArticle(query);
    if (res) {
      console.log(res);
      this.article = res.data;
      // 获取到的十六进制的颜色
      this.imageHue = '#' + parseInt(this.article.image_hue).toString(16);
      this.getExtraInfo();
    }
  }

  getUrlId() {
    this.activatedRoute.params.subscribe((params: { id: number; }) => {
      if (params.id) {
        this.id = params.id;
      }
    });
  }

  ngOnInit() {
    this.getUrlId();
    this.getArticle();
  }

  doLike() {
    console.log('点赞');
  }

  addToFavorite() {
    console.log('收藏');
  }

  resend() {
    console.log('转发');
  }

}
