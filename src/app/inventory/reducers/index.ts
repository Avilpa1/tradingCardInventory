import { ActionReducerMap } from '@ngrx/store';
import { inventoryReducer, Card } from '../inventory.reducer';

export const rootReducer = {}

export interface AppState {
    inventory: any;
}

export const reducers: ActionReducerMap<AppState> = {
    inventory: inventoryReducer
};
