import { Action } from '@ngrx/store';
import { Card } from './inventory.reducer';

export const CREATE = '[Card] Create';
export const UPDATE = '[Card] Update';
export const DELETE = '[Card] Delete';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public card: Card) {}
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Card>
        ) {}
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) {}
}

export type InventoryActions = Create | Update | Delete;
