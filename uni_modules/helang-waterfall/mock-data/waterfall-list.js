/*
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-10 16:39:34
 * @LastEditors: Why so serious my dear 854059946@qq.com
 * @LastEditTime: 2023-07-10 17:23:35
 * @FilePath: /used-idle/uni_modules/helang-waterfall/mock-data/waterfall-list.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let list = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// 生成随机数方法
			let random = (min = 3, max) => {
				return Math.floor(Math.random() * max) + min;
			}
			// 待选的图片数据
			let imgs = [];
			// 待选的标题数据
			let titles = [
				'桃花坞里桃花庵，桃花庵里桃花仙；',
				'桃花仙人种桃树，又摘桃花卖酒钱。',
				'酒醒只在花前坐，酒醉还来花下眠；半醒半醉日复日，花落花开年复年。',
				'但愿老死花酒间，不愿鞠躬车马前；',
				'车尘马足富者趣，酒盏花枝贫者缘。若将富贵比贫贱，',
				'一在平地一在天；若将贫贱比车马，他得驱驰我得闲。',
				'别人笑我太疯癫，我笑他人看不穿；不见五陵豪杰墓，无花无酒锄作田。',
				'但愿老死花酒间，不愿鞠躬车马前xsa；',
				'车尘马足富者趣，酒盏花枝贫者缘。若将富贵比贫贱，',
				'一在平地一在天；若将贫贱比车马，他得驱驰我得闲。',
				// '别人笑我太疯癫，我笑他人看不穿；不见五陵豪杰墓，无花无酒锄作田。',
				// '别人笑我太疯癫，我笑他人看不穿；不见五陵豪杰墓，无花无酒锄作田。',
				// '别人笑我太疯癫，我笑他人看不穿；不见五陵豪杰墓，无花无酒锄作田。'
			];

			let res = [];
			for (let i = 0; i < 10; i++) {
				res.push({
					id: i + 1,
					url: `/uni_modules/helang-waterfall/static/waterfall/${random(3, 10)}.png?t=${new Date().getTime()}`,
					title: titles[random(3, titles.length)],
					money: random(9, 9999),
					label: '官方自营',
					shop: '唐诗三百首旗舰店',
					path: '/subPages/my-release/detail'
				})
			}
			resolve(res);
		}, 500);
	})
}

export default {
	getList: list
}