
export const edit = (vm, h, params) => {
    return h('Button',{
    	props: {
    		type: 'primary',
    		size: 'small',
    	},
    	style: {
    		margin: '0 2px',
    	},
    	on: {
    		click: () => {
    			vm.modalShow = true;
    		}
    	},
    },'编辑');
}

export const details = (vm, h, params) => {
    return h('Button',{
    	props: {
    		type: 'success',
    		size: 'small',
    	},
    	style: {
    		margin: '0 2px',
    	},
    	on: {
    		click: () => {
    			vm.modalShow = true;
    		}
    	},
    },'详情');
}
