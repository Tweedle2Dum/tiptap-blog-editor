import { Image } from "@tiptap/extension-image";
import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { fileToBase64 } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { FiMove } from "react-icons/fi";
import { ImageUploadDialog } from "./image-upload-dialog";

const ResizableImageComponent = (props: NodeViewProps) => {
	const initialHeight = props.node.attrs.height || 200;
	const [height, setHeight] = useState(initialHeight);
	const [isResizing, setIsResizing] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const imgRef = useRef<HTMLImageElement>(null);

	/* HOOK FOR HANDLING VERTICAL RESIZING OF IMAGE ON EDITOR */
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing) return;
			const rect = imgRef.current?.getBoundingClientRect();
			if (!rect) return;
			const newHeight = Math.max(50, e.clientY - rect.top);
			setHeight(newHeight);
		};

		const handleMouseUp = () => {
			if (isResizing) {
				setIsResizing(false);
				props.updateAttributes({ height });
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isResizing, height, props]);

	const handleFileUpload = async (file: File) => {
		try {
			const base64 = await fileToBase64(file);
			props.updateAttributes({ src: base64 });
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const handleAltChange = (altText: string) => {
		props.updateAttributes({ alt: altText });
	};

	return (
		<NodeViewWrapper className="relative">
			<button
				type="button"
				className="relative w-full cursor-pointer"
				onDoubleClick={() => {
					setIsDialogOpen(true);
				}}
			>
				<img
					ref={imgRef}
					src={props.node.attrs.src}
					alt={props.node.attrs.alt}
					style={{
						width: "100%",
						height,
						objectFit: "cover",
						borderRadius: "12px",
					}}
				/>
			</button>

			{props.selected && (
				<div
					onMouseDown={(e) => {
						e.preventDefault();
						setIsResizing(true);
					}}
					className="absolute bottom-10 left-0 w-full h-8 bg-gradient-to-r from-gray-400 to-gray-600 cursor-ns-resize flex items-center justify-center rounded-t-md rounded-b-md opacity-80 hover:opacity-100 transition-opacity duration-150"
				>
					<FiMove className="text-white text-lg mr-2" />
					<span className="text-white text-xs font-semibold">
						Drag to resize
					</span>
				</div>
			)}

			{isDialogOpen && (
				<ImageUploadDialog
					open={isDialogOpen}
					setImageAlt={handleAltChange}
					setOpen={setIsDialogOpen}
					handleFileUpload={handleFileUpload}
				/>
			)}
		</NodeViewWrapper>
	);
};

export const ResizableImage = Image.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			height: {
				default: 200,
				parseHTML: (element) => Number.parseInt(element.style.height) || 200,
				renderHTML: (attributes) => ({
					style: `
						height: ${attributes.height}px;
						${attributes.width ? `width: ${attributes.width};` : ""}
						object-fit: cover;
						border-radius: 12px;
					`,
				}),
			},
			width: {
				default: "100%",
				parseHTML: (element) => element.style.width || "100%",
				renderHTML: (attributes) => ({
					style: `
						width: ${attributes.width};
						object-fit: cover;
						border-radius: 12px;
					`,
				}),
			},
			objectFit: {
				default: "cover",
				parseHTML: (element) => element.style.objectFit || "cover",
				renderHTML: (attributes) => ({
					style: `object-fit: ${attributes.objectFit};`,
				}),
			},
		};
	},
	addNodeView() {
		return ReactNodeViewRenderer(ResizableImageComponent);
	},
});
