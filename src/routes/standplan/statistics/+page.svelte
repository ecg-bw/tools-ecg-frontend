<script lang="ts">
  import * as Card from "#lib/components/ui/card/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";
  import * as Chart from "#lib/components/ui/chart/index.js";

  const chartData = [
    { month: "WE1", desktop: 186, mobile: 80 },
    { month: "WE2", desktop: 305, mobile: 200 },
    { month: "WE3", desktop: 237, mobile: 120 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies Chart.ChartConfig;
</script>

<div class="flex justify-center">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Waffelcounter</Card.Title>
      <!-- <Card.Description
      >Enter your email below to login to your account</Card.Description
    > -->
    </Card.Header>
    <Card.Content>
      <Chart.Container config={chartConfig} class="min-h-[200px] w-full">
        <BarChart
          data={chartData}
          xScale={scaleBand().padding(0.25)}
          x="month"
          axis="x"
          seriesLayout="group"
          tooltipContext={false}
          series={[
            {
              key: "desktop",
              label: chartConfig.desktop.label,
              color: chartConfig.desktop.color,
            },
            {
              key: "mobile",
              label: chartConfig.mobile.label,
              color: chartConfig.mobile.color,
            },
          ]}
        />
      </Chart.Container>
    </Card.Content>
  </Card.Root>
</div>
