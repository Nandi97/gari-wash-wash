import { Icon } from '@iconify/react/dist/iconify.js';

interface DuplicateErrorProps {
	setToggle: (toggle: boolean) => void;
}

export default function DuplicateError({ setToggle }: DuplicateErrorProps) {
	return (
		<div className="fixed top-0 left-0 z-20 w-full h-full bg-black/50">
			<div className="absolute flex flex-col items-center gap-6 p-12 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
				<div className="p-8">
					<p className="text-red-500">Duplicate Service and Car Type</p>
				</div>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setToggle(false);
					}}
					className="absolute top-3 right-3"
				>
					<Icon icon="heroicons:x-mark" />
				</button>
			</div>
		</div>
	);
}
