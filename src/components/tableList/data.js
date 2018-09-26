
export const tableColumns = [
	{
        type: 'selection',
        width: 60,
        align: 'center'
    },
	{
        title: 'ID',
        key: 'id'
    },
    {
        title: '名称',
        key: 'name'
    },
    {
        title: '日期',
        key: 'date'
    },
    {
    	align: 'center',
    	width: 130,
        title: '操作',
        handle: ['edit','details'],
    }
];
	
export const tableData = [
	{
		id: 1,
        name: 'John Brown',
        date: '2016-10-03'
    },
    {
    	id: 2,
        name: 'Jim Green',
        date: '2016-10-01'
    },
    {
    	id: 3,
        name: 'Joe Black',
        date: '2016-10-02'
    },
    {
    	id: 4,
        name: 'Jon Snow',
        date: '2016-10-04'
    },
    {
    	id: 5,
        name: 'Jon Snow',
        date: '2016-10-04'
    },
];