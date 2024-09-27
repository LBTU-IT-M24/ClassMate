export interface IDraggablePosition {
    init: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    isDraging: boolean;
    dragStartX: number | null;
    dragStartY: number | null;
}
