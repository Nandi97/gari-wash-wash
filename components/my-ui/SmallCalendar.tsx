import { Icon } from '@iconify/react/dist/iconify.js';

interface Day {
	date: string;
	isCurrentMonth?: boolean;
	isToday?: boolean;
	isSelected?: boolean;
}

interface SmallCalendarProps {
	month: string;
	year: string;
	days: Day[];
	onPrevMonth: () => void;
	onNextMonth: () => void;
	selectedDate: string | undefined;
}

function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

function getWeekDays(): string[] {
	const date = new Date();
	const weekdays = [];
	for (let i = 0; i < 7; i++) {
		weekdays.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
		date.setDate(date.getDate() + 1);
	}
	return weekdays;
}

export default function SmallCalendar({
	month,
	year,
	days,
	onPrevMonth,
	onNextMonth,
	selectedDate,
}: SmallCalendarProps) {
	const weekdays = getWeekDays();

	// console.log(days?.[0]?.date);
	// console.log(selectedDate);

	return (
		<div>
			<div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
				<div className="flex items-center text-gray-900">
					<button
						type="button"
						className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
						onClick={onPrevMonth}
					>
						<span className="sr-only">Previous month</span>
						<Icon
							icon="heroicons:chevron-left"
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>
					<div className="flex-auto text-sm font-semibold">{`${month} ${year}`}</div>
					<button
						type="button"
						className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
						onClick={onNextMonth}
					>
						<span className="sr-only">Next month</span>
						<Icon
							icon="heroicons:chevron-right"
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>
				</div>
				<div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
					{weekdays?.map((day) => <div key={day}>{day}</div>)}
				</div>
				<div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
					{days?.map((day, dayIdx) => (
						<div
							key={day?.date}
							className={classNames(
								'py-1.5 hover:bg-gray-100 focus:z-10',
								day?.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
								day?.date === selectedDate && 'font-semibold', // Check if the date matches selectedDate
								day?.date === selectedDate && 'text-white', // Apply styles for the selected date
								!day?.isSelected &&
									day?.isCurrentMonth &&
									!day?.isToday &&
									'text-gray-900',
								!day?.isSelected &&
									!day?.isCurrentMonth &&
									!day?.isToday &&
									'text-gray-400',
								day?.isToday && !day?.isSelected && 'text-primary-600',
								dayIdx === 0 && 'rounded-tl-lg',
								dayIdx === 6 && 'rounded-tr-lg',
								dayIdx === days?.length - 7 && 'rounded-bl-lg',
								dayIdx === days?.length - 1 && 'rounded-br-lg'
							)}
						>
							<time
								dateTime={day?.date}
								className={classNames(
									'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
									day?.isSelected && day?.isToday && 'bg-primary-600',
									day?.isSelected && !day?.isToday && 'bg-gray-900'
								)}
							>
								{day?.date?.split('-').pop().replace(/^0/, '')}
							</time>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
