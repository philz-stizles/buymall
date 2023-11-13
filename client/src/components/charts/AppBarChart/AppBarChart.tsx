import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ChartWrapper from '../ChartWrapper/ChartWrapper';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sept',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type Props = {
  className?: string;
  title?: string;
};

const AppBarChart = ({ title, className }: Props) => {
  return (
    <ChartWrapper title={title} className={className}>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          title="Hello World"
          // width={730}
          // height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dataKey="name"
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            radius={[4, 4, 0, 0]}
            barSize={16}
            dataKey="pv"
            fill="#6741d9"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            radius={[4, 4, 0, 0]}
            barSize={16}
            dataKey="uv"
            fill="#f3f0ff"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default AppBarChart;
