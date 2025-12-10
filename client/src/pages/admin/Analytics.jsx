import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

// ✅ Modern Stat Card (No CountUp)
const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      className="bg-white/90 border border-green-200 rounded-xl p-6 flex justify-between items-center shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div>
        <p className="text-gray-500 text-sm mb-1 font-medium">{title}</p>
        <h2 className={`text-3xl font-bold ${color}`}>
          {value.toLocaleString()}
        </h2>
      </div>

      <div className={`text-4xl opacity-90 ${color}`}>{icon}</div>
    </motion.div>
  );
};

const Analytics = () => {
  const [data] = useState({
    users: 2450,
    revenue: 125430,
    meetings: 128,
    growth: 18,
  });

  return (
    <div className="admin-scroll min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-white p-8  ml-2 md:ml-[18rem] text-gray-800">

      {/* ✅ Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Analytics Dashboard
      </motion.h1>

      {/* ✅ Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={data.users}
          icon={<FaUsers />}
          color="text-green-600"
        />

        <StatCard
          title="Total Revenue (₹)"
          value={data.revenue}
          icon={<FaMoneyBillWave />}
          color="text-green-600"
        />

        <StatCard
          title="Total Meetings"
          value={data.meetings}
          icon={<FaCalendarAlt />}
          color="text-green-600"
        />

        <StatCard
          title="Growth Rate %"
          value={`${data.growth}%`}
          icon={<FaChartLine />}
          color="text-green-600"
        />

      </div>

      {/* ✅ Left & Right Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">

        {/* LEFT */}
        <motion.div
          className="bg-white/90 border border-green-200 rounded-xl p-6 h-[360px] shadow-sm hover:shadow-md transition-all"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaChartLine className="mr-2 text-green-500" />
            User Growth
          </h2>

          <div className="w-full h-fit bg-green-50/50 rounded-lg flex items-center justify-center text-green-500 border-2 border-dashed border-green-200">
            User Growth Graph
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="bg-white/90 border border-green-200 rounded-xl p-6 h-[360px] shadow-sm hover:shadow-md transition-all"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            Revenue Analytics
          </h2>

          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-gray-500 mb-3 text-sm font-medium">
              Total Income This Month
            </p>

            <h1 className="text-4xl font-bold text-green-600">
              ₹ {data.revenue.toLocaleString()}
            </h1>

            <p className="mt-4 text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
              +18% higher than last month
            </p>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Analytics;
