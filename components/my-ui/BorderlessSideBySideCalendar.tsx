import { Icon } from '@iconify/react/dist/iconify.js';

interface Day {
	date: string;
	isCurrentMonth?: any;
	isToday?: any;
	isSelected?: any;
}

interface CalendarProps {
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
		weekdays?.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
		date.setDate(date.getDate() + 1);
	}
	return weekdays;
}

export default function BorderlessSideBySideCalendar({
	month,
	year,
	days,
	onPrevMonth,
	onNextMonth,
	selectedDate,
}: CalendarProps) {
	const weekdays = getWeekDays();

	// console.log(days);
	return (
		<>
			<div className="md:pr-14">
				<div className="flex items-center">
					<h2 className="flex-auto text-sm font-semibold text-secondary-900">{`${month} ${year}`}</h2>
					<button
						type="button"
						className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-secondary-400 hover:text-secondary-500"
						onClick={onPrevMonth}
					>
						<span className="sr-only">Previous month</span>
						<Icon
							icon="heroicons:chevron-left"
							className="h-5 w-5"
							aria-hidden="true"
						/>
					</button>
					<button
						type="button"
						className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-secondary-400 hover:text-secondary-500"
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
				<div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-secondary-500">
					{weekdays?.map((day) => <div key={day}>{day}</div>)}
				</div>
				<div className="mt-2 grid grid-cols-7 text-sm">
					{days?.map((day, dayIdx) => (
						<div
							key={day?.date}
							className={classNames(
								dayIdx > 6 && 'border-t border-secondary-200',
								'py-2'
							)}
						>
							<div
								className={classNames(
									day?.isSelected || (day?.date === selectedDate && 'text-white'),
									!day?.isSelected && day?.isToday && 'text-primary-600',
									!day?.isSelected &&
										!day?.isToday &&
										day?.isCurrentMonth &&
										'text-secondary-900',
									!day?.isSelected &&
										!day?.isToday &&
										!day?.isCurrentMonth &&
										'text-secondary-400',
									day?.isSelected && day?.isToday && 'bg-primary-600',
									(!day?.isToday && day?.isSelected) ||
										(day?.date === selectedDate && 'bg-secondary-900'),
									!day?.isSelected && 'hover:bg-primary-200',
									(day?.isSelected ||
										day?.isToday ||
										day?.date === selectedDate) &&
										'font-semibold',
									'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
								)}
							>
								<time dateTime={day?.date}>
									{day?.date.split('-').pop().replace(/^0/, '')}
								</time>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
