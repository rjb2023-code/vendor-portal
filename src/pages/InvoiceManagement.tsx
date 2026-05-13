import React, { useState } from 'react';
import { 
  FileText, Search, PlayCircle, Eye, FileDigit, ScanLine, AlertCircle, CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';

export function InvoiceManagement() {
  const [invoices] = useState([
    { id: 'INV-2026-0922', vendor: 'Acme Corp Global', amount: '$45,200.00', date: '2026-05-10', poRef: 'PO-44-1029', status: 'OCR Pending', confidence: null, ocrStatus: 'Processing', match: null },
    { id: 'INV-2026-0923', vendor: 'OfficePlus Supplies', amount: '$850.00', date: '2026-05-11', poRef: 'PO-44-0992', status: 'Exception', confidence: 45, ocrStatus: 'Failed', match: null },
    { id: 'INV-2026-0921', vendor: 'Titan Manufacturing', amount: '$12,450.50', date: '2026-05-11', poRef: 'PO-44-0988', status: 'Exception', confidence: 78, ocrStatus: 'Success', match: { type: 'Exception', badge: 'Mismatch', detail: 'Price Variance > 5%' } },
    { id: 'INV-2026-0920', vendor: 'Nexus Logistics', amount: '$3,200.00', date: '2026-05-12', poRef: 'PO-45-0012', status: 'Matched', confidence: 99, ocrStatus: 'Success', match: { type: 'Success', badge: '3-Way Match', detail: 'PO-GRN-Invoice Verified' } },
    { id: 'INV-2026-0919', vendor: 'CloudNet Secure', amount: '$1,200.00', date: '2026-05-12', poRef: 'Multiple', status: 'Approved', confidence: 98, ocrStatus: 'Success', match: { type: 'Success', badge: '2-Way Match', detail: 'PO-Invoice Verified' } },
    { id: 'INV-2026-0918', vendor: 'Apex Legal Partners', amount: '$5,000.00', date: '2026-05-12', poRef: 'PO-44-1002', status: 'Exception', confidence: 95, ocrStatus: 'Success', match: { type: 'Exception', badge: 'Mismatch', detail: 'Missing GRN (Goods Receipt)' } },
  ]);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <ScanLine className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AP Invoice Automation</h1>
            <p className="text-sm text-gray-500">Document AI Extraction & 3-Way Matching Queue.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            <FileDigit className="w-4 h-4" /> Upload Invoices (Batch)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Pending OCR</p>
            <p className="text-xl font-bold mt-1 text-gray-800">12</p>
          </div>
          <ScanLine className="w-8 h-8 text-indigo-200" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-orange-600 font-semibold uppercase">Exceptions</p>
            <p className="text-xl font-bold mt-1 text-gray-800">4</p>
          </div>
          <AlertCircle className="w-8 h-8 text-orange-200" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-600 font-semibold uppercase">Pending Approval</p>
            <p className="text-xl font-bold mt-1 text-gray-800">8</p>
          </div>
          <FileText className="w-8 h-8 text-blue-200" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-green-600 font-semibold uppercase">Ready to Pay</p>
            <p className="text-xl font-bold mt-1 text-gray-800">24</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-green-200" />
        </div>
      </div>

      {/* Main Queue Dashboard */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="flex gap-4 text-sm font-medium">
             <button className="text-indigo-600 border-b-2 border-indigo-600 pb-2 -mb-3">Action Queue</button>
             <button className="text-gray-500 hover:text-gray-700 pb-2 -mb-3">Processed Log</button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search queue..." className="text-sm pl-8 pr-3 py-1 border border-gray-300 rounded" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-semibold border-b border-gray-200 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">PO Reference</th>
                <th className="px-4 py-3">OCR Status & Confidence</th>
                <th className="px-4 py-3">Match Status</th>
                <th className="px-4 py-3">Workflow State</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-blue-600"><a href="#" className="hover:underline">{inv.id}</a></td>
                  <td className="px-4 py-3 font-medium">{inv.vendor}</td>
                  <td className="px-4 py-3 text-right font-medium">{inv.amount}</td>
                  <td className="px-4 py-3 text-gray-500">{inv.poRef}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      {inv.ocrStatus === 'Processing' && (
                        <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                          <PlayCircle className="w-3.5 h-3.5 animate-pulse" /> Processing
                        </span>
                      )}
                      {inv.ocrStatus === 'Success' && (
                        <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Success
                        </span>
                      )}
                      {inv.ocrStatus === 'Failed' && (
                        <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> Failed
                        </span>
                      )}
                      
                      {inv.confidence !== null && (
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full", 
                                inv.confidence >= 90 ? "bg-green-500" : 
                                inv.confidence >= 70 ? "bg-orange-500" : "bg-red-500"
                              )}
                              style={{width: `${inv.confidence}%`}}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-gray-500 font-medium">{inv.confidence}%</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {inv.match ? (
                      <div className="flex flex-col gap-1 items-start">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded border font-medium",
                          inv.match.type === 'Success' ? "bg-green-50 border-green-200 text-green-700" :
                          "bg-red-50 border-red-200 text-red-700"
                        )}>
                          {inv.match.badge}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium max-w-[160px] truncate" title={inv.match.detail}>
                          {inv.match.detail}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-xs font-bold px-2 py-1 items-center gap-1 inline-flex rounded-full",
                      inv.status === 'OCR Pending' ? "bg-blue-100 text-blue-800" :
                      inv.status === 'Exception' ? "bg-orange-100 text-orange-800" :
                      inv.status === 'Matched' ? "bg-emerald-100 text-emerald-800" :
                      "bg-gray-100 text-gray-800"
                    )}>
                      {inv.status === 'OCR Pending' && <PlayCircle className="w-3 h-3 animate-pulse"/>}
                      {inv.status === 'Exception' && <AlertCircle className="w-3 h-3"/>}
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 text-gray-400 hover:text-indigo-600 transition-colors" title="View Split Screen">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
