import { Button } from "~/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "~/components/ui/tooltip";

export const ToolbarButton = ({
	icon: Icon,
	onClick,
	isActive = false,
	tooltip,
}: {
	icon: React.ElementType;
	onClick?: () => void;
	isActive?: boolean;
	tooltip: string;
}) => (
	<Tooltip>
		<TooltipTrigger asChild>
			<Button
				className={`p-2 rounded-lg transition-colors ${
					isActive
						? "bg-blue-600 text-white"
						: "hover:bg-gray-100 text-gray-700"
				}`}
				variant={"ghost"}
				onClick={onClick}
			>
				<Icon size={20} />
			</Button>
		</TooltipTrigger>
		<TooltipContent>{tooltip}</TooltipContent>
	</Tooltip>
);
