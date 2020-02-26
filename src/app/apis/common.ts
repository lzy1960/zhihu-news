import axios from 'axios';

export const root2 = 'http://news-at.zhihu.com/api/2';
export const root3 = 'http://news-at.zhihu.com/api/3';
export const root4 = 'http://news-at.zhihu.com/api/3';

// 获取最新(今天)的数据
export const getData = (query: any) => axios.get(`${root2}/news/latest`, { params: query });
// 获取指定日期前的数据
export const getLastData = (query: any) => axios.get(`${root2}/news/before/${query.date}`);
// 获取文章详情
export const getArticle = (query: any) => axios.get(`${root2}/news/${query.id}`, { params: query });
// 获取新闻额外信息，如评论数、点赞数
export const getExtraInfo = (query: any) => axios.get(`${root4}/story-extra/${query.id}`, { params: query });
// 获取文章评论(长评)
export const getLongComment = (query: any) => axios.get(`${root2}/story/${query.id}/long-comments`, { params: query });
// 获取文章评论(长评)
export const getShortComment = (query: any) => axios.get(`${root2}/story/${query.id}/short-comments`, { params: query });
