import type { Editor } from "@tiptap/react";
import { ToolbarButton } from "../ui/toolbar-button";
import {
	Bold,
	Code,
	Image as ImageIcon,
	Italic,
	Quote,
	RotateCcw,
	RotateCw,
	Type,
	Underline,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { TooltipProvider } from "~/components/ui/tooltip";
import { HeadingOptions } from "./heading-options";
import { ListOptions } from "./list-options";
import { TextAlignOptions } from "./text-align-options";

type TopbarProps = {
	editor: Editor;
	previewMode: boolean;
	setPreviewMode: (previewMode: boolean) => void;
};

export const EditorTopbar = ({
	editor,
	previewMode,
	setPreviewMode,
}: TopbarProps) => {
	return (
		<TooltipProvider>
			<div className="border-b border-gray-200 p-2 flex items-center gap-1 bg-gray-50 h-12">
				{!previewMode && (
					<div className="flex items-center gap-1">
						<ToolbarButton
							icon={RotateCcw}
							onClick={() => editor.chain().focus().undo().run()}
							tooltip="Undo"
						/>
						<ToolbarButton
							icon={RotateCw}
							onClick={() => editor.chain().focus().redo().run()}
							tooltip="Redo"
						/>
						<div className="w-px h-6 bg-gray-300 mx-2" />
						<ToolbarButton
							icon={Type}
							onClick={() => editor.chain().focus().setParagraph().run()}
							isActive={editor.isActive("paragraph")}
							tooltip="Paragraph"
						/>
						<TextAlignOptions editor={editor} />
						<ToolbarButton
							icon={Bold}
							onClick={() => editor.chain().focus().toggleBold().run()}
							isActive={editor.isActive("bold")}
							tooltip="Bold"
						/>
						<ToolbarButton
							icon={Italic}
							onClick={() => editor.chain().focus().toggleItalic().run()}
							isActive={editor.isActive("italic")}
							tooltip="Italic"
						/>
						<ToolbarButton
							icon={Underline}
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							isActive={editor.isActive("underline")}
							tooltip="Underline"
						/>
						<HeadingOptions editor={editor} />
						<div className="w-px h-6 bg-gray-300 mx-2" />
						<ListOptions editor={editor} />
						<ToolbarButton
							icon={Quote}
							onClick={() => editor.chain().focus().toggleBlockquote().run()}
							isActive={editor.isActive("blockquote")}
							tooltip="Blockquote"
						/>
						<div className="w-px h-6 bg-gray-300 mx-2" />
						<ToolbarButton
							icon={Code}
							onClick={() => editor.chain().focus().toggleCodeBlock().run()}
							isActive={editor.isActive("codeBlock")}
							tooltip="Code Block"
						/>
						<ToolbarButton
							icon={ImageIcon}
							onClick={() =>
								editor
									.chain()
									.focus()
									.setImage({
										src: "https://placehold.co/600x400",
										alt: "Placeholder Image",
									})
									.run()
							}
							tooltip="Insert Image"
						/>
					</div>
				)}
				<Button
					className="ml-auto"
					variant={"outline"}
					size={"sm"}
					onClick={() => setPreviewMode(!previewMode)}
				>
					{previewMode ? "Edit" : "Preview"}
				</Button>
			</div>
		</TooltipProvider>
	);
};
