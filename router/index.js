import Vue from 'vue'
import Router from 'vue-router'
import addressmenu from '@/components/addressmenu'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'addressmenu',
			component: addressmenu
		}
	]
})
