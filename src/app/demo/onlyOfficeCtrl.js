'use strict';
app.controller('onlyOfficeCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {
    var innerAlert = function (message) {
        if (console && console.log)
            console.log(message);
    };

    var onReady = function () {
        innerAlert("Document editor ready");
    };

    var onDocumentStateChange = function (event) {
        var title = document.title.replace(/\*$/g, "");
        window.document.title = title + (event.data ? "*" : "");
    };

    var onRequestEditRights = function () {
        window.location.href = location.href.replace(RegExp("mode=view\&?", "i"), "");
    };

    var onError = function (event) {
        if (event)
            innerAlert(event.data);
    };

    var onOutdatedVersion = function (event) {
        window.location.reload(true);
    };
    var init = {
        type:"desktop",
        documentType:"text",
        document:{
            title:"单点登录sso方案",
            url:encodeURI("http://192.168.77.106:8080/onlyOffice/getFile/精神文明建设工作示范点创建标准.docx"),
            fileType:"docx",
            info: {
                author: "陆允基",
                created: "2018-10-01",
                folder: "Example Files"
            }
        },
        editorConfig:{
            callbackUrl:encodeURI("http://192.168.77.106:8080/onlyOffice/saveFile/精神文明建设工作示范点创建标准.docx"),
            lang:"zh-CN",
            customization:{
                logo:{
                    image:"",
                    imageEmbedded:"",
                    url:""
                }
            }
        },
        events:{
            onReady:onReady,
            onDocumentStateChange:onDocumentStateChange,
            onRequestEditRights:onRequestEditRights,
            onError:onError,
            onOutdatedVersion:onOutdatedVersion
        }
    }
    var iframeEditor = DocsAPI.DocEditor("iframeEditor", init);
    if (window.addEventListener) {
        window.addEventListener("load", iframeEditor);
    } else if (window.attachEvent) {
        window.attachEvent("load", iframeEditor);
    }
    
    $scope.sendMessage = function () {
        // console.log(document.frames['frameEditor']);
        console.log($("iframe[name='frameEditor']")[0].contentWindow.document.getElementById("header"));
        // $("#in").trigger({ type: 'keypress', which: 'x'.charCodeAt(0) });
    }

    // $scope.doing_async = true;

    $scope.treeData = [
        {
            label: '项目详细',
            children: [
                {
                    label: '项目名称',
                    data: {
                        description: "${name}"
                    }
                }, {
                    label: '项目负责人',
                    data: {
                        description: "${man}"
                    }
                }, {
                    label: '项目周期',
                    data: {
                        description: "${data}"
                    }
                }, {
                    label: '项目人员',
                    children: [{
                        label:'总工',
                        data: {
                            description: "${engineer}"
                        }
                    }, '设计师', '组长']
                }
            ]
        }
    ];

    $scope.treeHandler = function(branch) {
        var _ref;
        if ((_ref = branch.data) != null ? _ref.description : void 0) {
            $scope.output = "已经复制: " + branch.label;
        }
        document.getElementById('copy').value = _ref.description;
        document.getElementById('copy').select();
        document.execCommand("copy");
        var word  = $("iframe[name='frameEditor']");
        word.focus();
        // var w =word[0].contentWindow.document;
        // debugger
        // document.execCommand("paste");
        return;
    };

    $scope.tree = {}

    var apple_selected = function(branch) {
        $scope.output = "APPLE! : " + branch.label;
        return;
    };

}]);