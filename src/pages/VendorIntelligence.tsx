import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Brain, TrendingUp, AlertTriangle, ShieldAlert, Cpu, 
  Target, BarChart3, PieChart as PieIcon, Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

const spendData = [
  { category: 'IT Hardware', spend: 4500000, vendors: 12 },
  { category: 'Software', spend: 3200000, vendors: 24 },
  { category: 'Logistics', spend: 8500000, vendors: 5 },
  { category: 'Services', spend: 2100000, vendors: 45 },
  { category: 'Raw Materials', spend: 12400000, vendors: 8 },
];

const riskData = [
  { x: 80, y: 20, z: 200, name: 'Acme Corp', risk: 'Low', sla: '98%' },
  { x: 40, y: 70, z: 250, name: 'CloudNet', risk: 'High', sla: '82%' },
  { x: 60, y: 50, z: 150, name: 'Nexus Log.', risk: 'Medium', sla: '91%' },
  { x: 95, y: 10, z: 300, name: 'Titan Mfg', risk: 'Low', sla: '99%' },
  { x: 20, y: 90, z: 100, name: 'OfficePlus', risk: 'Critical', sla: '75%' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function VendorIntelligence() {
  const [activeTab, setActiveTab] = useState('clustering');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vendor Intelligence & AI</h1>
            <p className="text-sm text-gray-500">Advanced clustering, fraud detection, and predictive analytics.</p>
          </div>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-md shadow-sm text-sm p-1">
          <button 
            className={cn("px-4 py-1.5 rounded-md font-medium transition-colors", activeTab === 'clustering' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50')}
            onClick={() => setActiveTab('clustering')}
          >
             Clustering & Risk
          </button>
          <button 
            className={cn("px-4 py-1.5 rounded-md font-medium transition-colors", activeTab === 'ai' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50')}
            onClick={() => setActiveTab('ai')}
          >
             AI Recommendations & Fraud
          </button>
        </div>
      </div>

      {activeTab === 'clustering' && (
        <div className="space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase">Total Spend</p>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">$30.7M</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +4.2% vs last year</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase">High Risk Vendors</p>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">14</h3>
              <p className="text-xs text-orange-600 mt-1">Requires immediate audit</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase">Avg SLA Compliance</p>
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">92.4%</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +1.1% vs last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase">Dependency Alert</p>
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Logistics</h3>
              <p className="text-xs text-purple-600 mt-1">75% volume in 2 vendors</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-purple-600" /> Spend Concentration by Category
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="spend"
                    >
                      {spendData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `$${(value as number / 1000000).toFixed(1)}M`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" /> Risk vs SLA Score Matrix
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="SLA Score" unit="%" label={{ value: 'SLA Performance', position: 'bottom' }} />
                    <YAxis type="number" dataKey="y" name="Risk Score" label={{ value: 'Risk Level (Lower is better)', angle: -90, position: 'left' }} />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Spend Vol" />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Vendors" data={riskData} fill="#8884d8">
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.y > 60 ? '#ef4444' : entry.x > 80 ? '#22c55e' : '#eab308'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Vendor Scoring Engine Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-700">Vendor Scoring & Classification</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-white text-gray-500 font-semibold border-b border-gray-200 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">Vendor</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Quality (40%)</th>
                    <th className="px-4 py-3">Delivery (30%)</th>
                    <th className="px-4 py-3">Cost (30%)</th>
                    <th className="px-4 py-3 font-bold text-gray-800">Total Score</th>
                    <th className="px-4 py-3">Cluster</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-blue-600">Titan Manufacturing</td>
                    <td className="px-4 py-3">Raw Materials</td>
                    <td className="px-4 py-3 text-green-600">98/100</td>
                    <td className="px-4 py-3 text-green-600">95/100</td>
                    <td className="px-4 py-3 text-green-600">92/100</td>
                    <td className="px-4 py-3 font-bold text-lg">95.3</td>
                    <td className="px-4 py-3"><span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold">Strategic / Preferred</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-blue-600">Acme Corp Global</td>
                    <td className="px-4 py-3">IT Hardware</td>
                    <td className="px-4 py-3 text-green-600">90/100</td>
                    <td className="px-4 py-3 text-orange-500">82/100</td>
                    <td className="px-4 py-3 text-green-600">90/100</td>
                    <td className="px-4 py-3 font-bold text-lg">87.6</td>
                    <td className="px-4 py-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">Operational</span></td>
                  </tr>
                  <tr className="hover:bg-gray-50 border-l-4 border-l-red-500">
                    <td className="px-4 py-3 font-medium text-blue-600">CloudNet Secure</td>
                    <td className="px-4 py-3">Software</td>
                    <td className="px-4 py-3 text-red-500">65/100</td>
                    <td className="px-4 py-3 text-orange-500">70/100</td>
                    <td className="px-4 py-3 text-red-500">55/100</td>
                    <td className="px-4 py-3 font-bold text-lg text-red-600">63.5</td>
                    <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">At-Risk / Review</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-purple-50/50 flex justify-between items-center">
                <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" /> Procurement AI Recommendations
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex gap-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-full h-fit"><Brain className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Consolidate IT Hardware Spend</h4>
                    <p className="text-sm text-blue-800 mt-1">You are currently using 12 vendors for IT Hardware. Consolidating to top 3 (Acme Corp, TechSys, MicroNet) could yield a <strong>12% volume discount ($350k savings)</strong> based on historical pricing.</p>
                    <div className="mt-2 flex gap-2">
                      <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded">Draft RFP</button>
                      <button className="text-xs bg-white text-blue-600 border border-blue-200 px-3 py-1 rounded">Dismiss</button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                  <div className="bg-red-100 p-2 rounded-full h-fit"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
                  <div>
                    <h4 className="font-semibold text-red-900 text-sm">Critical Logistics Dependency</h4>
                    <p className="text-sm text-red-800 mt-1">75% of your logistics volume is dependent on Nexus Logistics. Their recent SLA drop (91% &#8594; 85%) poses a supply chain risk. Recommend activating secondary vendor (TransGlobal).</p>
                    <div className="mt-2 flex gap-2">
                      <button className="text-xs bg-red-600 text-white px-3 py-1 rounded">View Risk Matrix</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fraud Detection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 bg-red-50/50 flex justify-between items-center">
                <h3 className="font-semibold text-red-900 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600" /> Fraud Detection Logic Active
                </h3>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
              <div className="p-0">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-gray-600">Detection Type</th>
                      <th className="px-4 py-2 font-semibold text-gray-600">Entity</th>
                      <th className="px-4 py-2 font-semibold text-gray-600">Probability</th>
                      <th className="px-4 py-2 font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-red-50/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-red-600 text-xs"><ShieldAlert className="w-3 h-3 inline mr-1"/> Duplicate Invoice</td>
                      <td className="px-4 py-3 text-xs">Acme Corp (INV-8821)</td>
                      <td className="px-4 py-3"><span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded text-xs">99%</span></td>
                      <td className="px-4 py-3"><button className="text-xs font-semibold text-blue-600 hover:underline">Investigate</button></td>
                    </tr>
                    <tr className="hover:bg-red-50/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-orange-600 text-xs"><AlertTriangle className="w-3 h-3 inline mr-1"/> Price Anomaly</td>
                      <td className="px-4 py-3 text-xs">Titan Mfg (PO-102)</td>
                      <td className="px-4 py-3"><span className="bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded text-xs">85%</span></td>
                      <td className="px-4 py-3"><button className="text-xs font-semibold text-blue-600 hover:underline">Review PO</button></td>
                    </tr>
                    <tr className="hover:bg-red-50/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-yellow-600 text-xs"><Target className="w-3 h-3 inline mr-1"/> Shell Co. Risk</td>
                      <td className="px-4 py-3 text-xs">GlobalSource LLC</td>
                      <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded text-xs">65%</span></td>
                      <td className="px-4 py-3"><button className="text-xs font-semibold text-blue-600 hover:underline">Audit Docs</button></td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                  Fraud detection engine uses Benford's Law analysis, historical price variances, and duplicate matching logic.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
