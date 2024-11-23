import * as React from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Grid } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";

import { cn } from "../utils/cn";

const ChartContainer = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full h-[350px]", className)} {...props} />
));
ChartContainer.displayName = "ChartContainer";

const Chart = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
}) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const x = (d) => d.label;
  const y = (d) => d.value;

  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: data.map(x),
    padding: 0.4,
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(y))],
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          stroke="var(--border)"
          strokeOpacity={0.1}
        />
        <AxisBottom
          top={yMax}
          scale={xScale}
          stroke="var(--border)"
          tickStroke="var(--border)"
          tickLabelProps={{
            fill: "var(--foreground)",
            fontSize: 11,
            textAnchor: "middle",
          }}
        />
        <AxisLeft
          scale={yScale}
          stroke="var(--border)"
          tickStroke="var(--border)"
          tickLabelProps={{
            fill: "var(--foreground)",
            fontSize: 11,
            textAnchor: "end",
            dy: "0.33em",
            dx: -4,
          }}
        />
        {data.map((d) => {
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(y(d)) ?? 0);
          const barX = xScale(x(d));
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${x(d)}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="var(--primary)"
            />
          );
        })}
      </Group>
    </svg>
  );
};

export { Chart, ChartContainer };
