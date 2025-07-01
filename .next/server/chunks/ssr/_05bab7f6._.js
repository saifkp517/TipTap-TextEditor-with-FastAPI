module.exports = {

"[project]/components/TipTap.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/react/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/starter-kit/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tiptap/core/dist/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const GhostTextExtension = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$core$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Extension"].create({
    name: 'ghostText',
    addProseMirrorPlugins () {
        return [];
    }
});
const Tiptap = ()=>{
    const { token } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [ghostText, setGhostText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [lastQuery, setLastQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentSuggestion, setCurrentSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEditor"])({
        extensions: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$starter$2d$kit$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            GhostTextExtension
        ],
        content: "<p>Start typing...</p>",
        onUpdate ({ editor }) {
            const text = editor.getText().trim();
            const words = text.split(/\s+/);
            const lastWord = words[words.length - 1];
            // Fetch suggestions on every keystroke if the last word has changed
            if (lastWord !== lastQuery) {
                setLastQuery(lastWord);
                if (lastWord && lastWord.length > 0) {
                    fetchSuggestions(lastWord);
                } else {
                    setGhostText("");
                    setCurrentSuggestion("");
                }
            }
        },
        editorProps: {
            handleKeyDown: (view, event)=>{
                // Handle Tab key for autocomplete
                if (event.key === "Tab" && currentSuggestion) {
                    event.preventDefault();
                    insertGhostText();
                    return true;
                }
                // Handle Right Arrow key for autocomplete (like VS Code)
                if (event.key === "ArrowRight" && currentSuggestion) {
                    const { selection } = editor.state;
                    const { from, to } = selection;
                    // Only accept if cursor is at the end of current text
                    if (from === to && from === editor.state.doc.content.size - 1) {
                        event.preventDefault();
                        insertGhostText();
                        return true;
                    }
                }
                // Clear ghost text on most other keys
                if (![
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "Shift",
                    "Control",
                    "Alt",
                    "Meta"
                ].includes(event.key)) {
                    if (event.key !== "ArrowRight" && event.key !== "Tab") {
                        // Small delay to let the text update first
                        setTimeout(()=>{
                            const text = editor.getText().trim();
                            const words = text.split(/\s+/);
                            const lastWord = words[words.length - 1];
                            if (lastWord !== lastQuery) {
                                setGhostText("");
                            }
                        }, 10);
                    }
                }
                return false;
            }
        }
    });
    const fetchSuggestions = async (query)=>{
        if (!token || !query.trim()) {
            setGhostText("");
            setCurrentSuggestion("");
            return;
        }
        try {
            const res = await fetch(`http://localhost:8000/autocomplete?query=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                const suggestions = data.suggestions || [];
                if (suggestions.length > 0) {
                    const firstSuggestion = suggestions[0];
                    // Only show ghost text if the suggestion starts with the current query
                    if (firstSuggestion.toLowerCase().startsWith(query.toLowerCase())) {
                        const remainingText = firstSuggestion.slice(query.length);
                        setGhostText(remainingText);
                        setCurrentSuggestion(firstSuggestion);
                    } else {
                        setGhostText("");
                        setCurrentSuggestion("");
                    }
                } else {
                    setGhostText("");
                    setCurrentSuggestion("");
                }
            } else {
                setGhostText("");
                setCurrentSuggestion("");
            }
        } catch (err) {
            console.error("Autocomplete fetch error:", err);
            setGhostText("");
            setCurrentSuggestion("");
        }
    };
    const insertGhostText = ()=>{
        if (!editor || !currentSuggestion) return;
        const { selection } = editor.state;
        const { from } = selection;
        const text = editor.state.doc.textBetween(0, from);
        // Find the start of the current word
        const words = text.split(/\s+/);
        const currentWord = words[words.length - 1];
        const wordStart = from - currentWord.length;
        // Replace the current word with the full suggestion
        editor.chain().focus().deleteRange({
            from: wordStart,
            to: from
        }).insertContent(currentSuggestion + " ").run();
        // Clear ghost text after insertion
        setGhostText("");
        setCurrentSuggestion("");
        setLastQuery("");
    };
    // Get cursor position for ghost text positioning
    const getCursorPosition = ()=>{
        if (!editor) return {
            top: 0,
            left: 0
        };
        try {
            const { selection } = editor.state;
            const { from } = selection;
            const coords = editor.view.coordsAtPos(from);
            const editorRect = editor.view.dom.getBoundingClientRect();
            return {
                top: coords.top - editorRect.top,
                left: coords.left - editorRect.left
            };
        } catch (error) {
            return {
                top: 0,
                left: 0
            };
        }
    };
    const cursorPosition = editor ? getCursorPosition() : {
        top: 0,
        left: 0
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor?.chain().focus().toggleBold().run(),
                        className: `px-2 py-1 border rounded ${editor?.isActive("bold") ? "bg-blue-500 text-white" : "bg-white"}`,
                        children: "Bold"
                    }, void 0, false, {
                        fileName: "[project]/components/TipTap.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>editor?.chain().focus().toggleItalic().run(),
                        className: `px-2 py-1 border rounded ${editor?.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"}`,
                        children: "Italic"
                    }, void 0, false, {
                        fileName: "[project]/components/TipTap.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TipTap.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tiptap$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["EditorContent"], {
                        editor: editor,
                        className: "border p-2 rounded min-h-[200px] focus-within:border-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/components/TipTap.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    ghostText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute pointer-events-none text-gray-400 font-mono",
                        style: {
                            top: `${cursorPosition.top + 8}px`,
                            left: `${cursorPosition.left + 8}px`,
                            fontSize: '14px',
                            lineHeight: '1.5',
                            zIndex: 10
                        },
                        children: ghostText
                    }, void 0, false, {
                        fileName: "[project]/components/TipTap.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TipTap.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            currentSuggestion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-xs text-gray-500",
                children: [
                    "Press ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        className: "px-1 py-0.5 bg-gray-100 rounded text-xs",
                        children: "Tab"
                    }, void 0, false, {
                        fileName: "[project]/components/TipTap.tsx",
                        lineNumber: 218,
                        columnNumber: 17
                    }, this),
                    " or ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        className: "px-1 py-0.5 bg-gray-100 rounded text-xs",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/components/TipTap.tsx",
                        lineNumber: 218,
                        columnNumber: 87
                    }, this),
                    ' to accept "',
                    currentSuggestion,
                    '"'
                ]
            }, void 0, true, {
                fileName: "[project]/components/TipTap.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TipTap.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Tiptap;
}}),
"[project]/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TipTap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TipTap.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/context/AuthContext.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function Home() {
    const { user, token, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white",
        children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 max-w-md mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold mb-4",
                    children: [
                        "Welcome, ",
                        user.email
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 15,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TipTap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 17,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 16,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 14,
            columnNumber: 11
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 max-w-md mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold mb-4",
                    children: "Please log in to continue"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 22,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "You can access the editor once you are logged in."
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 23,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>window.location.href = "/login",
                    className: "mt-4 px-4 py-2 bg-blue-500 text-white rounded",
                    children: " Login "
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 24,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 21,
            columnNumber: 11
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=_05bab7f6._.js.map