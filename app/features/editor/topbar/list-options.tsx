import type { Editor } from "@tiptap/react";
import { List, ListOrdered } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ToolbarButton } from "../ui/toolbar-button";

export const ListOptions = ({ editor }: { editor: Editor }) => (
	<DropdownMenu>
		<DropdownMenuTrigger>
			<ToolbarButton icon={List} tooltip="Lists" />
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start">
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={List}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					isActive={editor.isActive("bulletList")}
					tooltip="Bullet List"
				/>
			</DropdownMenuItem>
			<DropdownMenuItem asChild>
				<ToolbarButton
					icon={ListOrdered}
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					isActive={editor.isActive("orderedList")}
					tooltip="Ordered List"
				/>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);
