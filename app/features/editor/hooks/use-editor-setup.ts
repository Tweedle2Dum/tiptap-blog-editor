import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import Focus from "@tiptap/extension-focus";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import { ResizableImage } from "../extensions/image";
import { ProseTextAlign } from "../extensions/prose-text-align";

const lowlight = createLowlight(all);

export const useEditorSetup = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				orderedList: {
					HTMLAttributes: {
						class: "list-decimal",
					},
				},
				bulletList: {
					HTMLAttributes: {
						class: "list-disc",
					},
				},
			}),
			Typography,
			TextStyle,
			ProseTextAlign.configure({
				types: ["heading", "paragraph"],
				alignments: ["left", "center", "right", "justify"],
				defaultAlignment: "left",
			}),
			Underline,
			Highlight,
			ResizableImage,
			Link,
			Placeholder.configure({
				placeholder: "Start writing here....",
			}),
			Subscript,
			Superscript,
			TaskItem,
			TaskList,
			Focus.configure({
				className:
					"has-focus border-blue-500 bg-blue-50 ring-1 ring-blue-500 rounded-md",
				mode: "all",
			}),
			CharacterCount,
			FontFamily,
			Color,
			CodeBlockLowlight.configure({
				lowlight,
			}),
		],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: "p-8 min-h-[80vh] prose prose-3xl max-w-none",
			},
		},
	});

	return editor;
};
