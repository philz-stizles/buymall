import classes from './Overview.module.css';
import { IoNotifications, IoPeople, IoPeopleOutline } from 'react-icons/io5';
import StatsCard from '../../../components/cards/StatsCard/StatsCard';
import { AppAreaChart, AppBarChart, AppDoughnut } from '../../../components/charts';
import Orders from './Orders';
// import { getFullDay, getFullMonth } from '../../../utils/date-helpers';

const OverviewPage = () => {
  // const now = new Date();
  // const fullDay = getFullDay(now.getDay());
  // const fullMonth = getFullMonth(now.getMonth());
  // const date = `${fullMonth} ${now.getDate()}, ${now.getFullYear()}`;

  return (
    <div className="py-6 flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          color="#20c997"
          title="Total Vendors"
          figure="+3250"
          icon={IoPeopleOutline}
          meta="8.0%"
        />
        <StatsCard
          color="#f783ac"
          title="Pending Balance"
          figure="$24,987.80"
          icon={IoNotifications}
          meta="1.2%"
        />
        <StatsCard
          color="#ffd43b"
          title="Enter Amount"
          figure="$9,4823.20"
          icon={IoNotifications}
          meta="2.0%"
        />
        <StatsCard
          color="#9775fa"
          title="Enter Amount"
          figure="$9,4823.20"
          icon={IoNotifications}
          meta="2.0%"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <AppBarChart title="Annual Revenue" className="col-span-2" />
        <AppDoughnut title="Sale Distribution" />
      </div>

      <Orders title="Recent Orders" />
    </div>
  );
};

export default OverviewPage;
