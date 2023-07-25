import { moveAction,vMove, vMoveFor2, movePlugin } from './directive/move';

export const toMove = moveAction;
export const moveDirective = vMove;
export const moveDirectiveFor2 = vMoveFor2;
export const moveDirectivePlugin = movePlugin;

export default {
    toMove: moveAction,
    moveDirective: vMove,
    moveDirectiveFor2: vMoveFor2,
    moveDirectivePlugin: movePlugin
}