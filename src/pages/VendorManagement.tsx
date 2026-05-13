import React, { useState } from 'react';
import { 
  Building2, Search, Filter, Download, Plus, MoreVertical, 
  ShieldAlert, ShieldCheck, Clock, CheckCircle2, XCircle, AlertTriangle, UserCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

export function VendorManagement() {
  const [activeTab, setActiveTab] = useState('directory');

  const [vendors, setVendors] = useState([
    { id: 'V-10042', name: 'Acme Corp Global', category: 'IT Hardware', tier: 'Strategic', status: 'Active', compliance: 'Verified', risk: 'Low', spend: '$1.2M' },
    { id: 'V-10043', name: 'Nexus Logistics', category: 'Transport', tier: 'Operational', status: 'Suspended', compliance: 'Audit Req', risk: 'Medium', spend: '$450K' },
    { id: 'V-10044', name: 'Titan Manufacturing', category: 'Raw Materials', tier: 'Strategic', status: 'Active', compliance: 'Verified', risk: 'Low', spend: '$4.5M' },
    { id: 'V-10045', name: 'CloudNet Secure', category: 'Software', tier: 'Tactical', status: 'Blacklisted', compliance: 'Failed', risk: 'High', spend: '$12K' },
    { id: 'V-10046', name: 'OfficePlus Supplies', category: 'Consumables', tier: 'Tactical', status: 'Active', compliance: 'Verified', risk: 'Low', spend: '$85K' },
    { id: 'V-10047', name: 'Apex Legal Partners', category: 'Services', tier: 'Operational', status: 'Pending', compliance: 'Pending', risk: '-', spend: '$0' },
  ]);

  const [onboardingQueue] = useState([
    { id: 'REQ-882', name: 'GlobalSource LLC', category: 'Services', step: 'Tax Verification', SLA: '2 days overdue', status: 'Waiting on Vendor' },
    { id: 'REQ-883', name: 'TechSys Solutions', category: 'IT Hardware', step: 'Compliance Review', SLA: 'On Track', status: 'In Review' },
    { id: 'REQ-884', name: 'EcoPack India', category: 'Packaging', step: 'Financial Check', SLA: 'Due Today', status: 'In Review' },
  ]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <span className="bg-green-100 text-green-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center w-fit"><CheckCircle2 className="w-3 h-3 mr-1"/> Active</span>;
      case 'Pending': return <span className="bg-orange-100 text-orange-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center w-fit"><Clock className="w-3 h-3 mr-1"/> Pending</span>;
      case 'Suspended': return <span className="bg-yellow-100 text-yellow-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center w-fit"><AlertTriangle className="w-3 h-3 mr-1"/> Suspended</span>;
      case 'Blacklisted': return <span className="bg-red-100 text-red-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center w-fit"><ShieldAlert className="w-3 h-3 mr-1"/> Blacklisted</span>;
      default: return <span className="bg-gray-100 text-gray-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center w-fit">Unknown</span>;
    }
  };

  const getComplianceBadge = (status: string) => {
    switch(status) {
      case 'Verified': return <span className="text-green-600 font-medium text-xs flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1"/> Verified</span>;
      case 'Audit Req': return <span className="text-orange-500 font-medium text-xs flex items-center"><AlertTriangle className="w-3.5 h-3.5 mr-1"/> Audit Req</span>;
      case 'Failed': return <span className="text-red-600 font-bold text-xs flex items-center"><XCircle className="w-3.5 h-3.5 mr-1"/> Failed</span>;
      default: return <span className="text-gray-400 font-medium text-xs flex items-center"><Clock className="w-3.5 h-3.5 mr-1"/> Pending</span>;
    }
  };

  const handleAction = (id: string, action: string) => {
    setVendors(vendors.map(v => {
      if (v.id === id) {
        if (action === 'activate') return { ...v, status: 'Active' };
        if (action === 'deactivate') return { ...v, status: 'Suspended' };
        if (action === 'blacklist') return { ...v, status: 'Blacklisted', compliance: 'Failed', risk: 'High' };
      }
      return v;
    }));
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vendor Management</h1>
            <p className="text-sm text-gray-500">Lifecycle management, onboarding, compliance, and activation.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> New Vendor Registration
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('directory')}
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === 'directory'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            Vendor Directory
          </button>
          <button
            onClick={() => setActiveTab('onboarding')}
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === 'onboarding'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            Onboarding & Verification <span className="bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs ml-2">3</span>
          </button>
        </nav>
      </div>

      {activeTab === 'directory' && (
        <>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-3 justify-between items-center">
            <div className="flex-1 w-full md:w-auto relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search vendor name, ID, or category..." 
                className="w-full md:max-w-md pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors flex-1 md:flex-none justify-center">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
             <div className="overflow-x-auto pb-4">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-[#f8f9fa] text-gray-600 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Vendor ID</th>
                    <th className="px-4 py-3">Vendor Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Tier</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Compliance</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-4 py-3 font-mono text-xs text-blue-600 hover:underline cursor-pointer">{vendor.id}</td>
                      <td className="px-4 py-3 font-medium">{vendor.name}</td>
                      <td className="px-4 py-3 text-gray-500">{vendor.category}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs",
                          vendor.tier === 'Strategic' ? "bg-purple-100 text-purple-800" :
                          vendor.tier === 'Operational' ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        )}>
                          {vendor.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(vendor.status)}</td>
                      <td className="px-4 py-3">{getComplianceBadge(vendor.compliance)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {vendor.status !== 'Active' && vendor.status !== 'Blacklisted' && (
                            <button onClick={() => handleAction(vendor.id, 'activate')} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded hover:bg-green-100">Activate</button>
                          )}
                          {vendor.status === 'Active' && (
                             <button onClick={() => handleAction(vendor.id, 'deactivate')} className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1 rounded hover:bg-yellow-100">Suspend</button>
                          )}
                          {vendor.status !== 'Blacklisted' && (
                            <button onClick={() => handleAction(vendor.id, 'blacklist')} className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded hover:bg-red-100">Blacklist</button>
                          )}
                          <button className="p-1 px-2 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'onboarding' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
           <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
             <h3 className="font-semibold text-gray-700">Registration & Onboarding Queue</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left whitespace-nowrap">
               <thead className="bg-white text-gray-500 font-semibold border-b border-gray-200 text-xs uppercase">
                 <tr>
                    <th className="px-4 py-3">Request ID</th>
                    <th className="px-4 py-3">Applicant Name</th>
                    <th className="px-4 py-3">Target Category</th>
                    <th className="px-4 py-3">Current Step</th>
                    <th className="px-4 py-3">SLA Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 text-gray-700">
                 {onboardingQueue.map((req) => (
                   <tr key={req.id} className="hover:bg-gray-50">
                     <td className="px-4 py-3 font-mono text-xs text-blue-600">{req.id}</td>
                     <td className="px-4 py-3 font-medium">{req.name}</td>
                     <td className="px-4 py-3 text-gray-500">{req.category}</td>
                     <td className="px-4 py-3">
                       <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-100">
                         {req.step}
                       </span>
                     </td>
                     <td className="px-4 py-3">
                       <span className={cn("text-xs font-semibold", req.SLA.includes('overdue') ? 'text-red-600' : req.SLA.includes('Today') ? 'text-orange-500' : 'text-green-600')}>
                         {req.SLA}
                       </span>
                     </td>
                     <td className="px-4 py-3 text-right">
                       <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 font-medium">Review Forms</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
}
