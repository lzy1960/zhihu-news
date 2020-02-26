import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { getLongComment, getShortComment } from '../apis/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  public comments: any = {
    long_comments: [],
    short_comments: []
  };
  public id: number;
  // 前端渲染的列表
  public commentsList = [{
    key: 'long_comments',
    label: '长评'
  }, {
    key: 'short_comments',
    label: '短评'
  }];

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUrlId();
    this.getLongComment();
    this.getShortComment();
  }

  // 获取长评
  async getLongComment() {
    const query = {
      id: this.id
    };
    const res = await getLongComment(query);
    if (res) {
      console.log(res);
      this.comments.long_comments = res.data.latest;
    }
  }
  // 获取短评
  async getShortComment() {
    const query = {
      id: this.id
    };
    const res = await getShortComment(query);
    if (res) {
      console.log(res);
      this.comments.short_comments = res.data.latest;
    }
  }

  getUrlId() {
    this.activatedRoute.params.subscribe((params: { id: number; }) => {
      if (params.id) {
        this.id = params.id;
      }
    });
  }

}
