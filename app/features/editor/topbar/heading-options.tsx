import type { Editor } from "@tiptap/react";
import { ToolbarButton } from "../ui/toolbar-button";
import {
	Heading,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const HeadingOptions = ({ editor }: { editor: Editor }) => (
	<DropdownMenu>
		<DropdownMenuTrigger>
			<ToolbarButton icon={Heading} tooltip="Headings" />
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start">
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={Heading1}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					isActive={editor.isActive("heading", { level: 1 })}
					tooltip="Heading 1"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={Heading2}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					isActive={editor.isActive("heading", { level: 2 })}
					tooltip="Heading 2"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={Heading3}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					isActive={editor.isActive("heading", { level: 3 })}
					tooltip="Heading 3"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={Heading4}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 4 }).run()
					}
					isActive={editor.isActive("heading", { level: 4 })}
					tooltip="Heading 4"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={Heading5}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 5 }).run()
					}
					isActive={editor.isActive("heading", { level: 5 })}
					tooltip="Heading 5"
				/>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);
