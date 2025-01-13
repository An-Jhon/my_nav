"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ HomePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/navigation */ \"(app-pages-browser)/./src/utils/navigation.ts\");\n/* harmony import */ var _utils_favicon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/favicon */ \"(app-pages-browser)/./src/utils/favicon.ts\");\n/* harmony import */ var _components_DefaultIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/DefaultIcon */ \"(app-pages-browser)/./src/components/DefaultIcon.tsx\");\n/* harmony import */ var _components_ResizeHandle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ResizeHandle */ \"(app-pages-browser)/./src/components/ResizeHandle.tsx\");\n/* harmony import */ var _components_FavoriteButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/FavoriteButton */ \"(app-pages-browser)/./src/components/FavoriteButton.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction HomePage() {\n    _s();\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        categories: [],\n        links: []\n    });\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [currentCategory, setCurrentCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [sidebarWidth, setSidebarWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(200);\n    const [favorites, setFavorites] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new Set());\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const savedFavorites = localStorage.getItem(\"favorites\");\n        if (savedFavorites) {\n            setFavorites(new Set(JSON.parse(savedFavorites)));\n        }\n        (0,_utils_navigation__WEBPACK_IMPORTED_MODULE_2__.getNavigationData)().then((data)=>{\n            setData(data);\n            if (data.categories.length > 0) {\n                setCurrentCategory(data.categories[0].id);\n            }\n        }).finally(()=>setLoading(false));\n    }, []);\n    const handleToggleFavorite = (id)=>{\n        const newFavorites = new Set(favorites);\n        if (newFavorites.has(id)) {\n            newFavorites.delete(id);\n        } else {\n            newFavorites.add(id);\n        }\n        setFavorites(newFavorites);\n        localStorage.setItem(\"favorites\", JSON.stringify(Array.from(newFavorites)));\n    };\n    const allCategories = [\n        {\n            id: \"favorites\",\n            name: \"我的收藏\",\n            description: \"收藏的常用网站\"\n        },\n        ...data.categories\n    ];\n    const currentLinks = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{\n        const filteredLinks = currentCategory === \"favorites\" ? data.links.filter((link)=>favorites.has(link.id)) : data.links.filter((link)=>link.category === currentCategory);\n        // 返回带有收藏状态的链接\n        return filteredLinks;\n    }, [\n        currentCategory,\n        data.links,\n        favorites\n    ]);\n    // 加载数据\n    const loadData = async ()=>{\n        try {\n            const response = await fetch(\"/api/categories\");\n            const newData = await response.json();\n            setData(newData);\n        } catch (error) {\n            console.error(\"Error loading data:\", error);\n        } finally{\n            setLoading(false);\n        }\n    };\n    // 初始加载和定期刷新\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        loadData();\n        // 每 5 秒刷新一次数据\n        const interval = setInterval(loadData, 5000);\n        return ()=>clearInterval(interval);\n    }, []);\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex items-center justify-center min-h-screen\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-gray-600\",\n                children: \"加载中...\"\n            }, void 0, false, {\n                fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                lineNumber: 86,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n            lineNumber: 85,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex min-h-screen\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"aside\", {\n                style: {\n                    width: sidebarWidth\n                },\n                className: \"flex-shrink-0 bg-white border-r border-gray-200\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                    className: \"sticky top-0 p-3\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"text-xl font-bold text-gray-800 mb-4 px-2\",\n                            children: \"导航分类\"\n                        }, void 0, false, {\n                            fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                            lineNumber: 95,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                            className: \"space-y-1\",\n                            children: allCategories.map((category)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        onClick: ()=>setCurrentCategory(category.id),\n                                        className: \"\\n                    w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors\\n                    \".concat(category.id === \"favorites\" ? \"font-medium text-orange-600\" : \"\", \"\\n                    \").concat(currentCategory === category.id ? \"bg-blue-50 text-blue-600 font-medium\" : category.id === \"favorites\" ? \"hover:bg-orange-50\" : \"text-gray-600 hover:bg-gray-50\", \"\\n                  \"),\n                                        children: category.name\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                        lineNumber: 101,\n                                        columnNumber: 17\n                                    }, this)\n                                }, category.id, false, {\n                                    fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                    lineNumber: 100,\n                                    columnNumber: 15\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                            lineNumber: 98,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                    lineNumber: 94,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                lineNumber: 93,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ResizeHandle__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                onResize: setSidebarWidth\n            }, void 0, false, {\n                fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                lineNumber: 123,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-1 bg-gray-50\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"max-w-[1800px] mx-auto\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 p-4\",\n                        children: currentLinks.map((link)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                href: link.url,\n                                target: \"_blank\",\n                                rel: \"noopener noreferrer\",\n                                className: \"group block bg-white p-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 relative h-[72px]\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_FavoriteButton__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                        id: link.id,\n                                        isFavorite: favorites.has(link.id),\n                                        onToggle: handleToggleFavorite\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                        lineNumber: 136,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex items-start space-x-2\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"w-5 h-5 flex-shrink-0 flex items-center justify-center\",\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                                                        src: (0,_utils_favicon__WEBPACK_IMPORTED_MODULE_3__.getFaviconUrl)(link.url),\n                                                        alt: \"\".concat(link.title, \" icon\"),\n                                                        width: 20,\n                                                        height: 20,\n                                                        className: \"rounded group-hover:scale-110 transition-transform duration-200 bg-gray-50\",\n                                                        onError: (e)=>{\n                                                            var _target_parentElement_querySelector, _target_parentElement;\n                                                            const target = e.target;\n                                                            target.style.display = \"none\";\n                                                            (_target_parentElement = target.parentElement) === null || _target_parentElement === void 0 ? void 0 : (_target_parentElement_querySelector = _target_parentElement.querySelector(\".default-icon\")) === null || _target_parentElement_querySelector === void 0 ? void 0 : _target_parentElement_querySelector.classList.remove(\"hidden\");\n                                                        }\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                                        lineNumber: 144,\n                                                        columnNumber: 21\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                        className: \"default-icon hidden\",\n                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_DefaultIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                                                            fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                                            lineNumber: 157,\n                                                            columnNumber: 23\n                                                        }, this)\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                                        lineNumber: 156,\n                                                        columnNumber: 21\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                                lineNumber: 143,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"min-w-0 flex-1 pr-6\",\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                        className: \"font-medium text-sm text-gray-800 truncate mb-0.5 group-hover:text-blue-600\",\n                                                        children: link.title\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                                        lineNumber: 162,\n                                                        columnNumber: 21\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                        className: \"text-xs text-gray-500 truncate group-hover:text-gray-600\",\n                                                        children: link.description || \"暂无描述\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                                        lineNumber: 165,\n                                                        columnNumber: 21\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                                lineNumber: 161,\n                                                columnNumber: 19\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                        lineNumber: 142,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, link.id, true, {\n                                fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                                lineNumber: 129,\n                                columnNumber: 15\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                        lineNumber: 127,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                    lineNumber: 126,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n                lineNumber: 125,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ayd/Desktop/Github_Repositorys/MyOwn/my_nav/src/app/page.tsx\",\n        lineNumber: 92,\n        columnNumber: 5\n    }, this);\n}\n_s(HomePage, \"dvxodgWVpbYWlM3kviQGTMgJ9HM=\");\n_c = HomePage;\nvar _c;\n$RefreshReg$(_c, \"HomePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUtvQyxLQUFLLEVBQUM7d0RBQ25CcEIsT0FBTzt3REFDUHFCLFFBQVE7d0RBQ1J4QixXQUFVO3dEQUNWeUIsU0FBUyxDQUFDQztnRUFHUlYscUNBQUFBOzREQUZBLE1BQU1BLFNBQVNVLEVBQUVWLE1BQU07NERBQ3ZCQSxPQUFPZCxLQUFLLENBQUN5QixPQUFPLEdBQUc7NkRBQ3ZCWCx3QkFBQUEsT0FBT1ksYUFBYSxjQUFwQlosNkNBQUFBLHNDQUFBQSxzQkFBc0JhLGFBQWEsQ0FBQyw4QkFBcENiLDBEQUFBQSxvQ0FBc0RjLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDO3dEQUN6RTs7Ozs7O2tFQUVGLDhEQUFDaEM7d0RBQUlDLFdBQVU7a0VBQ2IsNEVBQUN0RCwrREFBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7MERBSWhCLDhEQUFDcUQ7Z0RBQUlDLFdBQVU7O2tFQUNiLDhEQUFDZ0M7d0RBQUdoQyxXQUFVO2tFQUNYYixLQUFLb0MsS0FBSzs7Ozs7O2tFQUViLDhEQUFDVTt3REFBRWpDLFdBQVU7a0VBQ1ZiLEtBQUtKLFdBQVcsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFwQ3RCSSxLQUFLakIsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQzVCO0dBdkt3QnJCO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvcGFnZS50c3g/ZjY4YSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGdldE5hdmlnYXRpb25EYXRhLCBncm91cExpbmtzQnlDYXRlZ29yeSB9IGZyb20gJ0AvdXRpbHMvbmF2aWdhdGlvbidcbmltcG9ydCB7IGdldEZhdmljb25VcmwgfSBmcm9tICdAL3V0aWxzL2Zhdmljb24nXG5pbXBvcnQgRGVmYXVsdEljb24gZnJvbSAnQC9jb21wb25lbnRzL0RlZmF1bHRJY29uJ1xuaW1wb3J0IFJlc2l6ZUhhbmRsZSBmcm9tICdAL2NvbXBvbmVudHMvUmVzaXplSGFuZGxlJ1xuaW1wb3J0IEZhdm9yaXRlQnV0dG9uIGZyb20gJ0AvY29tcG9uZW50cy9GYXZvcml0ZUJ1dHRvbidcbmltcG9ydCB0eXBlIHsgTmF2RGF0YSwgTmF2TGluayB9IGZyb20gJ0AvdHlwZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWVQYWdlKCkge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZTxOYXZEYXRhPih7IGNhdGVnb3JpZXM6IFtdLCBsaW5rczogW10gfSlcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSlcbiAgY29uc3QgW2N1cnJlbnRDYXRlZ29yeSwgc2V0Q3VycmVudENhdGVnb3J5XSA9IHVzZVN0YXRlPHN0cmluZz4oJycpXG4gIGNvbnN0IFtzaWRlYmFyV2lkdGgsIHNldFNpZGViYXJXaWR0aF0gPSB1c2VTdGF0ZSgyMDApXG4gIGNvbnN0IFtmYXZvcml0ZXMsIHNldEZhdm9yaXRlc10gPSB1c2VTdGF0ZTxTZXQ8c3RyaW5nPj4obmV3IFNldCgpKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWRGYXZvcml0ZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3JpdGVzJylcbiAgICBpZiAoc2F2ZWRGYXZvcml0ZXMpIHtcbiAgICAgIHNldEZhdm9yaXRlcyhuZXcgU2V0KEpTT04ucGFyc2Uoc2F2ZWRGYXZvcml0ZXMpKSlcbiAgICB9XG5cbiAgICBnZXROYXZpZ2F0aW9uRGF0YSgpXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgc2V0RGF0YShkYXRhKVxuICAgICAgICBpZiAoZGF0YS5jYXRlZ29yaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzZXRDdXJyZW50Q2F0ZWdvcnkoZGF0YS5jYXRlZ29yaWVzWzBdLmlkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4gc2V0TG9hZGluZyhmYWxzZSkpXG4gIH0sIFtdKVxuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZUZhdm9yaXRlID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBuZXdGYXZvcml0ZXMgPSBuZXcgU2V0KGZhdm9yaXRlcylcbiAgICBpZiAobmV3RmF2b3JpdGVzLmhhcyhpZCkpIHtcbiAgICAgIG5ld0Zhdm9yaXRlcy5kZWxldGUoaWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0Zhdm9yaXRlcy5hZGQoaWQpXG4gICAgfVxuICAgIHNldEZhdm9yaXRlcyhuZXdGYXZvcml0ZXMpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlcycsIEpTT04uc3RyaW5naWZ5KEFycmF5LmZyb20obmV3RmF2b3JpdGVzKSkpXG4gIH1cblxuICBjb25zdCBhbGxDYXRlZ29yaWVzID0gW1xuICAgIHtcbiAgICAgIGlkOiAnZmF2b3JpdGVzJyxcbiAgICAgIG5hbWU6ICfmiJHnmoTmlLbol48nLFxuICAgICAgZGVzY3JpcHRpb246ICfmlLbol4/nmoTluLjnlKjnvZHnq5knXG4gICAgfSxcbiAgICAuLi5kYXRhLmNhdGVnb3JpZXNcbiAgXVxuXG4gIGNvbnN0IGN1cnJlbnRMaW5rcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGZpbHRlcmVkTGlua3MgPSBjdXJyZW50Q2F0ZWdvcnkgPT09ICdmYXZvcml0ZXMnXG4gICAgICA/IGRhdGEubGlua3MuZmlsdGVyKGxpbmsgPT4gZmF2b3JpdGVzLmhhcyhsaW5rLmlkKSlcbiAgICAgIDogZGF0YS5saW5rcy5maWx0ZXIobGluayA9PiBsaW5rLmNhdGVnb3J5ID09PSBjdXJyZW50Q2F0ZWdvcnkpXG4gICAgXG4gICAgLy8g6L+U5Zue5bim5pyJ5pS26JeP54q25oCB55qE6ZO+5o6lXG4gICAgcmV0dXJuIGZpbHRlcmVkTGlua3NcbiAgfSwgW2N1cnJlbnRDYXRlZ29yeSwgZGF0YS5saW5rcywgZmF2b3JpdGVzXSlcblxuICAvLyDliqDovb3mlbDmja5cbiAgY29uc3QgbG9hZERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvY2F0ZWdvcmllcycpXG4gICAgICBjb25zdCBuZXdEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBzZXREYXRhKG5ld0RhdGEpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGxvYWRpbmcgZGF0YTonLCBlcnJvcilcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSlcbiAgICB9XG4gIH1cblxuICAvLyDliJ3lp4vliqDovb3lkozlrprmnJ/liLfmlrBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkRGF0YSgpXG4gICAgLy8g5q+PIDUg56eS5Yi35paw5LiA5qyh5pWw5o2uXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChsb2FkRGF0YSwgNTAwMClcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbClcbiAgfSwgW10pXG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtaW4taC1zY3JlZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNjAwXCI+5Yqg6L295LitLi4uPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBtaW4taC1zY3JlZW5cIj5cbiAgICAgIDxhc2lkZSBzdHlsZT17eyB3aWR0aDogc2lkZWJhcldpZHRoIH19IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgYmctd2hpdGUgYm9yZGVyLXIgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgIDxuYXYgY2xhc3NOYW1lPVwic3RpY2t5IHRvcC0wIHAtM1wiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LWdyYXktODAwIG1iLTQgcHgtMlwiPlxuICAgICAgICAgICAg5a+86Iiq5YiG57G7XG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICB7YWxsQ2F0ZWdvcmllcy5tYXAoY2F0ZWdvcnkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtjYXRlZ29yeS5pZH0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q3VycmVudENhdGVnb3J5KGNhdGVnb3J5LmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YFxuICAgICAgICAgICAgICAgICAgICB3LWZ1bGwgdGV4dC1sZWZ0IHB4LTIgcHktMS41IHJvdW5kZWQtbWQgdGV4dC1zbSB0cmFuc2l0aW9uLWNvbG9yc1xuICAgICAgICAgICAgICAgICAgICAke2NhdGVnb3J5LmlkID09PSAnZmF2b3JpdGVzJyA/ICdmb250LW1lZGl1bSB0ZXh0LW9yYW5nZS02MDAnIDogJyd9XG4gICAgICAgICAgICAgICAgICAgICR7XG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVudENhdGVnb3J5ID09PSBjYXRlZ29yeS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYmx1ZS01MCB0ZXh0LWJsdWUtNjAwIGZvbnQtbWVkaXVtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBjYXRlZ29yeS5pZCA9PT0gJ2Zhdm9yaXRlcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnaG92ZXI6Ymctb3JhbmdlLTUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LWdyYXktNjAwIGhvdmVyOmJnLWdyYXktNTAnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2NhdGVnb3J5Lm5hbWV9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvYXNpZGU+XG5cbiAgICAgIDxSZXNpemVIYW5kbGUgb25SZXNpemU9e3NldFNpZGViYXJXaWR0aH0gLz5cblxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC0xIGJnLWdyYXktNTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy1bMTgwMHB4XSBteC1hdXRvXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIHhsOmdyaWQtY29scy00IDJ4bDpncmlkLWNvbHMtNSBnYXAtMyBwLTRcIj5cbiAgICAgICAgICAgIHtjdXJyZW50TGlua3MubWFwKGxpbmsgPT4gKFxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGtleT17bGluay5pZH1cbiAgICAgICAgICAgICAgICBocmVmPXtsaW5rLnVybH1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIGJsb2NrIGJnLXdoaXRlIHAtMi41IHJvdW5kZWQtbGcgc2hhZG93LXNtIGhvdmVyOnNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgcmVsYXRpdmUgaC1bNzJweF1cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEZhdm9yaXRlQnV0dG9uXG4gICAgICAgICAgICAgICAgICBpZD17bGluay5pZH1cbiAgICAgICAgICAgICAgICAgIGlzRmF2b3JpdGU9e2Zhdm9yaXRlcy5oYXMobGluay5pZCl9XG4gICAgICAgICAgICAgICAgICBvblRvZ2dsZT17aGFuZGxlVG9nZ2xlRmF2b3JpdGV9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy01IGgtNSBmbGV4LXNocmluay0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9e2dldEZhdmljb25VcmwobGluay51cmwpfVxuICAgICAgICAgICAgICAgICAgICAgIGFsdD17YCR7bGluay50aXRsZX0gaWNvbmB9XG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg9ezIwfVxuICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17MjB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMjAwIGJnLWdyYXktNTBcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudD8ucXVlcnlTZWxlY3RvcignLmRlZmF1bHQtaWNvbicpPy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlZmF1bHQtaWNvbiBoaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8RGVmYXVsdEljb24gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMSBwci02XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LXNtIHRleHQtZ3JheS04MDAgdHJ1bmNhdGUgbWItMC41IGdyb3VwLWhvdmVyOnRleHQtYmx1ZS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bGluay50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNTAwIHRydW5jYXRlIGdyb3VwLWhvdmVyOnRleHQtZ3JheS02MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bGluay5kZXNjcmlwdGlvbiB8fCAn5pqC5peg5o+P6L+wJ31cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWFpbj5cbiAgICA8L2Rpdj5cbiAgKVxufSAiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VNZW1vIiwiZ2V0TmF2aWdhdGlvbkRhdGEiLCJnZXRGYXZpY29uVXJsIiwiRGVmYXVsdEljb24iLCJSZXNpemVIYW5kbGUiLCJGYXZvcml0ZUJ1dHRvbiIsIkhvbWVQYWdlIiwiZGF0YSIsInNldERhdGEiLCJjYXRlZ29yaWVzIiwibGlua3MiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImN1cnJlbnRDYXRlZ29yeSIsInNldEN1cnJlbnRDYXRlZ29yeSIsInNpZGViYXJXaWR0aCIsInNldFNpZGViYXJXaWR0aCIsImZhdm9yaXRlcyIsInNldEZhdm9yaXRlcyIsIlNldCIsInNhdmVkRmF2b3JpdGVzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsIkpTT04iLCJwYXJzZSIsInRoZW4iLCJsZW5ndGgiLCJpZCIsImZpbmFsbHkiLCJoYW5kbGVUb2dnbGVGYXZvcml0ZSIsIm5ld0Zhdm9yaXRlcyIsImhhcyIsImRlbGV0ZSIsImFkZCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJBcnJheSIsImZyb20iLCJhbGxDYXRlZ29yaWVzIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiY3VycmVudExpbmtzIiwiZmlsdGVyZWRMaW5rcyIsImZpbHRlciIsImxpbmsiLCJjYXRlZ29yeSIsImxvYWREYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsIm5ld0RhdGEiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJkaXYiLCJjbGFzc05hbWUiLCJhc2lkZSIsInN0eWxlIiwid2lkdGgiLCJuYXYiLCJoMiIsInVsIiwibWFwIiwibGkiLCJidXR0b24iLCJvbkNsaWNrIiwib25SZXNpemUiLCJtYWluIiwiYSIsImhyZWYiLCJ1cmwiLCJ0YXJnZXQiLCJyZWwiLCJpc0Zhdm9yaXRlIiwib25Ub2dnbGUiLCJpbWciLCJzcmMiLCJhbHQiLCJ0aXRsZSIsImhlaWdodCIsIm9uRXJyb3IiLCJlIiwiZGlzcGxheSIsInBhcmVudEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaDMiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});