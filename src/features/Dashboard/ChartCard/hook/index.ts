import { AxisOptions, ChartOptions } from "react-charts";

export function useChart<T>([primary, secondary, tetrary]: Array<keyof T>, elementType: 'line' | 'area' | 'bar' | 'bubble' = 'line', data: Array<T>) {
    const primaryAxis: AxisOptions<T> = {
        getValue: (datum) => datum[primary]
    }
    const secondaryAxes: AxisOptions<T>[] = [
        {
            getValue: (datum) => datum[secondary],
            elementType: elementType
        },
    ]
    if (tetrary) {
        secondaryAxes.push({
            getValue: (datum) => datum[tetrary],
            elementType: elementType
        })
    }
    const options: ChartOptions<T> = {
        data: [
            {
                label: 'data1',
                data: data
            }
        ],
        primaryAxis,
        secondaryAxes
    }
    return { options }
}