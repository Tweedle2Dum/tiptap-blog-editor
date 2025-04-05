import TextAlign from "@tiptap/extension-text-align";

export const ProseTextAlign = TextAlign.extend({
	addAttributes() {
		return {
			textAlign: {
				...this.parent?.(),
				renderHTML: (attributes: Record<string, string>) => ({
					style: `
            text-align: ${attributes.textAlign || "left"};
          `,
				}),
			},
		};
	},
});
