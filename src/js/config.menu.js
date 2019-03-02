//apis
angular.module('app')
    .constant('menuAPI', [
        {
            name: "系统设置",
            icon: "fa fa-cogs",
            link: "",
            authority: "admin",
            list: [
                {
                    name: "系统属性",
                    link: ""
                },
                {
                    name: "用户",
                    link: ""
                },
                {
                    name: "角色",
                    link: ""
                },
                {
                    name: "权限",
                    link: ""
                },
                {
                    name: "单点登录",
                    link: "",
                    list: [
                        {
                            name: "第三方接入",
                            link: "",
                            pingyin: "disanfangjieru"
                        },
                        {
                            name: "接入教程",
                            link: "",
                            pingyin: "shuru"
                        }
                    ]
                },
                {
                    name: "流程",
                    link: "",
                    list: [
                        {
                            name: "流程配置",
                            link: "",
                            pingyin: "disanfangjieru"
                        },
                        {
                            name: "流程审计",
                            link: "",
                            pingyin: "shuru"
                        }
                    ]
                }
            ]
        },
        {
            name: "开发参考",
            icon: "fa fa-eye",
            list: [
                {
                    name: "开发文档",
                    link: "app.devDocument"
                },
                {
                    name: "参考",
                    list: [
                        {
                            name: "信息页",
                            link: "app.common.input",
                            pingyin: "shuru"
                        },
                        {
                            name: "翻页表格",
                            link: "app.common.datatable",
                            pingyin: "fanyebiaoge"
                        },
                        {
                            name: "下滑表格",
                            link: "app.common.datatable1",
                            pingyin: "xiahuabiaoge"
                        },
                        {
                            name: "提醒",
                            link: "app.common.toaster",
                            pingyin: "tixing"
                        },
                        {
                            name: "树",
                            link: "app.common.tree",
                            pingyin: "shu"
                        },
                        {
                            name: "文件上传",
                            link: "app.common.fileupload",
                            pingyin: "wenjianshangchuan"
                        },
                        {
                            name: "图片",
                            link: "app.common.image",
                            pingyin: "tupian"
                        },
                        {
                            name: "图片上传",
                            link: "app.common.imagecrop",
                            pingyin: "tupianshangchuan"
                        },
                        {
                            name: "拖拽",
                            link: "app.common.sortable",
                            pingyin: "tuozhuai"
                        },
                        {
                            name: "组件",
                            link: "app.common.component",
                            pingyin: "zujian"
                        }
                    ]
                },
                {
                    name: "样式",
                    authority: "",
                    link: "",
                    list: [
                        {
                            name: "布局",
                            link: "app.common.grid",
                            pingyin: "buju"
                        },
                        {
                            name: "按钮",
                            link: "app.common.button",
                            pingyin: "anniu"
                        },
                        {
                            name: "图标",
                            link: "app.common.icons",
                            pingyin: "tubiao"
                        },
                        {
                            name: "颜色",
                            link: "app.common.color",
                            pingyin: "yanse"
                        }
                    ]
                }
            ]
        },
        {
            name: "DEMO",
            icon: "glyphicon glyphicon-th-list",
            link: "",
            list: [
                {
                    name: "甘特图",
                    pingyin: "gants",
                    authority: "",
                    link: "app.demo.grants"
                },
                {
                    name: "onlyOffice",
                    pingyin: "onlyOffice",
                    authority: "",
                    link: "app.demo.onlyOffice"
                },
                {
                    name: "日历",
                    pingyin: "rili",
                    authority: "",
                    link: "app.demo.calendar"
                },
                {
                    name: "web软件控制",
                    authority: "",
                    link: ""
                }
            ]
        },
        {
            name: "数据中心",
            icon: "fa fa-database",
            link: "app.dataCenter",
            authority: "dataManger"
        }
    ]);