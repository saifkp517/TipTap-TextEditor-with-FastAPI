"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Extension } from '@tiptap/core';

const GhostTextExtension = Extension.create({
  name: 'ghostText',
  
  addProseMirrorPlugins() {
    return [];
  },
});

const Tiptap = () => {
  const { token } = useAuth();
  const [ghostText, setGhostText] = useState<string>("");
  const [lastQuery, setLastQuery] = useState<string>("");
  const [currentSuggestion, setCurrentSuggestion] = useState<string>("");

  const editor = useEditor({
    extensions: [StarterKit, GhostTextExtension],
    content: "<p>Start typing...</p>",
    onUpdate({ editor }) {
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
      handleKeyDown: (view, event) => {
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
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "Shift", "Control", "Alt", "Meta"].includes(event.key)) {
          if (event.key !== "ArrowRight" && event.key !== "Tab") {
            // Small delay to let the text update first
            setTimeout(() => {
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
      },
    },
  });

  const fetchSuggestions = async (query: string) => {
    if (!token || !query.trim()) {
      setGhostText("");
      setCurrentSuggestion("");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/autocomplete?query=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const insertGhostText = () => {
    if (!editor || !currentSuggestion) return;

    const { selection } = editor.state;
    const { from } = selection;
    const text = editor.state.doc.textBetween(0, from);

    // Find the start of the current word
    const words = text.split(/\s+/);
    const currentWord = words[words.length - 1];
    const wordStart = from - currentWord.length;

    // Replace the current word with the full suggestion
    editor
      .chain()
      .focus()
      .deleteRange({ from: wordStart, to: from })
      .insertContent(currentSuggestion + " ")
      .run();

    // Clear ghost text after insertion
    setGhostText("");
    setCurrentSuggestion("");
    setLastQuery("");
  };

  // Get cursor position for ghost text positioning
  const getCursorPosition = () => {
    if (!editor) return { top: 0, left: 0 };

    try {
      const { selection } = editor.state;
      const { from } = selection;
      const coords = editor.view.coordsAtPos(from);
      const editorRect = editor.view.dom.getBoundingClientRect();

      return {
        top: coords.top - editorRect.top,
        left: coords.left - editorRect.left,
      };
    } catch (error) {
      return { top: 0, left: 0 };
    }
  };

  const cursorPosition = editor ? getCursorPosition() : { top: 0, left: 0 };

  return (
    <div className="relative">
      <div className="mb-2 space-x-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${editor?.isActive("bold") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${editor?.isActive("italic") ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          Italic
        </button>
      </div>

      <div className="relative">
        <EditorContent
          editor={editor}
          className="border p-2 rounded min-h-[200px] focus-within:border-blue-500"
        />
        
        {/* Ghost text overlay */}
        {ghostText && (
          <div
            className="absolute pointer-events-none text-gray-400 font-mono"
            style={{
              top: `${cursorPosition.top + 8}px`, // 8px padding offset
              left: `${cursorPosition.left + 8}px`, // 8px padding offset
              fontSize: '14px',
              lineHeight: '1.5',
              zIndex: 10,
            }}
          >
            {ghostText}
          </div>
        )}
      </div>

      {/* Instructions */}
      {currentSuggestion && (
        <div className="mt-2 text-xs text-gray-500">
          Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd> or <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">→</kbd> to accept "{currentSuggestion}"
        </div>
      )}
    </div>
  );
};

export default Tiptap;