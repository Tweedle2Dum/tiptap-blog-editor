import type React from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type ImageUploadDialogProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	setImageAlt: (alt: string) => void;
	handleFileUpload: (file: File) => void;
};

const INVALID_FILE_SIZE_MESSAGE = "File size must be less than 5MB";
const INVALID_FILE_TYPE_MESSAGE = "File type must be an image";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ImageUploadDialog = ({
	open,
	handleFileUpload,
	setOpen,
	setImageAlt,
}: ImageUploadDialogProps) => {
	const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const file = e.dataTransfer.files[0];

		if (file.size > MAX_FILE_SIZE) {
			toast.error(INVALID_FILE_SIZE_MESSAGE);
			return;
		}

		if (!file || !file.type.startsWith("image/")) {
			toast.error(INVALID_FILE_TYPE_MESSAGE);
			return;
		}

		handleFileUpload(file);
	};

	// Prevent default behavior of dragging files into browser
	const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.size > MAX_FILE_SIZE) {
			toast.error(INVALID_FILE_SIZE_MESSAGE);
			return;
		}
		if (!file || !file.type.startsWith("image/")) {
			toast.error(INVALID_FILE_TYPE_MESSAGE);
			return;
		}
		handleFileUpload(file);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[500px] p-8">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold mb-6">
						Add Image
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-8">
					{/* REMOVE URL UPLOADS FOR NOW */}
					{/* <div className="space-y-3">
						<Label
							htmlFor="image-url"
							className="text-base font-medium text-gray-700"
						>
							Link via URL
						</Label>
						<span className="inline-flex w-full items-center gap-4">
							<Input
								id="image-url"
								type="text"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								placeholder="https://example.com/image.jpg"
								className="mt-1 flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
							/>
							<Button variant="outline" size="sm" onClick={handleUrlUpload}>
								<UploadIcon />
							</Button>
						</span>
					</div> */}
					{/* Option 2: File Upload with Big Clickable Area */}
					<div>
						<Label
							onDrop={handleFileDrop}
							onDragOver={handleDragOver}
							htmlFor="file-upload"
							className="block text-base font-medium text-gray-700 mb-3 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors "
						>
							Upload from Disk
							<p className="text-base text-muted-foreground">
								Drag & drop your image here, or click to select a file
							</p>
							<Input
								id="file-upload"
								type="file"
								onChange={handleOnChange}
								accept="image/*"
								className="hidden"
							/>
						</Label>

						<Label htmlFor="image-alt">
							<Input
								id="image-alt"
								type="text"
								onChange={(e) => setImageAlt(e.target.value)}
								placeholder="Alt text for image"
								className="mt-1 flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
							/>
						</Label>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
