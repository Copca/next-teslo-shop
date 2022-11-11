import { UiState } from './';

type UiActionType =
	| { type: '[Ui] - Open InputSearch' }
	| { type: '[Ui] - Close InputSearch' };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
	switch (action.type) {
		case '[Ui] - Open InputSearch':
			return {
				...state,
				isInputSearchOpen: true
			};

		case '[Ui] - Close InputSearch':
			return {
				...state,
				isInputSearchOpen: false
			};

		default:
			return state;
	}
};
