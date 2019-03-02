module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['src/js/**/*.js', 'src/app/**/*.js'],
            options: {
                "asi": true,
                "globals": {
                    "$": true,    //可以使用jquery的函数
                    "app": true,
                    "window": true,
                    "angular": true,
                    "document": true
                }
            }
        },
        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            json: {
                                "TITLE": "TX快速开发平台",
                                "DESCRIPTION": "前端框架，采用了多种控件实现",
                                "KEYWORDS": "前端,html,css,js",
                                "VERSION": "1.0"
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['build/index.html'], dest: 'build/'},
                    {expand: true, flatten: true, src: ['build/js/main.js'], dest: 'build/js'}
                ]
            }
        },
        clean: {
            build: ['build'],
            release: ['release'],
            js:['release/js'],
            init:['bower_components','build','release','node_modules','package-lock.json']
        },
        copy: {
            build: {
                expand: true,
                cwd: 'src',
                src: ['**','!css/**','!libs/less/**'],
                dest: 'build/',
            },
            release: {
                expand: true,
                cwd: 'build',
                src: '**',
                dest: 'release/',
            }
        },
        concat: {
            options: {
                separator: '\n',
            },
            app: {
                src: ['build/js/config.*.js','build/js/main.js','build/js/*/*.js'],
                dest: 'release/app/app.js'
            },
            config: {
                src: ['build/js/config.js'],
                dest: 'release/app/config.js',
            }
        },
        less: {
            build: {
                files: {
                    'build/css/app.css': 'src/css/app.less'
                }
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            release: {
                src: [ 'release/app/**/*.{html,js}', 'release/libs/**/*.{js,css}','release/css/app.css']
            }
        },
        'string-replace': {
            build: {
                files: {
                    'build/index.html': 'build/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /<!-- @build (.*?) -->[\s\S]*?<!-- endBuild -->/ig,
                        replacement: function (match, p1) {
                            return p1?'<link rel="stylesheet" href="' + p1 + '" type="text/css"/>':'Faild00000001';
                        }
                    }]
                }
            },
            release: {
                files: {
                    'release/app/': 'release/app/app.*',
                    'release/index.html': 'release/index.html'
                },
                options: {
                    replacements: [{
                        pattern: /data-ng-include="'(.*?)'"/ig,
                        replacement: function (match, p1) {
                            var src = 'release/' + p1;
                            var result = src.replace(/\//g, '\\');
                            result = grunt.filerev.summary[result]
                            result = result.replace('release\\', '');
                            result = result.replace(/\\/g, '/');
                            return result?'data-ng-include="\''+result+'\'"':'Faild00000001';
                        }
                    }, {
                        pattern: /\/\/@release (.*?)\/\/[\s\S]*?\/\/endRelease/ig,
                        replacement: function (match, p1) {
                            var src = 'release/' + p1;
                            var result = src.replace(/\//g, '\\');
                            result = grunt.filerev.summary[result]
                            result = result.replace('release\\', '');
                            result = result.replace(/\\/g, '/');
                            return result?'\''+result+'\'':'Faild00000001';
                        }
                    },{
                        pattern: /<!-- @releaseCss (.*?) -->[\s\S]*?<!-- endReleaseCss -->/ig,
                        replacement: function (match, p1) {
                            var src = 'release/' + p1;
                            var result = src.replace(/\//g, '\\');
                            result = grunt.filerev.summary[result]
                            result = result.replace('release\\', '');
                            result = result.replace(/\\/g, '/');
                            return result?'<link rel="stylesheet" href="' + result + '">':'Faild00000001';
                        }
                    },{
                        pattern: /<!-- @releaseJs (.*?) -->[\s\S]*?<!-- endReleaseJs -->/ig,
                        replacement: function (match, p1) {
                            var src = 'release/' + p1;
                            var result = src.replace(/\//g, '\\');
                            result = grunt.filerev.summary[result]
                            result = result.replace('release\\', '');
                            result = result.replace(/\\/g, '/');
                            return result?'<script src="'+ result +'"></script>':'Faild00000001';
                        }
                    }]
                }
            }
        },
        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'release',
                    src: ['**/*.css'],
                    dest: 'release'
                }]
            }
        },
        uglify: {
            release: {
                options: {
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: 'release',
                    src: '**/*.js',
                    dest: 'release'
                }]
            }
        },
        htmlmin: {                                     // Task
            release: {
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'release',
                    src: '**/*.html',
                    dest: 'release'
                }]
            }
        },
        bower: {
            install: {
                options: {
                    copy: true,
                    targetDir: 'src/libs',
                    layout: 'byComponent',
                    install: false,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false
                }
            }
        }
    });

    //语法检查插件
    grunt.loadNpmTasks('grunt-contrib-jshint');
    //全局变量替换
    grunt.loadNpmTasks('grunt-replace');
    //文件复制插件
    grunt.loadNpmTasks('grunt-contrib-copy');
    //文件清理
    grunt.loadNpmTasks('grunt-contrib-clean');
    //合并文件
    grunt.loadNpmTasks('grunt-contrib-concat');
    //复制bower中包到libs
    grunt.loadNpmTasks('grunt-bower-task');
    //less转css
    grunt.loadNpmTasks('grunt-contrib-less');
    //文件md5插件，减少上传和无错同步
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //上传服务器插件
    // grunt.loadNpmTasks('grunt-scp');
    //程序建立
    grunt.registerTask('libs',['bower']);
    grunt.registerTask('init',['clean:init']);
    grunt.registerTask('build', ['clean:build', 'copy:build', 'replace:build', 'less:build', 'string-replace:build']);
    grunt.registerTask('release', ['clean:release', 'copy:release','clean:js','concat:app','concat:config','filerev:release','string-replace:release','cssmin','uglify','htmlmin']);

};