import { ActionReducerMap } from '@ngrx/store';
import { inventoryReducer } from '../inventory/inventory.reducer';

export const reducers: ActionReducerMap<any> = {
    inventory: inventoryReducer
}