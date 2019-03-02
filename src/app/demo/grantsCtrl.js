app.controller('grantsCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$uibModal', '$log', '$ocLazyLoad', function ($scope, $rootScope, $http, $timeout, $uibModal, $log, $ocLazyLoad) {
    // $scope.flow = function () {
    //     if ($scope.flowIns)
    //         return;
    //     var relationChart = document.getElementById('relationChart');
    //     var chart = echarts.init(relationChart);
    //     chart.showLoading();
    //     $http({
    //         method: 'GET',
    //         url: 'data/chartData.json'
    //     }).then(function successCallback(response) {
    //         chart.hideLoading();
    //         var nodes = response.data.nodes;
    //         var links = response.data.links;
    //         var option = {
    //             title: {
    //                 // text: '核动力超级项目',
    //                 // subtext: '项目实体关系图',
    //                 top: 'top',
    //                 left: 'right'
    //             },
    //             tooltip: {
    //                 trigger: 'item',
    //                 formatter: '{c}'
    //             },
    //             legend: [{
    //                 data: response.data.category,
    //                 left: "left"
    //             }],
    //             animation: false,
    //             series: [
    //                 {
    //                     name: '核动力超级项目',
    //                     type: 'graph',
    //                     layout: 'force',
    //                     edgeSymbol: ['circle', 'arrow'],
    //                     data: response.data.nodes,
    //                     links: response.data.links,
    //                     categories: response.data.category,
    //                     roam: true,
    //                     draggable: true,
    //                     label: {
    //                         normal: {
    //                             position: 'right',
    //                             show: true
    //                         }
    //                     },
    //                     lineStyle: {
    //                         normal: {
    //                             width: 2,
    //                             // color: 'source',//决定边的颜色是与起点相同还是与终点相同
    //                             curveness: 0.2//边的曲度，支持从 0 到 1 的值，值越大曲度越大。
    //                         }
    //                     },
    //                     force: {
    //                         repulsion: 350
    //                     }
    //                 }
    //             ]
    //         };
    //         chart.setOption(option);
    //         $scope.flowIns = true;
    //     }, function errorCallback(response) {
    //     });
    // }
    $scope.taskType = [
        {name: "完成-开始（FS）", value: "0"},
        {name: "开始-开始（SS）", value: "1"},
        {name: "完成-完成（FF）", value: "2"},
        {name: "开始-完成（SF）", value: "3"}
    ];

    var gantt = Gantt.getGanttInstance();
    $http({
        method: 'GET',
        url: 'data/grant.json'
    }).then(function successCallback(response) {
        gantt.config.order_branch = true;
        gantt.config.order_branch_free = true;
        gantt.config.columns = [
            {
                name: "wbs", label: "WBS", width: 60, template: function (obj) {
                    if (obj.type == gantt.config.types.milestone) {
                        return gantt.getWBSCode(obj) + ' <i class="fa fa-flag" title="里程碑"></i> ';
                    }
                    return gantt.getWBSCode(obj);
                }, resize: true
            },
            {name: "text", label: "任务名称", tree: true, width: 200, resize: true},
            {name: "start_date", label: "开始时间", align: "center", width: 90},
            {name: "end_date", label: "结束时间", align: "center", width: 90},
            {name: "duration", label: "工时", align: "center", width: 60},
            {name: "add", width: 40}
        ];
        gantt.init("ganttHere");
        gantt.parse(response.data);
        gantt.attachEvent("onTaskSelected", function (id) {
            if (!$scope.ganttSelectedId) {
                $scope.ganttSelectedId = id;
                $scope.$apply();
            } else {
                $scope.ganttSelectedId = id;
            }
        });
        gantt.attachEvent("onTaskDblClick", function (id) {
            if(id){
                $scope.task(id, "edit");
                return false;
            }else{
                return true;
            }

        });
        gantt.attachEvent("onTaskCreated", function (task) {
            $scope.task(task.parent, "new");
            return false;
        });
        $scope.grantIns = true;
    }, function errorCallback(response) {

    });
    // };

    $scope.taskUp = function () {
        var prev = gantt.getPrevSibling($scope.ganttSelectedId);
        if (prev == null) {
            return
        }
        var taskIndex = gantt.getTaskIndex($scope.ganttSelectedId);
        gantt.moveTask($scope.ganttSelectedId, taskIndex - 1, gantt.getParent($scope.ganttSelectedId));
    };
    $scope.taskDown = function () {
        var next = gantt.getNextSibling($scope.ganttSelectedId);
        if (next == null) {
            return
        }
        var taskIndex = gantt.getTaskIndex($scope.ganttSelectedId);
        gantt.moveTask($scope.ganttSelectedId, taskIndex + 1, gantt.getParent($scope.ganttSelectedId));
    };
    $scope.upgrade = function () {
        var parent = gantt.getParent($scope.ganttSelectedId);
        if (parent > 0) {
            gantt.moveTask($scope.ganttSelectedId, gantt.getTaskIndex(parent) + 1, gantt.getParent(parent));
        }
    };
    $scope.degrade = function () {
        var prev = gantt.getPrevSibling($scope.ganttSelectedId);
        if (prev == null) {
            return
        }
        gantt.moveTask($scope.ganttSelectedId, gantt.getChildren(prev).length, prev);
        gantt.open(prev);
    };
    $scope.milestone = function () {
        var task = gantt.getTask($scope.ganttSelectedId);
        if (task.type == gantt.config.types.milestone) {
            task.type = undefined;
        } else {
            task.type = gantt.config.types.milestone;
            task.duration = 0;
            task.end_date = task.start_date;
        }
        gantt.updateTask($scope.ganttSelectedId);
    };
    $scope.undo = function () {
        gantt.undo();
    };
    $scope.redo = function () {
        gantt.redo()
    };

    $scope.$on('resize', function (event, height, width) {
        $timeout(function () {
            gantt.render();
        })
    });
    var parent = $scope;

    $scope.task = function (taskId, type) {
        var modalInstance = $uibModal.open({
            animation: true,
            appendTo: $(".app-content-body"),
            templateUrl: 'task.html',
            size: 'lg',
            controller: function ($scope) {
                $ocLazyLoad.load("select").then(function () {
                    $scope.loaded = true;
                    $scope.taskType = parent.taskType;
                    $scope.task = {};
                    var oneDay = 1000 * 60 * 60 * 24;
                    $scope.$watch('task.type', function (newVal) {
                        if(newVal){
                            $scope.task.endTime = undefined;
                            $scope.task.duration = undefined;
                        }
                    });
                    $scope.startTimeChange = function(){
                        if(!$scope.task.type){
                            if(!$scope.task.endTime){
                                $scope.task.endTime = new Date();
                                $scope.task.endTime.setTime($scope.task.startTime.getTime()+oneDay);
                                $scope.task.duration = 1;
                            }else{
                                var days = parseInt(($scope.task.endTime.getTime() - $scope.task.startTime.getTime())/ oneDay);
                                if(days>0){
                                    $scope.task.duration = days
                                }else{
                                    $scope.task.endTime = new Date();
                                    $scope.task.endTime.setTime($scope.task.startTime.getTime()+oneDay);
                                    $scope.task.duration = 1;
                                }
                            }
                        }
                    };
                    $scope.endTimeChange = function(){
                        if(!$scope.task.startTime){
                            $scope.task.startTime = new Date();
                            $scope.task.startTime.setTime($scope.task.endTime.getTime()-oneDay);
                            $scope.task.duration = 1;
                        }else{
                            var days = parseInt(($scope.task.endTime.getTime() - $scope.task.startTime.getTime())/ oneDay);
                            if(days>0){
                                $scope.task.duration = days
                            }else{
                                $scope.task.startTime = new Date();
                                $scope.task.startTime.setTime($scope.task.endTime.getTime()-oneDay);
                                $scope.task.duration = 1;
                            }
                        }
                    };
                    $scope.$watch('task.duration', function (newVal) {
                        if(newVal!=undefined){
                            if(newVal<=0){
                                $scope.task.duration = 1;
                                return
                            }
                            $scope.task.endTime = new Date();
                            $scope.task.endTime.setTime($scope.task.startTime.getTime()+newVal*oneDay);
                        }
                    });
                    if(type=="edit"){
                        var task = gantt.getTask(taskId);
                        $scope.task.name = task.text;
                        $scope.task.type = task.type?true:false;
                        $scope.task.startTime = task.start_date;
                        $scope.task.endTime = task.end_date;
                        $scope.task.duration = task.duration;
                        $scope.ok = function () {
                            task.text = $scope.task.name;
                            task.type = $scope.task.type?gantt.config.types.milestone:undefined;
                            task.start_date = $scope.task.startTime;
                            task.end_date = $scope.task.endTime;
                            task.duration = $scope.task.duration ;
                            gantt.updateTask(taskId);
                            gantt.render();
                            $scope.$close('close');
                        }
                    }else{
                        $scope.ok = function () {
                            var task = {};
                            task.text = $scope.task.name;
                            task.type = $scope.task.type?gantt.config.types.milestone:undefined;
                            task.start_date = $scope.task.startTime;
                            task.end_date = $scope.task.endTime;
                            task.duration = $scope.task.duration ;
                            gantt.addTask(task,taskId);
                            gantt.render();
                            $scope.$close('close');
                        }
                    }

                });
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function (reaseon) {
        });
    };

    $scope.network = function () {
        var tasksSib = gantt.getSiblings($scope.ganttSelectedId);
        var tasks = {};
        angular.forEach(tasksSib, function (item) {
            tasks[item] = gantt.getTask(item);
        });

        var links = gantt.getLinks();
        var modalInstance = $uibModal.open({
            animation: true,
            appendTo: $(".app-content-body"),
            size: 'lg',
            templateUrl: 'network.html',
            controller: function ($scope) {
                $ocLazyLoad.load("gojs").then(function () {
                    angular.element(document).ready(function () {
                        var $ = go.GraphObject.make;
                        var myDiagram =
                            $(go.Diagram, "myDiagramDiv",
                                {
                                    initialContentAlignment: go.Spot.Center, // 居中显示内容
                                    "undoManager.isEnabled": true, // 打开 Ctrl-Z 和 Ctrl-Y 撤销重做功能
                                    layout: $(go.TreeLayout, // 1个特殊的树形排列 Diagram.layout布局
                                        {angle: 0, layerSpacing: 35})
                                });
                        myDiagram.nodeTemplate =
                            $(go.Node, "Horizontal",
                                {background: parent.app.color.primary},
                                $(go.TextBlock, "Default Text",
                                    {margin: 8, stroke: "white", font: "bold 14px sans-serif"},
                                    new go.Binding("text", "name"))
                            );

                        var model = $(go.GraphLinksModel);
                        var nodes = [];
                        angular.forEach(tasks, function (item) {
                            nodes.push({
                                key: item.id + "",
                                name: item.text + "\n" + parent.app.formatDate(item.start_date) + " 至 " + parent.app.formatDate(item.end_date)
                            })
                        });
                        model.nodeDataArray = nodes;
                        var link = [];
                        angular.forEach(links, function (item) {
                            link.push({
                                from: item.source + "",
                                to: item.target + ""
                            })
                        });
                        model.linkDataArray = link;
                        myDiagram.model = model;
                    });
                });
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function (reaseon) {
        });
    };

    $scope.taskRelation = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            appendTo: $(".app-content-body"),
            templateUrl: 'preTask.html',
            controller: function ($scope) {
                $ocLazyLoad.load("select").then(function () {
                    $scope.taskType = parent.taskType;
                    var task = gantt.getTask(parent.ganttSelectedId);
                    var links = gantt.getLinks();
                    $scope.taskLinks = [];
                    angular.forEach(links, function (item) {
                        if (item.target == parent.ganttSelectedId) {
                            var task = gantt.getTask(item.source);
                            $scope.taskLinks.push({
                                taskId: task.id,
                                name: task.text,
                                id: item.id,
                                code: task.$wbs,
                                type: item.type + ""
                            })
                        }
                    });
                    $scope.tasks = [];
                    gantt.eachTask(function (task) {
                        if (parent.ganttSelectedId == task.id) {
                            return
                        }
                        $scope.tasks.push({
                            name: task.text,
                            id: task.id,
                            code: task.$wbs,
                            text: task.$wbs + ' ' + task.text
                        })
                    });
                    $scope.title = task.text;
                    $scope.searchSelectedOn = function ($item) {
                        $scope.selected = "";
                        for (var i = 0; i < $scope.taskLinks.length; i++) {
                            if ($scope.taskLinks[i].taskId == $item.id) {
                                return;
                            }
                        }
                        $scope.taskLinks.push({
                            taskId: $item.id,
                            name: $item.name,
                            code: $item.code,
                            type: gantt.config.links.finish_to_start
                        });
                    };
                    $scope.deleteLinks = [];
                    $scope.deleteLink = function (index) {
                        if ($scope.taskLinks[index].id) {
                            $scope.deleteLinks.push($scope.taskLinks[index].id);
                        }
                        $scope.taskLinks.splice(index, 1);
                    };
                    $scope.ok = function () {
                        angular.forEach($scope.taskLinks, function (item) {
                            if (!item.id) {
                                gantt.addLink({
                                    source: item.taskId,
                                    target: parent.ganttSelectedId,
                                    type: item.type
                                });
                            } else {
                                gantt.getLink(item.id).type = item.type;
                            }
                        });
                        angular.forEach($scope.deleteLinks, function (item) {
                            gantt.deleteLink(item);
                        });
                        $scope.$close("ok");
                        gantt.render();
                    }
                });
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function (reaseon) {
        });
    }

}]);