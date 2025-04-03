import { UserActivity } from "@/api/types/auth";
import OutlineButton from "@/components/shared/OutlineButton";
import useThemeCreator from "@/hooks/use-theme";
import ReactECharts from "echarts-for-react";
import moment from "moment-jalaali";
import React, { useEffect, useState } from "react";

const UserActivityBarChart: React.FC<{ userActivities: UserActivity[] }> = ({
  userActivities,
}) => {
  const { theme }: any = useThemeCreator();
  const [currentWeek, setCurrentWeek] = useState(0);

  const weeklyData = userActivities
    .slice(currentWeek * 7, currentWeek * 7 + 7)
    .map((activity) => {
      const day = moment(activity.date).format("jD");
      const month = moment(activity.date).format("jMM");
      return {
        dayLabel: `${month}/${day}`,
        timeSpent: activity.time_spent / 3600000,
      };
    });
  const options = {
    textStyle: {
      fontFamily: "Dana",
    },
    grid: {
      containLabel: true,
    },
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100,
        xAxisIndex: 0,
        show: false,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        color: theme.palette.text.main,
      },
      axisLine: {
        lineStyle: {
          color: theme.palette.text.gray400,
        },
      },
    },
    xAxis: {
      type: "category",
      data: weeklyData.map((data) => data.dayLabel),
      axisLabel: {
        color: theme.palette.text.main,
      },
      axisLine: {
        lineStyle: {
          color: theme.palette.text.gray400,
        },
      },
    },
    yAxis: {
      type: "value",
      name: "ساعت",
      axisLabel: {
        color: theme.palette.text.main,
      },
      splitLine: {
        lineStyle: {
          color: theme.palette.text.gray400,
        },
      },
    },
    series: [
      {
        name: "میزان فعالیت",
        type: "bar",
        data: weeklyData.map((data) => data.timeSpent),
        itemStyle: {
          color: theme.palette.text.primary,
          borderRadius: [8, 8, 0, 0],
          shadowColor: theme.palette.text.gray400,
          shadowBlur: 4,
          shadowOffsetY: 4,
        },
        barWidth: "50%",
      },
    ],
  };

  const handleNextWeek = () => {
    if ((currentWeek + 1) * 7 < userActivities.length) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };
  useEffect(() => {
    const today = moment();
    // @ts-ignore
    const startOfWeek = today.startOf("jWeek");
    const weekIndex = Math.floor(
      userActivities.findIndex((activity) =>
        moment(activity.date).isSame(startOfWeek, "day")
      ) / 7
    );
    setCurrentWeek(weekIndex >= 0 ? weekIndex : 0);
  }, []);

  return (
    <div className="flex-1 w-full mx-auto rounded-2xl shadow-lg">
      <h2 className="page-title text-main text-base md:text-lg font-semibold">
        گزارش هفتگی
      </h2>
      <ReactECharts
        option={options}
        style={{ height: "300px", width: "100%" }}
      />
      <div className="flex justify-center gap-4 mt-4">
        <OutlineButton
          onClick={handlePreviousWeek}
          className="px-4 py-2 rounded-lg"
        >
          هفته قبل
        </OutlineButton>
        <OutlineButton
          onClick={handleNextWeek}
          className="px-4 py-2 rounded-lg"
        >
          هفته بعد
        </OutlineButton>
      </div>
    </div>
  );
};

export default UserActivityBarChart;
