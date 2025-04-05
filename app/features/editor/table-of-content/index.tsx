import type { Editor, JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type Heading = {
	id: string;
	text: string;
	level: number;
};

export const TableOfContent = ({
	editor,
	className,
}: {
	editor: Editor;
	className?: string;
}) => {
	const [headings, setHeadings] = useState<Heading[]>([]);

	useEffect(() => {
		const generateTOC = () => {
			const content = editor.getJSON();
			const newHeadings: Heading[] = [];

			const walk = (node: JSONContent) => {
				if (node.type === "heading") {
					const text = node.content?.map((n) => n.text ?? "").join("") ?? "";
					const id = text
						.toLowerCase()
						.replace(/\s+/g, "-")
						.replace(/[^\w-]/g, "");
					newHeadings.push({
						id,
						text,
						level: node.attrs?.level ?? 1,
					});
				}

				node.content?.forEach(walk);
			};

			content.content?.forEach(walk);
			setHeadings(newHeadings);
		};

		generateTOC();
		editor.on("update", generateTOC);
		return () => {
			editor.off("update", generateTOC);
		};
	}, [editor]);

	return (
		<div className={cn("space-y-2 text-sm", className)}>
			<h2 className="font-semibold text-gray-800 dark:text-gray-200">
				Table of Contents
			</h2>
			<ul className="space-y-1">
				{headings.map(({ id, text, level }) => (
					<li key={id}>
						<button
							type="button"
							className={cn(
								"text-left w-full text-blue-600 hover:underline truncate",
								"overflow-hidden whitespace-nowrap text-ellipsis block",
								level === 2 && "pl-4",
								level === 3 && "pl-8",
								level > 3 && `pl-${level * 4}`,
							)}
							onClick={() => {
								const el = document.getElementById(id);
								if (el) el.scrollIntoView({ behavior: "smooth" });
							}}
							title={text}
						>
							{text}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};
