import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { 
  DollarSign, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle,
  TrendingDown,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const spendData = [
  { name: 'Jan', spend: 4000, target: 4400 },
  { name: 'Feb', spend: 3000, target: 3200 },
  { name: 'Mar', spend: 2000, target: 2200 },
  { name: 'Apr', spend: 2780, target: 2500 },
  { name: 'May', spend: 1890, target: 2100 },
  { name: 'Jun', spend: 2390, target: 2500 },
  { name: 'Jul', spend: 3490, target: 3100 },
];

const vendorScoreData = [
  { name: 'Strategic', count: 12 },
  { name: 'Preferred', count: 45 },
  { name: 'Standard', count: 86 },
  { name: 'At Risk', count: 7 },
];

function KPICard({ title, value, icon: Icon, trend, trendValue, colorClass }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
          
          <div className="mt-2 flex items-center text-sm">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={trend === 'up' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {trendValue}
            </span>
            <span className="text-gray-400 ml-2">vs last month</span>
          </div>
        </div>
        <div className={cn("p-3 rounded-lg", colorClass)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className={cn("absolute bottom-0 left-0 w-full h-1 opacity-50", colorClass)} />
    </div>
  );
}

export function ExecutiveDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Executive Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome to VendorX ERP Analytics • Active Period: Q3 2026</p>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-md shadow-sm text-sm">
          <button className="px-4 py-1.5 border-r border-gray-200 hover:bg-gray-50 font-medium">Month</button>
          <button className="px-4 py-1.5 border-r border-gray-200 bg-blue-50 text-blue-600 font-medium">Quarter</button>
          <button className="px-4 py-1.5 hover:bg-gray-50 font-medium">Year</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="YTD Spend" 
          value="$12.4M" 
          icon={DollarSign} 
          trend="up" 
          trendValue="+14%" 
          colorClass="bg-blue-600"
        />
        <KPICard 
          title="Active POs" 
          value="842" 
          icon={ShoppingBag} 
          trend="up" 
          trendValue="+5%" 
          colorClass="bg-emerald-500"
        />
        <KPICard 
          title="Exceptions" 
          value="24" 
          icon={AlertTriangle} 
          trend="down" 
          trendValue="-12%" 
          colorClass="bg-orange-500"
        />
        <KPICard 
          title="On-Time Delivery" 
          value="94.2%" 
          icon={CheckCircle} 
          trend="up" 
          trendValue="+1.2%" 
          colorClass="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-gray-700">Spend vs Target</h3>
            <button className="text-blue-600 text-sm font-medium flex items-center hover:underline">
              View Report <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                <Area type="monotone" dataKey="target" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-gray-700">Vendor Risk Clustering</h3>
            <button className="text-blue-600 text-sm font-medium flex items-center hover:underline">
              Risk Matrix <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="p-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendorScoreData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
           <h3 className="font-semibold text-gray-700">Critical Approval Queue</h3>
           <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">3 Pending</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Ref ID</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">SLA Flag</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer">INV-2026-892</td>
                <td className="px-4 py-3">Acme Corp Global</td>
                <td className="px-4 py-3"><span className="text-gray-500">Invoice (PO Match)</span></td>
                <td className="px-4 py-3 font-medium">$45,200.00</td>
                <td className="px-4 py-3"><span className="text-red-500 text-xs font-bold uppercase flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> Escalate</span></td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors inline-block">Review</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer">PO-44-1029</td>
                <td className="px-4 py-3">TechSys Solutions</td>
                <td className="px-4 py-3"><span className="text-gray-500">New PO</span></td>
                <td className="px-4 py-3 font-medium">$120,000.00</td>
                <td className="px-4 py-3"><span className="text-orange-500 text-xs font-bold uppercase">2h Remaining</span></td>
                <td className="px-4 py-3 text-right">
                  <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors inline-block">Review</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
