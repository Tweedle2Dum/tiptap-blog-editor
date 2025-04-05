import type { Editor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ToolbarButton } from "../ui/toolbar-button";

export const TextAlignOptions = ({ editor }: { editor: Editor }) => (
	<DropdownMenu>
		<DropdownMenuTrigger>
			<ToolbarButton icon={AlignLeft} tooltip="Text Alignment" />
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start">
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={AlignLeft}
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					isActive={editor.isActive({ textAlign: "left" })}
					tooltip="Align Left"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={AlignCenter}
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					isActive={editor.isActive({ textAlign: "center" })}
					tooltip="Align Center"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={AlignRight}
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					isActive={editor.isActive({ textAlign: "right" })}
					tooltip="Align Right"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={AlignJustify}
					onClick={() => editor.chain().focus().setTextAlign("justify").run()}
					isActive={editor.isActive({ textAlign: "justify" })}
					tooltip="Justify"
				/>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);
