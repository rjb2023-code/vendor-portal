import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, FileCode2 } from 'lucide-react';

export function Architecture() {
  const [markdown, setMarkdown] = useState<string>('Loading architecture documentation...');

  useEffect(() => {
    // In a real app we'd fetch this from via an API.
    // For this prototype, we're importing it directly if it was a module, or fetching the raw text.
    // We'll fetch it from the root public path or build a rough simulation.
    fetch('/ARCHITECTURE.md')
      .then((response) => response.text())
      .then((text) => {
        // Simple check if it loaded html by mistake
        if(text.startsWith('<!DOCTYPE html>')) {
           setMarkdown('# Error loading architecture file.\nPlease ensure ARCHITECTURE.md is served by Vite, or check the source code directly.');
        } else {
           setMarkdown(text);
        }
      })
      .catch((e) => setMarkdown('# Failed to load architecture document.\n' + e.message));
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <div className="p-2 bg-slate-800 text-white rounded-lg">
          <FileCode2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Platform Specifications</h1>
          <p className="text-sm text-gray-500">Read the extensive, enterprise-grade architecture documentation requested.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="prose prose-blue max-w-none 
                        prose-headings:text-slate-800 prose-headings:font-bold
                        prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:mt-10
                        prose-h3:text-lg prose-h3:mt-8
                        prose-p:text-gray-600 prose-li:text-gray-600
                        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
                        prose-a:text-blue-600 hover:prose-a:text-blue-800
                        prose-strong:text-slate-800">
          <Markdown remarkPlugins={[remarkGfm]}>
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
