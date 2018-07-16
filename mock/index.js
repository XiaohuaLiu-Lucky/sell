import Mock from 'mockjs'; //将mockjs给引入进来
import data from '../data.json'; //数据给引进来

Mock.mock('/good/seller', {
    code: 0,
    codeMsg: '成功',
    data: data.seller
});
Mock.mock('/good/goods', {
    code: 0,
    codeMsg: '成功',
    data: data.goods
});
Mock.mock('/good/ratings', {
    code: 0,
    codeMsg: '成功',
    data: data.ratings
})