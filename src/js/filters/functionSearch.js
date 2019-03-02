/* Filters */
// need load the moment.js to use this filter.
angular.module('app')
    .filter('functionSearch', function() {
        function menu2Search(menu,param,result) {
            angular.forEach(menu,function (data) {
                if(data.list!=undefined&&data.list.length>0){
                    menu2Search(data.list,param,result);
                }
                if(data.link!=undefined&&data.link!=""){
                        result.push({
                            name:data.name,
                            link:data.link,
                            pingyin:data.pingyin
                        })
                }
            });
        }
        return function(data,search) {
            var result = [];
            var res = [];
            menu2Search(data, search, result);
            angular.forEach(result,function (data) {
                if((data.name!=undefined&&data.name!=""&&data.name.indexOf(search)!=-1)||(data.pingyin!=undefined&&data.pingyin!=""&&data.pingyin.indexOf(search)!=-1)) {
                    res.push(data)
                }
            });
            return res;
        }
    });