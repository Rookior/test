;(function(){
    var searchInput = document.getElementsByClassName('J_searchInput')[0];
    var wdList = document.getElementsByClassName('J_wdList')[0];
    var listTpl = document.getElementById('J_listTpl').innerHTML;

    function init(){
        bindEvent();
    }

    function bindEvent(){
        searchInput.addEventListener('input',typeInput,false);
    }

    function typeInput(){
        var val = _trimSpace(this.value);
        if(val.length>0){
            getDatas(val,'setDatas');
        }
    }

    function _trimSpace(str){
        return str.replace(/\s+/,'');
    }

    // jsonp实现数据请求
    // https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=33425,33401,31254,33286,33414,33265,33370&wd=1234567&req=2&bs=1&pbs=1&csor=7&pwd=123456&cb=jQuery1102035888975450417493_1610436851487&_=1610436851498
    function getDatas(val,cb){
        var oScript = document.createElement('script');
        oScript.src = 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=33425,33401,31254,33286,33414,33265,33370&wd='+ val +'&req=2&bs=1&pbs=1&csor=7&pwd=123456&cb=' + cb;
        document.body.appendChild(oScript);
    }

    function renderList(data){
        var data = data.g,len='',
        list = '';
        try{
            len = data.length;
        }catch(e){
            len = 0;
        }
        if(len>0){
            data.forEach(item => {
                list += listTpl.replace(/{{(.*?)}}/gim,function(node,key){
                    return {
                        wd:item.q,
                        wdLink: item.q
                    }[key]
                });
            });
            wdList.innerHTML = list;
        }else{
            wdList.innerHTML = '';
        }
    }

    window.setDatas = function(data){
        // console.log(data);
        renderList(data);
    }

    init();

})();