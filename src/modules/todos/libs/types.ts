export type Todo = {
	id: string;
	title: string;
	description?: string;
	status: string;
	priority: 'low' | 'medium' | 'high' | 'urgent';
	isCompleted: boolean;
};

export type Pagination = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

export type TodosPayload = {
	status: number;
	data: Todo[];
	pagination: Pagination;
};
