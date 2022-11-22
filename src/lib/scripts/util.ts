export function getNavLinks() {
	return [
		{ name: 'Units', path: '/units' },
		{ name: 'Links', path: '/links' },
		{ name: 'Draft Statuses', path: '/drafts' },
		{ name: 'Kam', path: '/kam' }
	];
}

export const defaultStatuses = {
	'1': { '1': 0, '2': 0, '3': 0 },
	'2': { '1': 0, '2': 0, '3': 0 },
	'3': { '1': 0, '2': 0, '3': 0 },
	'4': { '1': 0, '2': 0, '3': 0 },
	'5': { '1': 0, '2': 0, '3': 0 },
	'6': { '1': 0, '2': 0, '3': 0 }
} as { [unit: string]: { [draft: string]: number } };

export const defaultQuestions = {} as {
	[unit: string]: {
		[q: string]: {
			[key: string]: string;
		};
	};
};

export const statusNames = ['Needs Work', 'Ok. More Work To Do', 'Close', 'Even Closer', 'Done'];
