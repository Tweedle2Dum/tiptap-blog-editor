import { EditorContent } from "@tiptap/react";
import React from "react";
import { useEditorSetup } from "./hooks/use-editor-setup";
import { TableOfContent } from "./table-of-content";
import { EditorTopbar } from "./topbar";

export const BlogEditor = () => {
	const editor = useEditorSetup();
	const [previewMode, setPreviewMode] = React.useState(false);

	if (!editor) return null;

	return (
		<main className="flex justify-center gap-8 p-4">
			{/* TOC only in edit mode */}
			{!previewMode && (
				<aside className="fixed left-8 top-8 w-64 h-fit border rounded-md p-4 bg-white dark:bg-zinc-900 shadow">
					<TableOfContent editor={editor} />
				</aside>
			)}

			<section className="flex-1 max-w-4xl mt-8 px-4">
				<EditorTopbar
					editor={editor}
					previewMode={previewMode}
					setPreviewMode={setPreviewMode}
				/>

				{!previewMode && (
					<EditorContent
						editor={editor}
						contentEditable={!previewMode}
						className="mt-4"
					/>
				)}

				{previewMode && (
					<div className="mt-8 bg-white dark:bg-zinc-900 rounded-md p-6">
						<div
							className="prose dark:prose-invert max-w-none"
							dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
						/>
					</div>
				)}
			</section>
		</main>
	);
};
