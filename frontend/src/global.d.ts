declare module 'react-heatmap-grid' {
    const HeatMapGrid: React.FC<{
        xLabels: string[],
        yLabels: string[],
        data: number[][],
        background?: (x: number, y: number, value: number) => string,
        cellStyle?: (x: number, y: number, ratio: number) => React.CSSProperties,
        cellRender?: (x: number, y: number, value: number) => React.ReactNode,
        xLabelsLocation?: "top" | "bottom",
        xLabelWidth?: number,
        yLabelWidth?: number,
        unit?: string,
        onClick?: (x: number, y: number) => void,
    }>;
    export default HeatMapGrid;
}
