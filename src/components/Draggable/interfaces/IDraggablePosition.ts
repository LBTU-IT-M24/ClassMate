export interface IDraggablePosition {
    init: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    isDragging: boolean;
    dragStartX: number | null;
    dragStartY: number | null;
}
